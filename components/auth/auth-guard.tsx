// src/features/auth/components/auth-guard.tsx

"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { ROUTES } from "@/config/routes";
import { useAuthStore } from "@/features/auth/store/auth.store";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const isInitialized = useAuthStore((state) => state.isInitialized);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }

    if (!isAuthenticated) {
      const redirect = encodeURIComponent(pathname);

      router.replace(`${ROUTES.LOGIN}?redirect=${redirect}`);
    }
  }, [isAuthenticated, isInitialized, pathname, router]);

  if (!isInitialized) {
    return <ProtectedRouteLoading />;
  }

  if (!isAuthenticated) {
    return <ProtectedRouteLoading />;
  }

  return children;
}

function ProtectedRouteLoading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="size-8 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-950" />
    </div>
  );
}
