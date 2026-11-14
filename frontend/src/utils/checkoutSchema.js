// src/utils/checkoutSchema.js
import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name").max(80),
  phone: z
    .string()
    .regex(
      /^(\+251|0)[0-9]{9}$/,
      "Enter a valid Ethiopian phone number (e.g. +251912345678 or 0912345678)",
    ),
  region: z.string().min(2, "Region is required"),
  city: z.string().min(2, "City is required"),
  subCity: z.string().min(2, "Sub-city / area is required"),
  specificAddress: z
    .string()
    .min(5, "Please be specific (building, floor, landmark)"),
  deliveryInstructions: z.string().max(300).optional().or(z.literal("")),
  paymentMethod: z.enum(["cod", "online"], {
    errorMap: () => ({ message: "Choose a payment method" }),
  }),
});
