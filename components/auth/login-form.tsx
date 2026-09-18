"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { ROUTES } from "@/config/routes";
import { login } from "@/features/auth/api/auth.api";
import { authStorage } from "@/store/auth-storage";
import {
  loginSchema,
  type LoginFormValues,
} from "@/features/auth/schemas/login.schema";
import { getApiErrorMessage } from "@/lib/api/api-error";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useQueryClient } from "@tanstack/react-query";
import { cartQueryKeys } from "@/features/cart/api/cart.queries";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const queryClient = useQueryClient();

  const redirect = searchParams.get("redirect");

  const isCheckoutRedirect = redirect === ROUTES.CHECKOUT;

  const setAuth = useAuthStore((state) => state.setAuth);

  const [showPassword, setShowPassword] = useState(false);

  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setFormError(null);

    try {
      const result = await login(values);

      const auth = result.response;

      if (!auth) {
        throw new Error("Invalid login response.");
      }

      authStorage.setAuth(auth.accessToken, auth.refreshToken, auth.user);

      setAuth(auth.user);

      queryClient.invalidateQueries({
        queryKey: cartQueryKeys.all,
      });

      router.replace(redirect || ROUTES.ACCOUNT);
      router.refresh();
    } catch (error) {
      setFormError(getApiErrorMessage(error));
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {formError && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {formError}
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-medium text-neutral-900"
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          autoComplete="email"
          {...register("email")}
          className="h-11 w-full rounded-lg border border-neutral-300 bg-white px-3 text-sm text-neutral-950 outline-none transition focus:border-neutral-950"
        />

        {errors.email && (
          <p className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <div className="mb-2 flex items-center justify-between gap-3">
          <label
            htmlFor="password"
            className="text-sm font-medium text-neutral-900"
          >
            Password
          </label>

          <Link
            href={ROUTES.FORGOT_PASSWORD}
            className="text-xs font-medium text-neutral-500 transition hover:text-neutral-950"
          >
            Forgot password?
          </Link>
        </div>

        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            {...register("password")}
            className="h-11 w-full rounded-lg border border-neutral-300 bg-white px-3 pr-11 text-sm text-neutral-950 outline-none transition focus:border-neutral-950"
          />

          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center text-neutral-400 transition hover:text-neutral-900"
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>

        {errors.password && (
          <p className="mt-1.5 text-xs text-red-600">
            {errors.password.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="h-11 w-full rounded-lg bg-neutral-950 px-4 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>

      <p className="text-center text-sm text-neutral-500">
        Don&apos;t have an account?{" "}
        <Link
          href={ROUTES.REGISTER}
          className="font-medium text-neutral-950 hover:underline"
        >
          Create account
        </Link>
      </p>

      {isCheckoutRedirect && (
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-200" />
            </div>

            <div className="relative flex justify-center">
              <span className="bg-white px-3 text-xs uppercase tracking-wide text-neutral-400">
                Or
              </span>
            </div>
          </div>

          <Link
            href={ROUTES.CHECKOUT}
            className="mt-6 flex h-12 w-full items-center justify-center rounded-lg border border-neutral-300 bg-white text-sm font-medium text-neutral-950 transition hover:bg-neutral-50"
          >
            Continue as guest
          </Link>

          <p className="mt-3 text-center text-xs leading-5 text-neutral-500">
            You can place your order without creating an account.
          </p>
        </div>
      )}
    </form>
  );
}
