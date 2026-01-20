const express = require("express");
const Board = require("../models/board");
const multer = require("multer");
const router = express.Router();
const path = require("path");

// Configure multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder for uploaded images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Create a board with optional image upload
router.post("/", upload.array("images"), async (req, res) => {
  try {
    const { title, imageUrls } = req.body;

    // combine uploaded files and image URLs
    const uploadedImages = req.files.map((file) => ({
      imageUrl: `http://localhost:5000/uploads/${file.filename}`,
      caption: "",
    }));

    const urlImages = imageUrls
      ? JSON.parse(imageUrls).map((url) => ({ imageUrl: url, caption: "" }))
      : [];

    const board = new Board({
      title,
      images: [...uploadedImages, ...urlImages],
    });

    await board.save();
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Serve uploaded images statically
router.use("/uploads", express.static("uploads"));

// Get all boards
router.get("/", async (req, res) => {
  try {
    const boards = await Board.find();
    res.json(boards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
