"use client";

import Link from "next/link";

import { ROUTES } from "@/config/routes";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { useCart } from "@/features/cart/hooks/use-cart";
import { CartItemRow } from "./cart-item-row";
import { CartSummary } from "./cart-summary";

export function CartPageContent() {
  const isInitialized = useAuthStore((state) => state.isInitialized);

  const { data, isLoading, isError, refetch } = useCart();

  if (!isInitialized || isLoading) {
    return <CartLoading />;
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-neutral-950">
            Unable to load your cart
          </h1>

          <button
            type="button"
            onClick={() => refetch()}
            className="mt-5 rounded-lg bg-neutral-950 px-5 py-2.5 text-sm font-medium text-white"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  const cart = data?.response;

  if (!cart || !cart.items.length) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-950">
            Your cart is empty
          </h1>

          <p className="mt-4 text-neutral-500">
            Add some furniture to your cart to get started.
          </p>

          <Link
            href={ROUTES.SHOP}
            className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-neutral-950 px-6 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  const items = cart?.items ?? [];

  if (!items.length) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-neutral-950">
            Your cart is empty
          </h1>

          <p className="mt-4 text-neutral-500">
            Add some furniture to your cart to get started.
          </p>

          <Link
            href={ROUTES.SHOP}
            className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-neutral-950 px-6 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-neutral-500">
          Shopping
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
          Your cart
        </h1>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="divide-y divide-neutral-200 border-y border-neutral-200">
          {items.map((item) => (
            <CartItemRow key={item.id} item={item} />
          ))}
        </div>

        <CartSummary cart={cart} />
      </div>
    </div>
  );
}

function CartLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="animate-pulse">
        <div className="h-9 w-48 rounded bg-neutral-200" />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-40 rounded-xl bg-neutral-200" />
            ))}
          </div>

          <div className="h-72 rounded-xl bg-neutral-200" />
        </div>
      </div>
    </div>
  );
}
