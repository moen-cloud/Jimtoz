import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: ["bread", "pastries", "cakes", "cookies", "custom"],
    },
    price: { type: Number, required: true },
    image: { type: String, default: "" }, // URL or path — placeholder until real images are added
    inStock: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
