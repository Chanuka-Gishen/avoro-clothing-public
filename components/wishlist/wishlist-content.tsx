"use client";

import Link from "next/link";
import { Heart, ArrowRight } from "lucide-react";
import { useWishlistStore } from "@/store/wishlist.store";
import { ROUTES } from "@/config/routes";
import { WishlistProductGrid } from "./wishlist-product-grid";

export function WishlistContent() {
  const items = useWishlistStore((state) => state.items);

  if (items.length === 0) {
    return <WishlistEmpty />;
  }

  return (
    <section
      className="mx-auto max-w-[1600px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20 xl:px-16"
      aria-labelledby="wishlist-heading"
    >
      <div className="mb-10 border-b border-neutral-200 pb-8 sm:mb-12 sm:pb-10">
        <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-neutral-400 sm:text-xs">
          AVORO / Saved
        </p>

        <div className="mt-3 flex items-end justify-between gap-6">
          <h1
            id="wishlist-heading"
            className="text-3xl font-medium uppercase tracking-[-0.03em] text-neutral-950 sm:text-4xl lg:text-5xl"
          >
            Wishlist
          </h1>

          <p className="shrink-0 pb-1 text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-400 sm:text-[11px]">
            {items.length} {items.length === 1 ? "item" : "items"}
          </p>
        </div>
      </div>

      <WishlistProductGrid products={items} />
    </section>
  );
}

function WishlistEmpty() {
  return (
    <section
      className="mx-auto max-w-[1600px] px-5 py-12 sm:px-8 sm:py-16 lg:px-12 lg:py-20 xl:px-16"
      aria-labelledby="wishlist-heading"
    >
      <div className="border-b border-neutral-200 pb-8 sm:pb-10">
        <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-neutral-400 sm:text-xs">
          AVORO / Saved
        </p>

        <h1
          id="wishlist-heading"
          className="mt-3 text-3xl font-medium uppercase tracking-[-0.03em] text-neutral-950 sm:text-4xl lg:text-5xl"
        >
          Wishlist
        </h1>
      </div>

      <div className="flex min-h-[460px] flex-col items-center justify-center px-4 py-20 text-center">
        <Heart
          className="size-8 text-neutral-950"
          strokeWidth={1.2}
          aria-hidden="true"
        />

        <h2 className="mt-7 text-lg font-medium uppercase tracking-[0.04em] text-neutral-950 sm:text-xl">
          Nothing saved yet
        </h2>

        <p className="mt-3 max-w-sm text-sm leading-6 text-neutral-500">
          Save the pieces you&apos;re into and come back to them whenever
          you&apos;re ready.
        </p>

        <Link
          href={ROUTES.SHOP}
          className="group mt-8 inline-flex h-12 items-center justify-center gap-3 bg-neutral-950 px-7 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-neutral-800"
        >
          <ArrowRight
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={1.5}
            aria-hidden="true"
          />
        </Link>
      </div>
    </section>
  );
}
