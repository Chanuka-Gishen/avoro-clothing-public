import { apiClient } from "@/lib/api/api-client";
import type { ApiResponse } from "@/types/api.types";

import type { PaymentMethod } from "../types/payment-method.types";

export async function getPaymentMethods() {
  const { data } =
    await apiClient.get<ApiResponse<PaymentMethod[]>>("/payment-methods");

  return data;
}
