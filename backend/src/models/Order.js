// src/models/Order.js
const mongoose = require("mongoose");

// Snapshot of the product at the time of ordering
const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    name: { type: String, required: true }, // Snapshot
    variationLabel: { type: String, default: null },
    extras: [{ name: String, price: Number }],
    unitPrice: { type: Number, required: true }, // Snapshot
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }, // Don't create a separate _id for sub-documents
);

const statusHistorySchema = new mongoose.Schema({
  status: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  note: { type: String, default: "" },
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, required: true, unique: true },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [orderItemSchema],
    subtotal: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    totalAmount: { type: Number, required: true },
    deliveryAddress: {
      region: String,
      city: String,
      subCity: String,
      specificAddress: String,
      deliveryInstructions: String,
    },
    customerPhone: { type: String, required: true },
    paymentMethod: { type: String, enum: ["cod", "online"], required: true },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "preparing",
        "ready",
        "out_for_delivery",
        "delivered",
        "cancelled",
        "rejected",
      ],
      default: "pending",
    },
    assignedStaff: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    statusHistory: [statusHistorySchema],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
