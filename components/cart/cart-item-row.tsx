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
import { getPrimaryProductImage } from "@/features/products/utils/product.utils";
import { formatCurrency } from "@/lib/utils/currency";

import { QuantitySelector } from "@/components/product/quantity-selector";

interface CartItemRowProps {
  item: CartItem;
}

export function CartItemRow({ item }: CartItemRowProps) {
  const updateItem = useUpdateCartItem();
  const removeItem = useRemoveCartItem();

  const variantImage = item.variant
    ? getPrimaryProductImage(item.variant.images)
    : null;

  const productImage = getPrimaryProductImage(item.product.images);

  const image = variantImage ?? productImage;

  const price = item.variant?.price ?? item.product.price;

  const lineTotal = price * item.quantity;

  const maxQuantity =
    item.variant && item.variant.quantity > 0 && !item.variant.isMadeToOrder
      ? item.variant.quantity
      : undefined;

  function handleQuantityChange(quantity: number) {
    updateItem.mutate({
      itemId: item.id,
      payload: {
        quantity,
      },
    });
  }

  return (
    <article className="flex gap-4 py-6 sm:gap-6">
      <Link
        href={routePaths.product(item.product.slug)}
        className="relative size-28 shrink-0 overflow-hidden rounded-xl bg-neutral-100 sm:size-36"
      >
        {image?.url ? (
          <Image
            src={image.url}
            alt={image.alt ?? item.product.name}
            fill
            sizes="144px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-neutral-400">
            No image
          </div>
        )}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link
              href={routePaths.product(item.product.slug)}
              className="font-medium text-neutral-950 transition hover:text-neutral-600"
            >
              {item.product.name}
            </Link>

            {item.variant && (
              <>
                <p className="mt-1 text-sm text-neutral-500">
                  {item.variant.name}
                </p>

                {!!item.variant.colors.length && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex gap-1">
                      {item.variant.colorHexCodes.map((hex, index) => (
                        <span
                          key={`${hex}-${index}`}
                          title={item.variant?.colors[index]}
                          className="size-4 rounded-full border border-black/10"
                          style={{
                            backgroundColor: hex,
                          }}
                        />
                      ))}
                    </div>

                    <span className="text-xs text-neutral-500">
                      {item.variant.colors.join(" + ")}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => removeItem.mutate(item.id)}
            disabled={removeItem.isPending}
            aria-label={`Remove ${item.product.name}`}
            className="flex size-9 shrink-0 items-center justify-center rounded-lg text-neutral-400 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
          >
            <Trash2 className="size-4" />
          </button>
        </div>

        {item.variant?.isMadeToOrder && item.variant.quantity <= 0 && (
          <div className="mt-3">
            <p className="text-xs font-medium text-amber-700">Made to order</p>

            {(item.variant.productionDaysMin != null ||
              item.variant.productionDaysMax != null) && (
              <p className="mt-1 text-xs text-neutral-500">
                Production:{" "}
                {formatProductionTime(
                  item.variant.productionDaysMin,
                  item.variant.productionDaysMax,
                )}
              </p>
            )}
          </div>
        )}

        <div className="mt-auto flex flex-wrap items-end justify-between gap-4 pt-5">
          <QuantitySelector
            value={item.quantity}
            max={maxQuantity}
            onChange={handleQuantityChange}
          />

          <div className="text-right">
            {item.quantity > 1 && (
              <p className="text-xs text-neutral-400">
                {formatCurrency(price)} each
              </p>
            )}

            <p className="mt-1 font-semibold text-neutral-950">
              {formatCurrency(lineTotal)}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function formatProductionTime(min?: number | null, max?: number | null) {
  if (min != null && max != null) {
    return `${min}–${max} days`;
  }

  if (min != null) {
    return `from ${min} days`;
  }

  if (max != null) {
    return `up to ${max} days`;
  }

  return "Contact us";
}
