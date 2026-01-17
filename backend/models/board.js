const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  title: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  pins: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pin" }]
}, { timestamps: true });

module.exports = mongoose.model("Board", boardSchema);
