import { apiClient } from "@/lib/api/api-client";
import type { ApiResponse } from "@/types/api.types";

import type {
  SendGuestOtpPayload,
  VerifyGuestOtpPayload,
  VerifyGuestOtpResponse,
} from "../types/guest-otp.types";

export async function sendGuestOtp(payload: SendGuestOtpPayload) {
  const { data } = await apiClient.post<ApiResponse<null>>(
    "/checkout/guest/send-otp",
    payload,
  );

  return data;
}

export async function verifyGuestOtp(payload: VerifyGuestOtpPayload) {
  const { data } = await apiClient.post<ApiResponse<VerifyGuestOtpResponse>>(
    "/checkout/guest/verify-otp",
    payload,
  );

  return data;
}
