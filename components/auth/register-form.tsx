"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { ROUTES } from "@/config/routes";
import { register as registerUser } from "@/features/auth/api/auth.api";
import { authStorage } from "@/store/auth-storage";
import {
  registerSchema,
  type RegisterFormValues,
} from "@/features/auth/schemas/register.schema";
import { getApiErrorMessage } from "@/lib/api/api-error";
import { useAuthStore } from "@/features/auth/store/auth.store";

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const setAuth = useAuthStore((state) => state.setAuth);

  const [showPassword, setShowPassword] = useState(false);

  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: RegisterFormValues) {
    setFormError(null);

    try {
      const result = await registerUser({
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        mobile: values.mobile,
        password: values.password,
      });

      const auth = result.response;

      if (!auth) {
        throw new Error("Invalid registration response.");
      }

      const redirect = searchParams.get("redirect");

      authStorage.setAuth(auth.accessToken, auth.refreshToken, auth.user);

      setAuth(auth.user);

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

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="firstName"
            className="mb-2 block text-sm font-medium text-neutral-900"
          >
            First name
          </label>

          <input
            id="firstName"
            {...register("firstName")}
            className="h-11 w-full rounded-lg border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-950"
          />

          {errors.firstName && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="mb-2 block text-sm font-medium text-neutral-900"
          >
            Last name
          </label>

          <input
            id="lastName"
            {...register("lastName")}
            className="h-11 w-full rounded-lg border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-950"
          />

          {errors.lastName && (
            <p className="mt-1.5 text-xs text-red-600">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

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
          className="h-11 w-full rounded-lg border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-950"
        />

        {errors.email && (
          <p className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="mobile"
          className="mb-2 block text-sm font-medium text-neutral-900"
        >
          Mobile number
        </label>

        <input
          id="mobile"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="07X XXX XXXX"
          maxLength={10}
          {...register("mobile")}
          className="h-12 w-full rounded-lg border border-neutral-300 bg-white px-4 text-sm text-neutral-950 outline-none transition focus:border-neutral-950"
        />

        {errors.mobile?.message && (
          <p className="mt-1.5 text-xs text-red-600">{errors.mobile.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-medium text-neutral-900"
        >
          Password
        </label>

        <div className="relative">
          <input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            {...register("password")}
            className="h-11 w-full rounded-lg border border-neutral-300 px-3 pr-11 text-sm outline-none focus:border-neutral-950"
          />

          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center text-neutral-400"
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

      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-2 block text-sm font-medium text-neutral-900"
        >
          Confirm password
        </label>

        <input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          {...register("confirmPassword")}
          className="h-11 w-full rounded-lg border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-950"
        />

        {errors.confirmPassword && (
          <p className="mt-1.5 text-xs text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="h-11 w-full rounded-lg bg-neutral-950 px-4 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:opacity-60"
      >
        {isSubmitting ? "Creating account..." : "Create account"}
      </button>

      <p className="text-center text-sm text-neutral-500">
        Already have an account?{" "}
        <Link
          href={ROUTES.LOGIN}
          className="font-medium text-neutral-950 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
