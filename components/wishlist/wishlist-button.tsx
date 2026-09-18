// src/components/wishlist/wishlist-button.tsx
"use client";

import { Heart } from "lucide-react";

import { routePaths, ROUTES } from "@/config/routes";
import { useAuthStore } from "@/features/auth/store/auth.store";
import {
  useAddWishlistItem,
  useRemoveWishlistItem,
  useWishlist,
} from "@/features/wishlist/hooks/use-wishlist";

interface WishlistButtonProps {
  productId: string;
  productName: string;
  variant?: "icon" | "full";
}

export function WishlistButton({
  productId,
  productName,
  variant = "full",
}: WishlistButtonProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const isInitialized = useAuthStore((state) => state.isInitialized);

  const { data } = useWishlist();

  const addWishlistItem = useAddWishlistItem();
  const removeWishlistItem = useRemoveWishlistItem();

  const isWishlisted =
    data?.response?.items.some((item) => item.productId === productId) ?? false;

  const isPending = addWishlistItem.isPending || removeWishlistItem.isPending;

  async function handleClick() {
    if (!isInitialized || isPending) {
      return;
    }

    if (!isAuthenticated) {
      window.location.href = ROUTES.LOGIN;
      return;
    }

    try {
      if (isWishlisted) {
        await removeWishlistItem.mutateAsync(productId);
        return;
      }

      await addWishlistItem.mutateAsync({
        productId,
      });
    } catch (error) {
      console.error(error);
    }
  }

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        aria-pressed={isWishlisted}
        aria-label={
          isWishlisted
            ? `Remove ${productName} from wishlist`
            : `Add ${productName} to wishlist`
        }
        className="flex size-11 items-center justify-center rounded-full border border-neutral-300 bg-white transition hover:border-neutral-950 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Heart
          className={
            isWishlisted
              ? "size-5 fill-neutral-950 text-neutral-950"
              : "size-5 text-neutral-700"
          }
        />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-pressed={isWishlisted}
      className="flex h-12 items-center justify-center gap-2 rounded-lg border border-neutral-300 bg-white px-5 text-sm font-medium text-neutral-950 transition hover:border-neutral-950 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Heart
        className={
          isWishlisted ? "size-5 fill-neutral-950 text-neutral-950" : "size-5"
        }
      />

      {isWishlisted ? "Saved to wishlist" : "Add to wishlist"}
    </button>
  );
}
