"use client";

import { useQuery } from "@tanstack/react-query";

import { paymentMethodQueryKeys } from "../api/payment-method.queries";
import { getPaymentMethods } from "../api/payment-methods.api";

export function usePaymentMethods() {
  return useQuery({
    queryKey: paymentMethodQueryKeys.list(),
    queryFn: getPaymentMethods,
  });
}
