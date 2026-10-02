import { apiClient } from "@/lib/api/api-client";
import type { ApiResponse } from "@/types/api.types";
import {
  SendGuestEmailOtpPayload,
  SendGuestMobileOtpPayload,
  VerifyGuestEmaileOtpPayload,
  VerifyGuestMobileOtpPayload,
  VerifyGuestOtpResponse,
} from "../types/guest-otp.types";

export async function sendGuestOtp(payload: SendGuestMobileOtpPayload) {
  const { data } = await apiClient.post<ApiResponse<null>>(
    "/checkout/guest/send-otp-mobile",
    payload,
  );

  return data;
}

export async function sendGuestOtpEmail(payload: SendGuestEmailOtpPayload) {
  const { data } = await apiClient.post<ApiResponse<null>>(
    "/checkout/guest/send-otp-email",
    payload,
  );

  return data;
}

export async function verifyGuestOtp(payload: VerifyGuestMobileOtpPayload) {
  const { data } = await apiClient.post<ApiResponse<VerifyGuestOtpResponse>>(
    "/checkout/guest/verify-otp-mobile",
    payload,
  );

  return data;
}

export async function verifyGuestOtpEmail(
  payload: VerifyGuestEmaileOtpPayload,
) {
  const { data } = await apiClient.post<ApiResponse<VerifyGuestOtpResponse>>(
    "/checkout/guest/verify-otp-email",
    payload,
  );

  return data;
}
