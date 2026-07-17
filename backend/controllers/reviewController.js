import asyncHandler from "express-async-handler";
import Review from "../models/Review.js";

// @desc Get approved reviews (public)
// @route GET /api/reviews
export const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 });
  res.json(reviews);
});

// @desc Submit a review (goes to "pending" until approved by admin)
// @route POST /api/reviews
export const createReview = asyncHandler(async (req, res) => {
  const { name, rating, comment, photo } = req.body;
  const review = await Review.create({ name, rating, comment, photo });
  res.status(201).json(review);
});

// @desc Get all reviews including pending (admin)
// @route GET /api/reviews/all
export const getAllReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({}).sort({ createdAt: -1 });
  res.json(reviews);
});

// @desc Approve a review (admin)
// @route PUT /api/reviews/:id/approve
export const approveReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }
  review.approved = true;
  await review.save();
  res.json(review);
});
