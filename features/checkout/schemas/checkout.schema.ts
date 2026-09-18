import { z } from "zod";

const addressSchema = z.object({
  street: z.string().trim().min(1, "Street address is required."),
  city: z.string().trim().min(1, "City is required."),
  state: z.string().trim().min(1, "State / Province is required."),
  zip: z.string().trim().optional(),
  country: z.string().trim().min(1, "Country is required."),
});

export const checkoutSchema = z
  .object({
    firstName: z.string().trim().optional(),
    lastName: z.string().trim().optional(),
    email: z.string().trim().optional(),
    mobile: z.string().trim().optional(),

    shippingAddress: addressSchema,
    useDifferentBillingAddress: z.boolean(),
    billingAddress: addressSchema.optional(),

    paymentMethodId: z.string().min(1, "Please select a payment method."),
    notes: z.string().trim().max(500, "Notes are too long.").optional(),
  })
  .superRefine((data, ctx) => {
    if (data.useDifferentBillingAddress && !data.billingAddress) {
      ctx.addIssue({
        code: "custom",
        path: ["billingAddress"],
        message: "Billing address is required.",
      });
    }
  });

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
