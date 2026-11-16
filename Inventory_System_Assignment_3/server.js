// Inventory and Data Management System
// Stack: Node.js + Express + MongoDB (Mongoose) + dotenv

require("dotenv").config(); // load PORT and MONGO_URI from .env

const express = require("express");
const mongoose = require("mongoose");
const productRoutes = require("./routes/productRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();

// Middleware to read JSON body
app.use(express.json());

// All product APIs start with /api/products
app.use("/api/products", productRoutes);

// Centralized error handling (must be after all routes)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB first, then start the server
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  });
