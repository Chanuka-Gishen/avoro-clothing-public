"use client";

import type { ReactNode } from "react";

import { AuthInitializer } from "@/components/auth/auth-initializer";
import { QueryProvider } from "@/lib/query/query-provider";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <QueryProvider>
      <AuthInitializer />
      {children}
    </QueryProvider>
  );
}
