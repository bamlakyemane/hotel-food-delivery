// src/models/Review.js
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" }, // Optional: only verified buyers
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, maxlength: 500 },
    isVisible: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// Ensure a customer can only review a product once per order
reviewSchema.index({ customer: 1, product: 1, order: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);
