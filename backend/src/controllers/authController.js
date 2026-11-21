// src/controllers/authController.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { registerSchema, loginSchema } = require("../validators/authValidators");

// Helper to generate JWT
const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// ─── REGISTER ─────────────────────────────────────
exports.register = async (req, res) => {
  try {
    // 1. Validate request body
    const validatedData = registerSchema.parse(req.body);

    // 2. Check if email already exists
    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(validatedData.password, salt);

    // 4. Create user
    // NOTE: For security, we explicitly set role to 'customer' for this route.
    // Admin/Staff creation will have a separate secure route later.
    const user = await User.create({
      fullName: validatedData.fullName,
      email: validatedData.email,
      phone: validatedData.phone,
      passwordHash,
      role: "customer",
    });

    // 5. Generate token
    const token = generateToken(user._id, user.role);

    res.status(201).json({ token, user });
  } catch (error) {
    if (error.errors) {
      // Zod validation error
      return res
        .status(400)
        .json({
          message: "Validation failed",
          errors: error.errors.map((e) => e.message),
        });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ─── LOGIN ────────────────────────────────────────
exports.login = async (req, res) => {
  try {
    // 1. Validate request body
    const validatedData = loginSchema.parse(req.body);

    // 2. Find user
    const user = await User.findOne({ email: validatedData.email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 3. Check if active
    if (!user.isActive) {
      return res
        .status(403)
        .json({ message: "Your account has been deactivated" });
    }

    // 4. Compare passwords
    const isMatch = await bcrypt.compare(
      validatedData.password,
      user.passwordHash,
    );
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 5. Generate token
    const token = generateToken(user._id, user.role);

    res.status(200).json({ token, user });
  } catch (error) {
    if (error.errors) {
      return res
        .status(400)
        .json({
          message: "Validation failed",
          errors: error.errors.map((e) => e.message),
        });
    }
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ─── GET ME ───────────────────────────────────────
exports.getMe = async (req, res) => {
  // req.user is set by the auth middleware
  res.status(200).json({ user: req.user });
};
