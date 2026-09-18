import { apiClient } from "@/lib/api/api-client";
import type { ApiResponse } from "@/types/api.types";

import type {
  ForgotPasswordPayload,
  ResetPasswordPayload,
} from "../types/password-reset.types";

export async function forgotPassword(payload: ForgotPasswordPayload) {
  const { data } = await apiClient.post<ApiResponse<null>>(
    "/auth/forgot-password",
    payload,
  );

  return data;
}

export async function resetPassword(payload: ResetPasswordPayload) {
  const { data } = await apiClient.post<ApiResponse<null>>(
    "/auth/reset-password",
    payload,
  );

  return data;
}
