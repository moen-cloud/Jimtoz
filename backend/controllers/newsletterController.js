import asyncHandler from "express-async-handler";
import Newsletter from "../models/Newsletter.js";

// @desc Subscribe to newsletter
// @route POST /api/newsletter
export const subscribe = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400);
    throw new Error("Email is required");
  }

  const exists = await Newsletter.findOne({ email });
  if (exists) {
    return res.status(200).json({ message: "You're already subscribed!" });
  }

  await Newsletter.create({ email });
  res.status(201).json({ message: "Subscribed! Watch your inbox for a welcome discount." });
});
