const express = require("express");
const router = express.Router();
const Pin = require("../models/Pin");
const Board = require("../models/Board");

// Add Pin
router.post("/", async (req, res) => {
  try {
    const pin = await Pin.create(req.body);

    await Board.findByIdAndUpdate(req.body.board, {
      $push: { pins: pin._id },
    });

    res.status(201).json(pin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Pin
router.delete("/:id", async (req, res) => {
  try {
    await Pin.findByIdAndDelete(req.params.id);
    res.json({ message: "Pin deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
