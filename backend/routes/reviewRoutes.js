import express from "express";
import {
  getReviews,
  createReview,
  getAllReviews,
  approveReview,
} from "../controllers/reviewController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getReviews).post(createReview);
router.get("/all", protect, admin, getAllReviews);
router.put("/:id/approve", protect, admin, approveReview);

export default router;
