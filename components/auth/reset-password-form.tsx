"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { ROUTES } from "@/config/routes";
import { useResetPassword } from "@/features/auth/hooks/use-password-reset";
import {
  resetPasswordSchema,
  type ResetPasswordFormValues,
} from "@/features/auth/schemas/reset-password.schema";
import { getApiErrorMessage } from "@/lib/api/api-error";

interface ResetPasswordFormProps {
  token?: string;
}

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter();

  const resetPassword = useResetPassword();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),

    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: ResetPasswordFormValues) {
    if (!token) {
      return;
    }

    try {
      await resetPassword.mutateAsync({
        token,
        password: values.password,
      });

      router.replace(`${ROUTES.LOGIN}?reset=success`);
    } catch (error) {
      console.error(getApiErrorMessage(error));
    }
  }

  if (!token) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-center">
        <h2 className="font-semibold text-red-800">Invalid reset link</h2>

        <p className="mt-2 text-sm text-red-700">
          This password reset link is invalid or incomplete.
        </p>

        <Link
          href="/forgot-password"
          className="mt-5 inline-flex text-sm font-medium text-neutral-950 underline"
        >
          Request another reset link
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-neutral-900"
        >
          New password
        </label>

        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            {...register("password")}
            className="h-12 w-full rounded-lg border border-neutral-300 bg-white px-4 pr-12 text-sm text-neutral-950 outline-none transition focus:border-neutral-950"
          />

          <button
            type="button"
            onClick={() => setShowPassword((current) => !current)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-0 top-0 flex size-12 items-center justify-center text-neutral-500 hover:text-neutral-950"
          >
            {showPassword ? (
              <EyeOff className="size-5" />
            ) : (
              <Eye className="size-5" />
            )}
          </button>
        </div>

        {errors.password?.message && (
          <p className="mt-1.5 text-xs text-red-600">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-2 block text-sm font-medium text-neutral-900"
        >
          Confirm new password
        </label>

        <input
          id="confirmPassword"
          type={showPassword ? "text" : "password"}
          autoComplete="new-password"
          {...register("confirmPassword")}
          className="h-12 w-full rounded-lg border border-neutral-300 bg-white px-4 text-sm text-neutral-950 outline-none transition focus:border-neutral-950"
        />

        {errors.confirmPassword?.message && (
          <p className="mt-1.5 text-xs text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      {resetPassword.isError && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {getApiErrorMessage(resetPassword.error)}
        </p>
      )}

      <button
        type="submit"
        disabled={resetPassword.isPending}
        className="h-12 w-full rounded-lg bg-neutral-950 px-6 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {resetPassword.isPending ? "Resetting password..." : "Reset password"}
      </button>
    </form>
  );
}
