"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { routePaths } from "@/config/routes";
import type { CartItem } from "@/features/cart/types/cart.types";
import {
  useRemoveCartItem,
  useUpdateCartItem,
} from "@/features/cart/hooks/use-cart";
import { formatCurrency } from "@/lib/utils/currency";

import { QuantitySelector } from "@/components/product/quantity-selector";

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();

  const price = Number(item.product.price);
  const lineTotal = Number(item.subtotal);

  const isUpdating = updateItem.isPending;
  const isRemoving = removeItem.isPending;

  function handleQuantityChange(quantity: number) {
    if (
      isUpdating ||
      !item.available ||
      quantity < 1 ||
      quantity > item.availableQuantity
    ) {
      return;
    }

    updateItem.mutate({
      itemId: item.id,
      payload: {
        quantity,
      },
    });
  }

  function handleRemove() {
    if (isRemoving) {
      return;
    }

    removeItem.mutate(item.id);
  }

  return (
    <article className="flex gap-4 border-b border-neutral-200 py-6 sm:gap-6 sm:py-8">
      {/* Product image */}
      <Link
        href={routePaths.product(item.product.slug)}
        className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden bg-neutral-100 sm:w-32"
      >
        {item.image?.url ? (
          <Image
            src={item.image.url}
            alt={item.product.name}
            fill
            sizes="(max-width: 639px) 96px, 128px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center px-2 text-center text-[9px] font-medium uppercase tracking-[0.14em] text-neutral-400">
            Image unavailable
          </div>
        )}
      </Link>

      {/* Product information */}
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={routePaths.product(item.product.slug)}
              className="block"
            >
              <h3 className="text-xs font-medium uppercase leading-5 tracking-[0.04em] text-neutral-950 transition-opacity hover:opacity-60 sm:text-sm">
                {item.product.name}
              </h3>
            </Link>

            {/* Color + Size */}
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5">
              <div className="flex items-center gap-2">
                <span
                  className="size-3.5 shrink-0 border border-black/10"
                  style={{
                    backgroundColor: item.productColor.color.hexCode,
                  }}
                  aria-hidden="true"
                />

                <span className="text-[10px] uppercase tracking-[0.12em] text-neutral-500">
                  {item.productColor.color.name}
                </span>
              </div>

              <span
                className="hidden h-3 w-px bg-neutral-200 sm:block"
                aria-hidden="true"
              />

              <span className="text-[10px] uppercase tracking-[0.12em] text-neutral-500">
                Size {item.baseProductVariant.size.name}
              </span>
            </div>

            {/* SKU */}
            <p className="mt-2 text-[9px] uppercase tracking-[0.12em] text-neutral-400">
              SKU {item.baseProductVariant.sku}
            </p>
          </div>

          {/* Remove */}
          <button
            type="button"
            onClick={handleRemove}
            disabled={isRemoving}
            aria-label={`Remove ${item.product.name} from bag`}
            className="flex size-8 shrink-0 items-center justify-center text-neutral-400 transition-colors hover:text-neutral-950 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Trash2 className="size-4" strokeWidth={1.4} aria-hidden="true" />
          </button>
        </div>

        {/* Stock status */}
        {!item.available && (
          <p className="mt-3 text-[9px] font-medium uppercase tracking-[0.14em] text-red-600">
            Currently unavailable
          </p>
        )}

        {item.available && !item.hasEnoughStock && (
          <p className="mt-3 text-[9px] font-medium uppercase tracking-[0.14em] text-red-600">
            Only {item.availableQuantity} available
          </p>
        )}

        {/* Quantity + Price */}
        <div className="mt-auto flex items-end justify-between gap-4 pt-5">
          <QuantitySelector
            value={item.quantity}
            max={item.availableQuantity}
            onChange={handleQuantityChange}
          />

          <div className="shrink-0 text-right">
            {item.quantity > 1 && (
              <p className="text-[9px] uppercase tracking-[0.1em] text-neutral-400">
                {formatCurrency(price)} each
              </p>
            )}

            <p className="mt-1 text-sm font-medium text-neutral-950">
              {formatCurrency(lineTotal)}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
