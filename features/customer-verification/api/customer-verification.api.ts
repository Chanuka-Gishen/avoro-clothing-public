import { apiClient } from "@/lib/api/api-client";
import type { ApiResponse } from "@/types/api.types";

import type { VerifyCodePayload } from "../types/customer-verification.types";

export async function sendEmailVerification() {
  const { data } = await apiClient.get<ApiResponse<null>>(
    "/customer-verification/email",
  );

  return data;
}

export async function verifyEmail(payload: VerifyCodePayload) {
  const { data } = await apiClient.post<ApiResponse<null>>(
    "/customer-verification/email",
    payload,
  );

  return data;
}

export async function sendMobileVerification() {
  const { data } = await apiClient.get<ApiResponse<null>>(
    "/customer-verification/mobile",
  );

  return data;
}

export async function verifyMobile(payload: VerifyCodePayload) {
  const { data } = await apiClient.post<ApiResponse<null>>(
    "/customer-verification/mobile",
    payload,
  );

  return data;
}
