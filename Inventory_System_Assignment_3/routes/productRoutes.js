const express = require("express");
const Product = require("../models/Product");
const { asyncHandler, validateId } = require("../middleware/errorHandler");

const router = express.Router();

// Validate :id automatically in every route that has it
router.param("id", validateId);

// CREATE  ->  POST /api/products
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  })
);

// READ ALL  ->  GET /api/products
// Filtering, Sorting and Pagination using query strings
// e.g. /api/products?category=Furniture&minPrice=100&sort=-price&page=1&limit=5
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { category, supplier, search, minPrice, maxPrice, sort, page, limit } = req.query;

    // 1. Filtering
    const filter = {};
    if (category) filter.category = category;
    if (supplier) filter.supplier = supplier;
    if (search) {
      // search by name (case-insensitive); escape special regex characters
      const safeSearch = String(search).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.name = { $regex: safeSearch, $options: "i" };
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // 2. Sorting  (sort=price -> ascending, sort=-price -> descending)
    const sortBy = sort ? String(sort).split(",").join(" ") : "-createdAt";

    // 3. Pagination using skip() and limit()
    const pageNum = Math.max(parseInt(page) || 1, 1);
    const limitNum = Math.min(Math.max(parseInt(limit) || 10, 1), 100);
    const skip = (pageNum - 1) * limitNum;

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter).sort(sortBy).skip(skip).limit(limitNum);

    res.json({
      total,
      page: pageNum,
      totalPages: Math.ceil(total / limitNum),
      count: products.length,
      products,
    });
  })
);

// LOW-STOCK REPORT  ->  GET /api/products/low-stock
// Aggregation: products whose quantity is at or below reorderLevel
// NOTE: this route must be above /:id, otherwise "low-stock" is treated as an id
router.get(
  "/low-stock",
  asyncHandler(async (req, res) => {
    const lowStockItems = await Product.aggregate([
      // Stage 1: match -> quantity <= reorderLevel (compare two fields using $expr)
      { $match: { $expr: { $lte: ["$quantity", "$reorderLevel"] } } },
      // Stage 2: calculate stockValue for each document
      {
        $addFields: {
          stockValue: { $multiply: ["$price", "$quantity"] },
          id: "$_id",
        },
      },
      // Stage 3: lowest quantity first
      { $sort: { quantity: 1 } },
    ]);

    res.json({ count: lowStockItems.length, lowStockItems });
  })
);

// CATEGORY-WISE SUMMARY  ->  GET /api/products/summary
// Aggregation: group by category
router.get(
  "/summary",
  asyncHandler(async (req, res) => {
    const summary = await Product.aggregate([
      // Stage 1: group by category (accumulators: $sum, $avg)
      {
        $group: {
          _id: "$category",
          totalItems: { $sum: 1 },
          totalQuantity: { $sum: "$quantity" },
          totalStockValue: { $sum: { $multiply: ["$price", "$quantity"] } },
          avgPrice: { $avg: "$price" },
        },
      },
      // Stage 2: highest stock value first
      { $sort: { totalStockValue: -1 } },
    ]);

    res.json({ categories: summary.length, summary });
  })
);

// READ ONE  ->  GET /api/products/:id
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  })
);

// UPDATE  ->  PUT /api/products/:id
// new: true returns the updated document, runValidators applies schema rules
router.put(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  })
);

// DELETE  ->  DELETE /api/products/:id
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted", id: req.params.id });
  })
);

// STOCK ADJUSTMENT  ->  PATCH /api/products/:id/stock
// body: { "change": 10 }  -> restock
// body: { "change": -5 }  -> sale (not allowed if stock goes below 0)
router.patch(
  "/:id/stock",
  asyncHandler(async (req, res) => {
    const change = Number(req.body.change);

    if (req.body.change === undefined || !Number.isInteger(change) || change === 0) {
      return res.status(400).json({
        message: "'change' must be a non-zero whole number (positive = restock, negative = sale)",
      });
    }

    // Safe update: the filter checks that enough stock exists and $inc changes it
    // in a single step, so quantity can never go below 0
    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, quantity: { $gte: -change } },
      { $inc: { quantity: change } },
      { new: true }
    );

    if (!product) {
      const exists = await Product.exists({ _id: req.params.id });
      if (!exists) return res.status(404).json({ message: "Product not found" });
      return res.status(400).json({ message: "Insufficient stock for this sale" });
    }

    res.json({ message: "Stock updated", product });
  })
);

module.exports = router;
