export const paymentMethodQueryKeys = {
  all: ["payment-methods"] as const,

  list: () => [...paymentMethodQueryKeys.all, "list"] as const,
};
