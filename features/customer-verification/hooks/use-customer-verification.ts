"use client";

import { useMutation } from "@tanstack/react-query";

import {
  sendEmailVerification,
  sendMobileVerification,
  verifyEmail,
  verifyMobile,
} from "../api/customer-verification.api";
import type { VerifyCodePayload } from "../types/customer-verification.types";

export function useSendEmailVerification() {
  return useMutation({
    mutationFn: sendEmailVerification,
  });
}

export function useVerifyEmail() {
  return useMutation({
    mutationFn: (payload: VerifyCodePayload) => verifyEmail(payload),
  });
}

export function useSendMobileVerification() {
  return useMutation({
    mutationFn: sendMobileVerification,
  });
}

export function useVerifyMobile() {
  return useMutation({
    mutationFn: (payload: VerifyCodePayload) => verifyMobile(payload),
  });
}
