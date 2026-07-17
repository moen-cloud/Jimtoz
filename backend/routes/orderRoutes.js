import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect, admin, optionalAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", optionalAuth, createOrder);
router.get("/my", protect, getMyOrders);
router.get("/", protect, admin, getAllOrders);
router.get("/:id", getOrderById); // used for order-tracking lookup by ID
router.put("/:id/status", protect, admin, updateOrderStatus);

export default router;
