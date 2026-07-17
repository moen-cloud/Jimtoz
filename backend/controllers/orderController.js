import asyncHandler from "express-async-handler";
import Order from "../models/Order.js";
import User from "../models/User.js";

// @desc Create new order (regular cart or custom cake)
// @route POST /api/orders
export const createOrder = asyncHandler(async (req, res) => {
  const {
    items,
    customCake,
    fulfillment,
    paymentMethod,
    totalPrice,
    guestName,
    guestEmail,
    guestPhone,
  } = req.body;

  const order = await Order.create({
    user: req.user ? req.user._id : null,
    guestName,
    guestEmail,
    guestPhone,
    items,
    customCake,
    fulfillment,
    paymentMethod,
    totalPrice,
  });

  // Award loyalty points: 1 point per 100 (KES) spent
  if (req.user) {
    const pointsEarned = Math.floor((totalPrice || 0) / 100);
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { loyaltyPoints: pointsEarned },
    });
  }

  res.status(201).json(order);
});

// @desc Get logged-in user's orders
// @route GET /api/orders/my
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

// @desc Get single order by id (for tracking)
// @route GET /api/orders/:id
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  res.json(order);
});

// @desc Get all orders (admin)
// @route GET /api/orders
export const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).sort({ createdAt: -1 });
  res.json(orders);
});

// @desc Update order status (admin)
// @route PUT /api/orders/:id/status
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }
  order.status = req.body.status || order.status;
  await order.save();
  res.json(order);
});
