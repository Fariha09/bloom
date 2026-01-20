const express = require("express");
const { register, login } = require("../controllers/authController");

const router = express.Router();

// POST routes
router.post("/register", register);
router.post("/login", login);

// Optional GET test route
router.get("/", (req, res) => {
  res.json({ message: "Auth API is working!" });
});

module.exports = router;
