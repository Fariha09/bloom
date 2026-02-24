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



// Get all boards
router.get("/", async (req, res) => {
  try {
    const boards = await Board.find();
    res.json(boards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a specific board by ID 
router.get("/:id", async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    res.json(board);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.get("/:id/images", async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    res.json(board.images);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add image via URL
router.post("/:id/images", async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);

    board.images.push({
      imageUrl: req.body.imageUrl,
      caption: req.body.caption || "",
    });

    await board.save();
    res.json(board);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Upload image file to a board
router.post("/:id/images/upload", upload.array("images"), async (req, res) => {
  try {
    console.log("Upload route hit");
    console.log("FILES:", req.files);

    const board = await Board.findById(req.params.id);
    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    req.files.forEach(file => {
      board.images.push({
        imageUrl: `http://localhost:5000/uploads/${file.filename}`,
        caption: ""
      });
    });

    await board.save();

    res.json(board);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});






module.exports = router;
