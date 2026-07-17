import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    photo: { type: String, default: "" }, // placeholder for customer photo
    approved: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
