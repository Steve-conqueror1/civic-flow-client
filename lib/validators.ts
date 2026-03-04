import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Enter a valid email").nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

export const registerSchema = z.object({
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().nonempty("Last name is required"),
  phoneNumber: z.string().nonempty("Phone number is required"),
  email: z.email("Enter a valid email").nonempty("Email is required"),
  address: z.string().nonempty("Address is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character",
    ),
  terms: z.boolean().refine((v) => v === true, {
    message: "You must accept the terms",
  }),
});
