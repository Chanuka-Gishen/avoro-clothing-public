"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { ROUTES } from "@/config/routes";
import { useForgotPassword } from "@/features/auth/hooks/use-password-reset";
import {
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from "@/features/auth/schemas/forgot-password.schema";
import { getApiErrorMessage } from "@/lib/api/api-error";

export function ForgotPasswordForm() {
  const forgotPassword = useForgotPassword();

  const [isSent, setIsSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),

    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgotPasswordFormValues) {
    try {
      await forgotPassword.mutateAsync({
        email: values.email.trim(),
      });

      setIsSent(true);
    } catch (error) {
      console.error(getApiErrorMessage(error));
    }
  }

  if (isSent) {
    return (
      <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-neutral-100">
          <Mail className="size-5 text-neutral-700" />
        </div>

        <h2 className="mt-4 text-lg font-semibold text-neutral-950">
          Check your email
        </h2>

        <p className="mt-2 text-sm leading-6 text-neutral-500">
          If an account exists for that email address, we've sent instructions
          to reset your password.
        </p>

        <Link
          href={ROUTES.LOGIN}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-neutral-950 hover:text-neutral-600"
        >
          <ArrowLeft className="size-4" />
          Back to login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-neutral-900"
        >
          Email address
        </label>

        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register("email")}
          placeholder="you@example.com"
          className="h-12 w-full rounded-lg border border-neutral-300 bg-white px-4 text-sm text-neutral-950 outline-none transition focus:border-neutral-950"
        />

        {errors.email?.message && (
          <p className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>

      {forgotPassword.isError && (
        <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {getApiErrorMessage(forgotPassword.error)}
        </p>
      )}

      <button
        type="submit"
        disabled={forgotPassword.isPending}
        className="h-12 w-full rounded-lg bg-neutral-950 px-6 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {forgotPassword.isPending ? "Sending..." : "Send reset link"}
      </button>

      <div className="text-center">
        <Link
          href={ROUTES.LOGIN}
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition hover:text-neutral-950"
        >
          <ArrowLeft className="size-4" />
          Back to login
        </Link>
      </div>
    </form>
  );
}
