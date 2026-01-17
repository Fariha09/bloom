const express = require("express");
const router = express.Router();
const Board = require("../models/Board");

// Create Board
router.post("/", async (req, res) => {
  try {
    const board = await Board.create(req.body);
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Boards
router.get("/", async (req, res) => {
  try {
    const boards = await Board.find().populate("pins");
    res.json(boards);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Board
router.delete("/:id", async (req, res) => {
  try {
    await Board.findByIdAndDelete(req.params.id);
    res.json({ message: "Board deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
