import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email("Enter a valid email").nonempty("Email is required"),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.email("Enter a valid email").nonempty("Email is required"),
  password: z.string().nonempty("Password is required"),
});

export const contactSchema = z.object({
  fullName: z.string().nonempty("Full name is required"),
  email: z.email("Enter a valid email").nonempty("Email is required"),
  subject: z.string().nonempty("Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const accessibilityFeedbackSchema = z.object({
  fullName: z.string().nonempty("Full name is required"),
  email: z.email("Enter a valid email").nonempty("Email is required"),
  feedback: z.string().min(10, "Please provide at least 10 characters"),
});

export type AccessibilityFeedbackData = z.infer<typeof accessibilityFeedbackSchema>;

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

export const updateProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  mfaEnabled: z.boolean().optional(),
});

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;

export const adminUpdateUserSchema = z.object({
  firstName: z.string().min(1, "First name is required").optional(),
  lastName: z.string().min(1, "Last name is required").optional(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
  email: z.email("Enter a valid email").optional(),
  role: z.enum(["citizen", "admin"]).optional(),
  status: z.enum(["active", "inactive"]).optional(),
});

export type AdminUpdateUserFormValues = z.infer<typeof adminUpdateUserSchema>;
