// src/models/Product.js
const mongoose = require("mongoose");

// Sub-schemas for variations and extras
const variationSchema = new mongoose.Schema({
  label: { type: String, required: true }, // e.g., "Small", "Large"
  price: { type: Number, required: true },
});

const extraSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    nameAm: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    descriptionAm: { type: String, default: "" },
    price: { type: Number, required: true }, // Base price
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    image: { type: String, required: true },
    ingredients: [{ type: String }],
    variations: [variationSchema],
    extras: [extraSchema],
    preparationTime: { type: Number, required: true }, // in minutes
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: true },
    isPopular: { type: Boolean, default: false },
    isBestSeller: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Product", productSchema);
