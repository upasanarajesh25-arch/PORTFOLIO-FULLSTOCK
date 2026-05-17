const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const projectRoutes = require("./routes/projectRoutes");

// Routes Middleware
app.use("/api/projects", projectRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

// MongoDB Connection
console.log("Connecting to MongoDB...");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

// Render uses dynamic PORT, so always use process.env.PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});