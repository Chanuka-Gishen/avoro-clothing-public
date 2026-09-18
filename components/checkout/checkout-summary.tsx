"use client";

import Image from "next/image";

import { useCart } from "@/features/cart/hooks/use-cart";
import { getPrimaryProductImage } from "@/features/products/utils/product.utils";
import { formatCurrency } from "@/lib/utils/currency";

export function CheckoutSummary() {
  const { data } = useCart();

  const cart = data?.response;

  if (!cart || cart.items.length === 0) {
    return null;
  }

  const subtotal = cart.items.reduce((total, item) => {
    const price = item.variant?.price ?? item.product.price;

    return total + price * item.quantity;
  }, 0);

  return (
    <aside className="sticky top-28 rounded-2xl border border-neutral-200 p-6">
      <h2 className="text-lg font-semibold text-neutral-950">Order summary</h2>

      <div className="mt-6 divide-y divide-neutral-100">
        {cart.items.map((item) => {
          const image =
            (item.variant && getPrimaryProductImage(item.variant.images)) ||
            getPrimaryProductImage(item.product.images);

          const price = item.variant?.price ?? item.product.price;

          return (
            <div key={item.id} className="flex gap-3 py-4 first:pt-0">
              <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                {image?.url && (
                  <Image
                    src={image.url}
                    alt={image.alt ?? item.product.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-neutral-950">
                  {item.product.name}
                </p>

                {item.variant && (
                  <p className="mt-1 text-xs text-neutral-500">
                    {item.variant.name}
                  </p>
                )}

                <p className="mt-1 text-xs text-neutral-500">
                  Qty: {item.quantity}
                </p>
              </div>

              <p className="text-sm font-medium text-neutral-950">
                {formatCurrency(price * item.quantity)}
              </p>
            </div>
          );
        })}
      </div>

      <div className="border-t border-neutral-200 pt-5">
        <div className="flex justify-between text-sm">
          <span className="text-neutral-500">Subtotal</span>

          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>

        <p className="mt-4 text-xs leading-5 text-neutral-500">
          Final shipping, tax and total are calculated securely by the server
          when the order is created.
        </p>
      </div>

      <button
        type="submit"
        form="checkout-form"
        className="mt-6 hidden h-12 w-full items-center justify-center rounded-lg bg-neutral-950 px-6 text-sm font-medium text-white transition hover:bg-neutral-800 lg:flex"
      >
        Place order
      </button>
    </aside>
  );
}
