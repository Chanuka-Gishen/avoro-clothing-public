import { z } from "zod";

const addressSchema = z.object({
  street: z.string().trim().min(1, "Street address is required."),
  city: z.string().trim().min(1, "City is required."),
  state: z.string().trim().min(1, "State / Province is required."),
  zip: z.string().trim().optional(),
  country: z.string().trim().min(1, "Country is required."),
});

export function createCheckoutSchema(isAuthenticated: boolean) {
  return z
    .object({
      firstName: z.string().trim().optional(),
      lastName: z.string().trim().optional(),
      email: z.email().trim().optional().or(z.literal("")),
      mobile: z
        .string()
        .trim()
        .regex(/^0\d{9}$/, "Enter a valid mobile number (0XX XXX XXXX).")
        .optional()
        .or(z.literal("")),

      shippingAddress: addressSchema,

      useDifferentBillingAddress: z.boolean(),
      billingAddress: addressSchema.optional(),

      paymentMethodId: z.string().min(1, "Please select a payment method."),

      notes: z.string().trim().max(500, "Notes are too long.").optional(),
    })
    .superRefine((data, ctx) => {
      // Guest customer information
      if (!isAuthenticated) {
        if (!data.firstName) {
          ctx.addIssue({
            code: "custom",
            path: ["firstName"],
            message: "First name is required.",
          });
        }

        if (!data.lastName) {
          ctx.addIssue({
            code: "custom",
            path: ["lastName"],
            message: "Last name is required.",
          });
        }

        if (!data.email) {
          ctx.addIssue({
            code: "custom",
            path: ["email"],
            message: "Email is required.",
          });
        }

        if (!data.mobile) {
          ctx.addIssue({
            code: "custom",
            path: ["mobile"],
            message: "Mobile number is required.",
          });
        }
      }

      // Billing address
      if (data.useDifferentBillingAddress && !data.billingAddress) {
        ctx.addIssue({
          code: "custom",
          path: ["billingAddress"],
          message: "Billing address is required.",
        });
      }
    });
}

export type CheckoutFormValues = z.infer<
  ReturnType<typeof createCheckoutSchema>
>;
