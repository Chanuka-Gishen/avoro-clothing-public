// src/features/auth/components/auth-initializer.tsx

"use client";

import { useEffect } from "react";

import { useAuthStore } from "@/features/auth/store/auth.store";

export function AuthInitializer() {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return null;
}
