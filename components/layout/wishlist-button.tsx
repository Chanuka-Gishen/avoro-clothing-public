"use client";

import { Heart } from "lucide-react";
import Link from "next/link";

import { ROUTES } from "@/config/routes";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useWishlist } from "@/features/wishlist/hooks/use-wishlist";

export function WishlistButton() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const isInitialized = useAuthStore((state) => state.isInitialized);

  const { data } = useWishlist();

  const count =
    isInitialized && isAuthenticated ? (data?.response?.items.length ?? 0) : 0;

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
