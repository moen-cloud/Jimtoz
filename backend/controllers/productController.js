import asyncHandler from "express-async-handler";
import Product from "../models/Product.js";

// @desc Get all products (supports ?category= filter)
// @route GET /api/products
export const getProducts = asyncHandler(async (req, res) => {
  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  if (req.query.featured) filter.isFeatured = true;

  const products = await Product.find(filter).sort({ createdAt: -1 });
  res.json(products);
});

// @desc Get single product
// @route GET /api/products/:id
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json(product);
});

// @desc Create a product
// @route POST /api/products (admin only)
export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

// @desc Update a product
// @route PUT /api/products/:id (admin only)
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json(product);
});

// @desc Delete a product
// @route DELETE /api/products/:id (admin only)
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.json({ message: "Product removed" });
});
