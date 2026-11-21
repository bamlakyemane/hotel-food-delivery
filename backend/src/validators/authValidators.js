// src/validators/authValidators.js
const { z } = require("zod");

const registerSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(80),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .regex(/^(\+251|0)[0-9]{9}$/, "Enter a valid Ethiopian phone number"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["customer", "admin", "staff"]).optional(), // We'll default to customer
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

module.exports = { registerSchema, loginSchema };
