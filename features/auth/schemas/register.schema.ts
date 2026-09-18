import { z } from "zod";

export const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name is required."),
    lastName: z.string().min(2, "Last name is required."),
    email: z.string().email("Enter a valid email address."),

    password: z.string().min(8, "Password must be at least 8 characters."),

    mobile: z
      .string()
      .trim()
      .regex(/^07\d{8}$/, "Enter a valid mobile number (07XXXXXXXX)."),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
