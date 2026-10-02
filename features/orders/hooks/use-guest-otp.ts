"use client";

import { useMutation } from "@tanstack/react-query";

import {
  sendGuestOtp,
  sendGuestOtpEmail,
  verifyGuestOtp,
  verifyGuestOtpEmail,
} from "../api/guest-otp.api";
import {
  SendGuestEmailOtpPayload,
  SendGuestMobileOtpPayload,
  VerifyGuestEmaileOtpPayload,
  VerifyGuestMobileOtpPayload,
} from "../types/guest-otp.types";

export function useSendGuestOtpMobile() {
  return useMutation({
    mutationFn: (payload: SendGuestMobileOtpPayload) => sendGuestOtp(payload),
  });
}

export function useSendGuestOtpEmail() {
  return useMutation({
    mutationFn: (payload: SendGuestEmailOtpPayload) =>
      sendGuestOtpEmail(payload),
  });
}

export function useVerifyGuestOtpMobile() {
  return useMutation({
    mutationFn: (payload: VerifyGuestMobileOtpPayload) =>
      verifyGuestOtp(payload),
  });
}

export function useVerifyGuestOtpEmail() {
  return useMutation({
    mutationFn: (payload: VerifyGuestEmaileOtpPayload) =>
      verifyGuestOtpEmail(payload),
  });
}
