"use client";

import { Heart } from "lucide-react";
import Link from "next/link";

import { ROUTES } from "@/config/routes";
import { useWishlistStore } from "@/store/wishlist.store";

export function WishlistButton() {
  const items = useWishlistStore((state) => state.items);
  const count = items.length;

  return (
    <Link
      href={ROUTES.WISHLIST}
      aria-label={count > 0 ? `Wishlist with ${count} items` : "Wishlist"}
      className="relative hidden size-10 items-center justify-center rounded-full transition-colors hover:bg-neutral-100 sm:flex"
    >
      <Heart className="size-5" />

      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex min-w-4.5 h-4.5 items-center justify-center rounded-full bg-neutral-950 px-1 text-[10px] font-semibold leading-none text-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
