"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useAuthStore } from "@/features/auth/store/auth.store";

import {
  addWishlistItem,
  getWishlist,
  removeWishlistItem,
} from "../api/wishlist.api";
import { wishlistQueryKeys } from "../api/wishlist.queries";
import type { AddWishlistItemPayload } from "../types/wishlist.types";

export function useWishlist() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const isInitialized = useAuthStore((state) => state.isInitialized);

  return useQuery({
    queryKey: wishlistQueryKeys.detail(),
    queryFn: getWishlist,

    enabled: isInitialized && isAuthenticated,
  });
}

export function useAddWishlistItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddWishlistItemPayload) => addWishlistItem(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: wishlistQueryKeys.all,
      });
    },
  });
}

export function useRemoveWishlistItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeWishlistItem,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: wishlistQueryKeys.all,
      });
    },
  });
}
