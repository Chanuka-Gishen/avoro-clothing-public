"use client";

import { Trash2 } from "lucide-react";

import { useRemoveWishlistItem } from "@/features/wishlist/hooks/use-wishlist";

interface RemoveWishlistButtonProps {
  productId: string;
}

export function RemoveWishlistButton({ productId }: RemoveWishlistButtonProps) {
  const removeWishlistItem = useRemoveWishlistItem();

  async function handleRemove() {
    try {
      await removeWishlistItem.mutateAsync(productId);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button
      type="button"
      onClick={handleRemove}
      disabled={removeWishlistItem.isPending}
      className="inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Trash2 className="size-4" />

      {removeWishlistItem.isPending ? "Removing..." : "Remove"}
    </button>
  );
}
