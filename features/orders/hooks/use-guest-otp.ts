"use client";

import { useMutation } from "@tanstack/react-query";

import { sendGuestOtp, verifyGuestOtp } from "../api/guest-otp.api";

import type {
  SendGuestOtpPayload,
  VerifyGuestOtpPayload,
} from "../types/guest-otp.types";

export function useSendGuestOtp() {
  return useMutation({
    mutationFn: (payload: SendGuestOtpPayload) => sendGuestOtp(payload),
  });
}

export function useVerifyGuestOtp() {
  return useMutation({
    mutationFn: (payload: VerifyGuestOtpPayload) => verifyGuestOtp(payload),
  });
}
