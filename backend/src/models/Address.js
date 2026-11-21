// src/models/Address.js
const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    label: { type: String, default: "Home" }, // Home, Work, etc.
    recipientName: { type: String, required: true },
    phone: { type: String, required: true },
    region: { type: String, required: true },
    city: { type: String, required: true },
    subCity: { type: String, required: true },
    specificAddress: { type: String, required: true },
    deliveryInstructions: { type: String, default: "" },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Address", addressSchema);
