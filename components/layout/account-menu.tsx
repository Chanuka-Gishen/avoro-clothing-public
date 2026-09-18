// src/components/layout/account-menu.tsx

"use client";

import { LogIn, LogOut, Package, UserRound } from "lucide-react";
import Link from "next/link";

import { ROUTES } from "@/config/routes";
import { useLogout } from "@/features/auth/hooks/use-logout";
import { useAuthStore } from "@/features/auth/store/auth.store";

export function AccountMenu() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  const logout = useLogout();

  if (!isInitialized) {
    return <div className="size-10 rounded-full bg-neutral-100" />;
  }

  if (!isAuthenticated || !user) {
    return (
      <Link
        href={ROUTES.LOGIN}
        aria-label="Sign in"
        className="flex size-10 items-center justify-center rounded-full transition hover:bg-neutral-100"
      >
        <LogIn className="size-5" />
      </Link>
    );
  }

  return (
    <div className="group relative">
      <Link
        href={ROUTES.ACCOUNT}
        aria-label="Account"
        className="flex size-10 items-center justify-center rounded-full transition hover:bg-neutral-100"
      >
        <UserRound className="size-5" />
      </Link>

      <div className="invisible absolute right-0 top-full z-50 w-56 translate-y-2 pt-2 opacity-0 transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <div className="rounded-xl border border-neutral-200 bg-white p-2 shadow-lg">
          <div className="border-b border-neutral-100 px-3 py-3">
            <p className="text-sm font-medium text-neutral-950">
              {user.firstName} {user.lastName}
            </p>

            <p className="mt-0.5 truncate text-xs text-neutral-500">
              {user.email}
            </p>
          </div>

          <div className="py-2">
            <Link
              href={ROUTES.ACCOUNT}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-neutral-700 transition hover:bg-neutral-50"
            >
              <UserRound className="size-4" />
              My account
            </Link>

            <Link
              href={ROUTES.ACCOUNT_ORDERS}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-neutral-700 transition hover:bg-neutral-50"
            >
              <Package className="size-4" />
              Orders
            </Link>
          </div>

          <div className="border-t border-neutral-100 pt-2">
            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-red-600 transition hover:bg-red-50"
            >
              <LogOut className="size-4" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
