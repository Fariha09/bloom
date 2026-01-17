// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); // Load variables from .env

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Simple test route
app.get("/", (req, res) => {
    res.send("Bloom backend is running 🌸");
});

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected ✅");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error("MongoDB connection error:", err));

// Connect Routes to Server
const authRoutes = require("./routes/authRoutes");
const boardRoutes = require("./routes/boardRoutes");
const pinRoutes = require("./routes/pinRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/pins", pinRoutes);
