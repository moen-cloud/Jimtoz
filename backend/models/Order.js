import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    name: String,
    quantity: { type: Number, default: 1 },
    price: Number,
  },
  { _id: false }
);

const customCakeSchema = new mongoose.Schema(
  {
    isCustom: { type: Boolean, default: false },
    flavor: String,
    size: String,
    tiers: Number,
    occasion: String,
    referenceImage: String, // placeholder path/URL for uploaded reference image
    message: String,
    neededBy: Date,
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    guestName: String,
    guestEmail: String,
    guestPhone: String,
    items: [orderItemSchema],
    customCake: customCakeSchema,
    fulfillment: {
      type: { type: String, enum: ["pickup", "delivery"], default: "pickup" },
      address: String,
      scheduledDate: Date,
      scheduledTime: String,
    },
    paymentMethod: {
      type: String,
      enum: ["card", "mpesa", "cash"],
      default: "cash",
    },
    totalPrice: { type: Number, required: true, default: 0 },
    status: {
      type: String,
      enum: ["received", "confirmed", "baking", "ready", "completed", "cancelled"],
      default: "received",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
