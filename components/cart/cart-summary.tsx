import Link from "next/link";

import { ROUTES } from "@/config/routes";
import type { Cart } from "@/features/cart/types/cart.types";
import { formatCurrency } from "@/lib/utils/currency";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/store/auth.store";

interface CartSummaryProps {
  cart: Cart;
}

export function CartSummary({ cart }: CartSummaryProps) {
  const router = useRouter();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const subtotal = Number(cart.subtotal);
  const itemCount = cart.itemCount;

  const canCheckout =
    cart.items.length > 0 &&
    cart.items.every((item) => item.available && item.hasEnoughStock);

  function handleCheckout() {
    if (!canCheckout) {
      return;
    }

    if (isAuthenticated) {
      router.push(ROUTES.CHECKOUT);
      return;
    }

    router.push(
      `${ROUTES.LOGIN}?redirect=${encodeURIComponent(ROUTES.CHECKOUT)}`,
    );
  }

  return (
    <aside>
      <div className="sticky top-28 border border-neutral-200 bg-white p-5 sm:p-6">
        {/* Heading */}
        <div className="border-b border-neutral-200 pb-5">
          <p className="text-[9px] font-medium uppercase tracking-[0.24em] text-neutral-400">
            AVORO / Bag
          </p>

          <h2 className="mt-2 text-lg font-medium uppercase tracking-[-0.01em] text-neutral-950">
            Order summary
          </h2>
        </div>

        {/* Summary */}
        <div className="space-y-4 py-6">
          <div className="flex items-center justify-between gap-4">
            <span className="text-[11px] uppercase tracking-[0.1em] text-neutral-500">
              Items ({itemCount})
            </span>

            <span className="text-sm font-medium text-neutral-950">
              {formatCurrency(subtotal)}
            </span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <span className="text-[11px] uppercase tracking-[0.1em] text-neutral-500">
              Delivery
            </span>

            <span className="text-right text-[11px] text-neutral-500">
              Calculated at checkout
            </span>
          </div>
        </div>

        {/* Total */}
        <div className="border-t border-neutral-200 pt-5">
          <div className="flex items-end justify-between gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-950">
              Subtotal
            </span>

            <span className="text-lg font-medium text-neutral-950">
              {formatCurrency(subtotal)}
            </span>
          </div>

          <p className="mt-2 text-[10px] leading-4 text-neutral-400">
            Delivery charges will be calculated during checkout.
          </p>
        </div>

        {/* Stock warning */}
        {!canCheckout && cart.items.length > 0 && (
          <div className="mt-5 border border-red-200 bg-red-50 px-4 py-3">
            <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-red-700">
              Your bag contains unavailable items or quantities.
            </p>

            <p className="mt-1 text-[10px] leading-4 text-red-600">
              Update your bag before proceeding to checkout.
            </p>
          </div>
        )}

        {/* Checkout */}
        <button
          type="button"
          onClick={handleCheckout}
          disabled={!canCheckout}
          className="mt-6 flex h-12 w-full items-center justify-center bg-neutral-950 px-6 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:bg-neutral-200 disabled:text-neutral-400"
        >
          Proceed to checkout
        </button>

        {/* Continue shopping */}
        <Link
          href={ROUTES.SHOP}
          className="mt-3 flex h-12 w-full items-center justify-center border border-neutral-300 bg-white px-6 text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-950 transition-colors hover:border-neutral-950"
        >
          Continue shopping
        </Link>
      </div>
    </aside>
  );
}
