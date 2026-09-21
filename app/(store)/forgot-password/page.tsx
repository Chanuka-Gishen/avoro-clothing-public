import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg items-center px-4 py-12 sm:px-6">
      <div className="w-full">
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-950">
            Forgot your password?
          </h1>

          <p className="mt-3 text-sm leading-6 text-neutral-500">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>

        <div className="mt-8">
          <ForgotPasswordForm />
        </div>
      </div>
    </div>
  );
}
