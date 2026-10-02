"use client";

import { Heart } from "lucide-react";

import { useWishlistStore, WishlistItem } from "@/store/wishlist.store";

interface WishlistButtonProps {
  wishlistItem: WishlistItem;
  variant?: "icon" | "full";
  className?: string;
}

export function WishlistButton({
  wishlistItem,
  variant = "full",
  className,
}: WishlistButtonProps) {
  const isWishlisted = useWishlistStore((state) =>
    state.items.some((item) => item.id === wishlistItem.productId),
  );

  const toggleWishlistItem = useWishlistStore((state) => state.toggleItem);

  function handleWishlistClick() {
    toggleWishlistItem(wishlistItem);
  }

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={handleWishlistClick}
        aria-pressed={isWishlisted}
        aria-label={
          isWishlisted
            ? `Remove ${wishlistItem.product.name} from wishlist`
            : `Add ${wishlistItem.product.name} to wishlist`
        }
        className={
          className ??
          "flex size-11 shrink-0 items-center justify-center border border-neutral-300 bg-white transition-colors hover:border-neutral-950"
        }
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
      onClick={handleWishlistClick}
      aria-pressed={isWishlisted}
      className={
        className ??
        "flex h-12 items-center justify-center gap-2 border border-neutral-300 bg-white px-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-950 transition-colors hover:border-neutral-950"
      }
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
