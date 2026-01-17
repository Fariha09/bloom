const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema({
    imageUrl: { type: String, required: true },
    description: { type: String, trim: true },
    board: { type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true }
}, { timestamps: true });

module.exports = mongoose.model("Pin", PinSchema);
