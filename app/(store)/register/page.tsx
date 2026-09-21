import type { Metadata } from "next";

import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Create Account",
};

export default function RegisterPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg">
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-950">
            Create your account
          </h1>

          <p className="mt-3 text-sm leading-6 text-neutral-500">
            Create an account to manage orders, your cart, and account
            information.
          </p>
        </div>

        <div className="mt-8">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
