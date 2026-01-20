const dotenv = require("dotenv");
dotenv.config(); // This must come BEFORE you use process.env.MONGO_URL

console.log("MONGO_URL:", process.env.MONGO_URL);


const express = require("express");
const mongoose = require("mongoose");


const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Bloom backend is running!");
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
