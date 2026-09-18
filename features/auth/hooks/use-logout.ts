"use client";

import { useRouter } from "next/navigation";

import { ROUTES } from "@/config/routes";
import { logout } from "@/features/auth/api/auth.api";
import { authStorage } from "@/store/auth-storage";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useQueryClient } from "@tanstack/react-query";
import { cartQueryKeys } from "@/features/cart/api/cart.queries";

export function useLogout() {
  const router = useRouter();

  const clearAuth = useAuthStore((state) => state.clearAuth);

  const queryClient = useQueryClient();

  return async function handleLogout() {
    try {
      await logout();
    } finally {
      authStorage.clear();
      clearAuth();

      queryClient.removeQueries({
        queryKey: cartQueryKeys.all,
      });

      await queryClient.refetchQueries({
        queryKey: cartQueryKeys.all,
        type: "active",
      });

      router.replace(ROUTES.HOME);
      router.refresh();
    }
  };
}
