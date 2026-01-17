const mongoose = require("mongoose");

const pinSchema = new mongoose.Schema({
  title: { type: String, required: true },
  imageUrl: { type: String, required: true },
  board: { type: mongoose.Schema.Types.ObjectId, ref: "Board" }
}, { timestamps: true });

module.exports = mongoose.model("Pin", pinSchema);
