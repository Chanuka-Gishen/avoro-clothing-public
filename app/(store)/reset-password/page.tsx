import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/auth/reset-password-form";

export const metadata: Metadata = {
  title: "Reset Password",
};

interface ResetPasswordPageProps {
  searchParams: Promise<{
    token?: string;
  }>;
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const params = await searchParams;

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg items-center px-4 py-12 sm:px-6">
      <div className="w-full">
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-950">
            Reset your password
          </h1>

          <p className="mt-3 text-sm leading-6 text-neutral-500">
            Enter a new password for your account.
          </p>
        </div>

        <div className="mt-8">
          <ResetPasswordForm token={params.token} />
        </div>
      </div>
    </div>
  );
}
