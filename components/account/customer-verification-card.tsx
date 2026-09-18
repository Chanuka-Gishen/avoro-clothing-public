"use client";

import { CheckCircle2, Mail, Smartphone } from "lucide-react";
import { useState } from "react";

import { useAuthStore } from "@/features/auth/store/auth.store";
import {
  useSendEmailVerification,
  useSendMobileVerification,
  useVerifyEmail,
  useVerifyMobile,
} from "@/features/customer-verification/hooks/use-customer-verification";
import { getApiErrorMessage } from "@/lib/api/api-error";

interface CustomerVerificationCardProps {
  type: "email" | "mobile";
  value: string;
  verified: boolean;
}

export function CustomerVerificationCard({
  type,
  value,
  verified,
}: CustomerVerificationCardProps) {
  const setAuth = useAuthStore((state) => state.setAuth);

  const user = useAuthStore((state) => state.user);

  const [code, setCode] = useState("");
  const [codeSent, setCodeSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendEmail = useSendEmailVerification();

  const verifyEmail = useVerifyEmail();

  const sendMobile = useSendMobileVerification();

  const verifyMobile = useVerifyMobile();

  const isEmail = type === "email";

  const sendMutation = isEmail ? sendEmail : sendMobile;

  const verifyMutation = isEmail ? verifyEmail : verifyMobile;

  async function handleSend() {
    setError(null);

    try {
      if (isEmail) {
        await sendEmail.mutateAsync();
      } else {
        await sendMobile.mutateAsync();
      }

      setCodeSent(true);
      setCode("");
    } catch (error) {
      setError(getApiErrorMessage(error));
    }
  }

  async function handleVerify() {
    if (!code.trim() || !user) {
      return;
    }

    setError(null);

    try {
      if (isEmail) {
        await verifyEmail.mutateAsync({
          code: code.trim(),
        });

        setAuth({
          ...user,
          isEmailVerified: true,
        });
      } else {
        await verifyMobile.mutateAsync({
          code: code.trim(),
        });

        setAuth({
          ...user,
          isMobileVerified: true,
        });
      }

      setCode("");
      setCodeSent(false);
    } catch (error) {
      setError(getApiErrorMessage(error));
    }
  }

  const Icon = isEmail ? Mail : Smartphone;

  if (verified) {
    return (
      <div className="flex items-center justify-between gap-4 rounded-xl border border-neutral-200 p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-full bg-green-50">
            <Icon className="size-4 text-green-700" />
          </div>

          <div>
            <p className="text-sm font-medium text-neutral-950">
              {isEmail ? "Email verified" : "Mobile verified"}
            </p>

            <p className="mt-1 text-xs text-neutral-500">{value}</p>
          </div>
        </div>

        <CheckCircle2 className="size-5 text-green-600" />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
      <div className="flex items-start gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white">
          <Icon className="size-4 text-neutral-700" />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-neutral-950">
            Verify your {isEmail ? "email" : "mobile number"}
          </p>

          <p className="mt-1 text-xs text-neutral-500">{value}</p>

          {!codeSent ? (
            <button
              type="button"
              onClick={handleSend}
              disabled={sendMutation.isPending}
              className="mt-3 text-sm font-medium text-neutral-950 underline disabled:opacity-50"
            >
              {sendMutation.isPending ? "Sending..." : "Send verification code"}
            </button>
          ) : (
            <div className="mt-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  value={code}
                  onChange={(event) =>
                    setCode(event.target.value.replace(/\D/g, ""))
                  }
                  placeholder="Verification code"
                  className="h-10 min-w-0 flex-1 rounded-lg border border-neutral-300 bg-white px-3 text-sm outline-none focus:border-neutral-950"
                />

                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={verifyMutation.isPending || !code.trim()}
                  className="rounded-lg bg-neutral-950 px-4 text-sm font-medium text-white disabled:opacity-50"
                >
                  {verifyMutation.isPending ? "Verifying..." : "Verify"}
                </button>
              </div>

              <button
                type="button"
                onClick={handleSend}
                disabled={sendMutation.isPending}
                className="mt-3 text-xs font-medium text-neutral-500 underline"
              >
                Resend code
              </button>
            </div>
          )}

          {error && <p className="mt-3 text-xs text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}
