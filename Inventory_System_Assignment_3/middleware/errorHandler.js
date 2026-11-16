const mongoose = require("mongoose");

// Wrapper so we don't need try/catch in every route
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Input validation: check that the :id in the URL is a valid MongoDB id
// (used with router.param in the routes file)
const validateId = (req, res, next, id) => {
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }
  next();
};

// For routes that do not exist
const notFound = (req, res, next) => {
  res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
};

// Centralized error handler
const errorHandler = (err, req, res, next) => {
  // Mongoose validation error (required, min, max, etc.)
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: "Validation failed", errors });
  }

  // Duplicate key error (SKU already exists)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res
      .status(409)
      .json({ message: `Duplicate value for '${field}': ${err.keyValue[field]}` });
  }

  // Wrong data type in query/body (e.g. price: "abc")
  if (err.name === "CastError") {
    return res.status(400).json({ message: `Invalid value for '${err.path}'` });
  }

  // Invalid JSON in request body
  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ message: "Invalid JSON in request body" });
  }

  console.error(err);
  res.status(500).json({ message: "Server error" });
};

module.exports = { asyncHandler, validateId, notFound, errorHandler };
