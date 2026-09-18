"use client";

import { useMutation } from "@tanstack/react-query";

import { forgotPassword, resetPassword } from "../api/password-reset.api";
import type {
  ForgotPasswordPayload,
  ResetPasswordPayload,
} from "../types/password-reset.types";

export function useForgotPassword() {
  return useMutation({
    mutationFn: (payload: ForgotPasswordPayload) => forgotPassword(payload),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (payload: ResetPasswordPayload) => resetPassword(payload),
  });
}
