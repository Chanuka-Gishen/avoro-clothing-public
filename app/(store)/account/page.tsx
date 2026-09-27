// src/app/(store)/account/page.tsx

"use client";

import Link from "next/link";

import { ROUTES } from "@/config/routes";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { AccountStatus } from "@/components/account/account-status";
import { CustomerVerificationCard } from "@/components/account/customer-verification-card";

export default function AccountPage() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return null;
  }

  return (
    <div>
      <p className="text-sm font-medium uppercase tracking-[0.16em] text-neutral-500">
        Account
      </p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950">
        Hello, {user.firstName}
      </h2>
      <p className="mt-3 text-neutral-500">
        Manage your account information and view your orders.
      </p>
      <div className="mt-8">
        <AccountStatus user={user} />
      </div>
      {/* //TODO - mobile verification check */}
      {!user.isEmailVerified && (
        <div className="mt-6 space-y-4">
          {!user.isEmailVerified && (
            <CustomerVerificationCard
              type="email"
              value={user.email}
              verified={false}
            />
          )}

          {/* {!user.isMobileVerified && (
            <CustomerVerificationCard
              type="mobile"
              value={user.mobile}
              verified={false}
            />
          )} */}
        </div>
      )}
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href={ROUTES.ACCOUNT_ORDERS}
          className="rounded-xl border border-neutral-200 p-6 transition hover:border-neutral-400"
        >
          <h3 className="font-semibold text-neutral-950">Your orders</h3>

          <p className="mt-2 text-sm text-neutral-500">
            View your order history and order status.
          </p>
        </Link>

        <Link
          href={ROUTES.ACCOUNT_PROFILE}
          className="rounded-xl border border-neutral-200 p-6 transition hover:border-neutral-400"
        >
          <h3 className="font-semibold text-neutral-950">Profile</h3>

          <p className="mt-2 text-sm text-neutral-500">
            Manage your personal information.
          </p>
        </Link>
      </div>
    </div>
  );
}
