const express = require("express");
const Pin = require("../models/Pin");
const Board = require("../models/Boards");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// Add pin
router.post("/", verifyToken, async (req, res) => {
  try {
    const pin = await Pin.create(req.body);
    await Board.findByIdAndUpdate(req.body.board, { $push: { pins: pin._id } });
    res.status(201).json(pin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete pin
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Pin.findByIdAndDelete(req.params.id);
    res.json({ message: "Pin deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
