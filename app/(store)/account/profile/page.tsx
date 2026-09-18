"use client";

import { CustomerVerificationCard } from "@/components/account/customer-verification-card";
import { useAuthStore } from "@/features/auth/store/auth.store";

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return null;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
        Profile
      </h2>

      <p className="mt-2 text-sm text-neutral-500">
        Your personal account information.
      </p>

      <div className="mt-8 max-w-xl rounded-xl border border-neutral-200 p-6">
        <dl className="space-y-5">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-neutral-400">
              Name
            </dt>

            <dd className="mt-1 text-sm text-neutral-950">
              {user.firstName} {user.lastName}
            </dd>
          </div>

          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-neutral-400">
              Email
            </dt>

            <dd className="mt-1 text-sm text-neutral-950">{user.email}</dd>
          </div>

          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-neutral-400">
              Email status
            </dt>

            <dd className="mt-1 text-sm text-neutral-950">
              {user.isEmailVerified ? "Verified" : "Not verified"}
            </dd>
          </div>

          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-neutral-400">
              Mobile status
            </dt>

            <dd className="mt-1 text-sm text-neutral-950">
              {user.isMobileVerified ? "Verified" : "Not verified"}
            </dd>
          </div>
        </dl>
        <div className="mt-8 space-y-4">
          <CustomerVerificationCard
            type="email"
            value={user.email}
            verified={user.isEmailVerified}
          />

          <CustomerVerificationCard
            type="mobile"
            value={user.mobile}
            verified={user.isMobileVerified}
          />
        </div>
      </div>
    </div>
  );
}
