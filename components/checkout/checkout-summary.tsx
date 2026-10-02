"use client";

import Image from "next/image";

import { formatCurrency } from "@/lib/utils/currency";
import { DELIVERY_CHARGERS } from "@/lib/utils/common.utils";
import { Cart } from "@/features/cart/types/cart.types";

interface CheckoutSummaryProps {
  cart?: Cart | undefined;
  isDisabled: boolean;
  isPending: boolean;
}

export function CheckoutSummary({
  cart,
  isDisabled,
  isPending,
}: CheckoutSummaryProps) {
  if (!cart || cart.items.length === 0) {
    return null;
  }

  const canCheckout =
    cart.items.length > 0 &&
    cart.items.every((item) => item.available && item.hasEnoughStock);

  const subtotal = Number(cart.subtotal);

  return (
    <aside className="sticky top-28 border border-neutral-200 bg-white p-5 sm:p-6">
      <div className="border-b border-neutral-200 pb-5">
        <p className="text-[9px] font-medium uppercase tracking-[0.24em] text-neutral-400">
          AVORO / Checkout
        </p>

        <h2 className="mt-2 text-lg font-medium uppercase tracking-[-0.01em] text-neutral-950">
          Order summary
        </h2>
      </div>

      <div className="divide-y divide-neutral-200">
        {cart.items.map((item) => {
          const lineTotal = Number(item.subtotal);

          return (
            <div key={item.id} className="flex gap-4 py-5">
              <div className="relative aspect-[3/4] w-16 shrink-0 overflow-hidden bg-neutral-100">
                {item.image?.url ? (
                  <Image
                    src={item.image.url}
                    alt={item.product.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center px-1 text-center text-[8px] font-medium uppercase tracking-[0.1em] text-neutral-400">
                    No image
                  </div>
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium uppercase leading-5 tracking-[0.04em] text-neutral-950">
                  {item.product.name}
                </p>

                <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="size-3 shrink-0 border border-black/10"
                      style={{
                        backgroundColor: item.productColor.color.hexCode,
                      }}
                      aria-hidden="true"
                    />

                    <span className="text-[9px] uppercase tracking-[0.1em] text-neutral-500">
                      {item.productColor.color.name}
                    </span>
                  </div>

                  <span
                    className="h-3 w-px bg-neutral-200"
                    aria-hidden="true"
                  />

                  <span className="text-[9px] uppercase tracking-[0.1em] text-neutral-500">
                    Size {item.baseProductVariant.size.name}
                  </span>
                </div>

                <p className="mt-2 text-[9px] uppercase tracking-[0.12em] text-neutral-400">
                  Qty {item.quantity}
                </p>

                {!item.available && (
                  <p className="mt-2 text-[9px] font-medium uppercase tracking-[0.1em] text-red-600">
                    Currently unavailable
                  </p>
                )}

                {item.available && !item.hasEnoughStock && (
                  <p className="mt-2 text-[9px] font-medium uppercase tracking-[0.1em] text-red-600">
                    Only {item.availableQuantity} available
                  </p>
                )}
              </div>

              <div className="shrink-0 text-right">
                <p className="text-xs font-medium text-neutral-950">
                  {formatCurrency(lineTotal)}
                </p>

                {item.quantity > 1 && (
                  <p className="mt-1 text-[9px] text-neutral-400">
                    {formatCurrency(Number(item.product.price))} each
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-neutral-200 pt-5">
        <div className="flex items-center justify-between gap-4">
          <span className="text-[11px] uppercase tracking-[0.1em] text-neutral-500">
            Items ({cart.itemCount})
          </span>

          <span className="text-sm font-medium text-neutral-950">
            {formatCurrency(subtotal)}
          </span>
        </div>

        <div className="mt-4 flex items-start justify-between gap-4">
          <span className="text-[11px] uppercase tracking-[0.1em] text-neutral-500">
            Delivery
          </span>

          <span className="text-right text-[11px] text-neutral-500">
            {formatCurrency(DELIVERY_CHARGERS)}
          </span>
        </div>

        <div className="mt-5 border-t border-neutral-200 pt-5">
          <div className="flex items-end justify-between gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-950">
              Subtotal
            </span>

            <span className="text-lg font-medium text-neutral-950">
              {formatCurrency(subtotal + DELIVERY_CHARGERS)}
            </span>
          </div>
        </div>

        <p className="mt-3 text-[10px] leading-4 text-neutral-400">
          Delivery charges and the final total are calculated securely by the
          server when your order is created.
        </p>
      </div>

      {!canCheckout && (
        <div className="mt-5 border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-red-700">
            Your bag needs updating
          </p>

          <p className="mt-1 text-[10px] leading-4 text-red-600">
            One or more items are unavailable or exceed the available stock.
          </p>
        </div>
      )}

      <button
        type="submit"
        form="checkout-form"
        disabled={isDisabled}
        onClick={() => {
          console.log("PLACE ORDER CLICKED");
        }}
        className="mt-6 h-12 w-full items-center justify-center bg-neutral-950 px-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400 lg:flex"
      >
        {isPending ? "Creating order..." : "Place order"}
      </button>
    </aside>
  );
}
