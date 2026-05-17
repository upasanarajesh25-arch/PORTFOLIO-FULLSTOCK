const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const projectRoutes = require("./ROUTES/projectRoutes.js");

const app = express();

app.use(cors());
app.use(express.json());

// API route
app.use("/api/projects", projectRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

console.log("Connecting to MongoDB...");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");

    app.listen(process.env.PORT, () => {
      console.log("Server running on port " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });