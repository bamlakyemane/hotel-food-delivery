// src/models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: { type: String, required: true, trim: true },
    passwordHash: { type: String, required: true },
    role: {
      type: String,
      enum: ["customer", "admin", "staff"],
      default: "customer",
    },
    profileImage: { type: String, default: "" },
    preferredLanguage: { type: String, enum: ["en", "am"], default: "en" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true },
);

// Prevent passwordHash from ever being sent in API responses automatically
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.passwordHash;
  return user;
};

module.exports = mongoose.model("User", userSchema);
