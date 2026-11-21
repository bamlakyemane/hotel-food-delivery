// src/server.js
require("dns").setServers(["8.8.8.8", "1.1.1.1"]);
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Import Routes
const authRoutes = require("./routes/authRoutes");

connectDB();
const app = express();

app.use(cors());
app.use(express.json());

// ── Routes ──
app.use("/api/auth", authRoutes);

// Basic health check route
app.get("/api/health", (req, res) => {
  res
    .status(200)
    .json({ status: "success", message: "API is running perfectly!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running in development mode on port ${PORT}`);
});
