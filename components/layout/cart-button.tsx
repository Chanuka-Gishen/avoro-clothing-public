"use client";

import { ShoppingBag } from "lucide-react";
import Link from "next/link";

import { ROUTES } from "@/config/routes";
import { useCart } from "@/features/cart/hooks/use-cart";

export function CartButton() {
  const { data } = useCart();

  const count =
    data?.response?.items.reduce((total, item) => total + item.quantity, 0) ??
    0;

  return (
    <Link
      href={ROUTES.CART}
      aria-label={`Cart with ${count} items`}
      className="relative flex size-10 items-center justify-center rounded-full transition-colors hover:bg-neutral-100"
    >
      <ShoppingBag className="size-5" />

      {count > 0 && (
        <span className="absolute right-0 top-0 flex size-5 items-center justify-center rounded-full bg-neutral-950 text-[10px] font-semibold text-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </Link>
  );
}
