"use client";

import { Heart, LoaderCircle } from "lucide-react";
import Link from "next/link";

import { ProductGrid } from "@/components/product/product-grid";
import { ROUTES } from "@/config/routes";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useWishlist } from "@/features/wishlist/hooks/use-wishlist";

export function WishlistContent() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const isInitialized = useAuthStore((state) => state.isInitialized);

  const { data, isLoading, isError } = useWishlist();

  if (!isInitialized) {
    return <WishlistLoading />;
  }

  if (!isAuthenticated) {
    return <WishlistLoginRequired />;
  }

  if (isLoading) {
    return <WishlistLoading />;
  }

  if (isError) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-5">
        <p className="text-sm text-red-700">
          Unable to load your wishlist. Please try again.
        </p>
      </div>
    );
  }

  const wishlist = data?.response;

  const products = wishlist?.items.map((item) => item.product) ?? [];

  if (products.length === 0) {
    return <WishlistEmpty />;
  }

  return (
    <>
      <div className="mb-6 flex items-center justify-between gap-4">
        <p className="text-sm text-neutral-500">
          {products.length} {products.length === 1 ? "item" : "items"} saved
        </p>
      </div>

      <ProductGrid products={products} />
    </>
  );
}

function WishlistLoading() {
  return (
    <div className="flex min-h-60 items-center justify-center">
      <LoaderCircle className="size-6 animate-spin text-neutral-500" />
    </div>
  );
}

function WishlistLoginRequired() {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 px-6 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-white">
        <Heart className="size-6 text-neutral-700" />
      </div>

      <h2 className="mt-5 text-xl font-semibold text-neutral-950">
        Sign in to view your wishlist
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-neutral-500">
        Save your favourite furniture and easily find it again when you return.
      </p>

      <Link
        href={ROUTES.LOGIN}
        className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-neutral-950 px-6 text-sm font-medium text-white transition hover:bg-neutral-800"
      >
        Sign in
      </Link>
    </div>
  );
}

function WishlistEmpty() {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50 px-6 text-center">
      <div className="flex size-14 items-center justify-center rounded-full bg-white">
        <Heart className="size-6 text-neutral-700" />
      </div>

      <h2 className="mt-5 text-xl font-semibold text-neutral-950">
        Your wishlist is empty
      </h2>

      <p className="mt-2 max-w-md text-sm leading-6 text-neutral-500">
        Browse our furniture collection and save the pieces you love.
      </p>

      <Link
        href={ROUTES.SHOP}
        className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-neutral-950 px-6 text-sm font-medium text-white transition hover:bg-neutral-800"
      >
        Explore furniture
      </Link>
    </div>
  );
}
