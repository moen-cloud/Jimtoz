import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });

// @desc Register new user
// @route POST /api/auth/register
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please provide name, email, and password");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("An account with this email already exists");
  }

  const user = await User.create({ name, email, password, phone });

  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    loyaltyPoints: user.loyaltyPoints,
    token: generateToken(user._id),
  });
});

// @desc Login user
// @route POST /api/auth/login
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      loyaltyPoints: user.loyaltyPoints,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Get logged-in user's profile
// @route GET /api/auth/profile
export const getProfile = asyncHandler(async (req, res) => {
  res.json(req.user);
});
