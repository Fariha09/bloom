const express = require("express");
const Board = require("../models/Board");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// Create board
router.post("/", verifyToken, async (req, res) => {
  try {
    const board = await Board.create({ ...req.body, user: req.userId });
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all boards
router.get("/", async (req, res) => {
  try {
    const boards = await Board.find().populate("pins");
    res.json(boards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete board
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Board.findByIdAndDelete(req.params.id);
    res.json({ message: "Board deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
