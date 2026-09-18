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

  function handleCheckout() {
    if (isAuthenticated) {
      router.push(ROUTES.CHECKOUT);
      return;
    }

    router.push(
      `${ROUTES.LOGIN}?redirect=${encodeURIComponent(ROUTES.CHECKOUT)}`,
    );
  }

  const subtotal = cart.items.reduce((total, item) => {
    const price = item.variant?.price ?? item.product.price;

    return total + price * item.quantity;
  }, 0);

  const itemCount = cart.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <aside>
      <div className="sticky top-28 rounded-2xl border border-neutral-200 p-6">
        <h2 className="text-lg font-semibold text-neutral-950">
          Order summary
        </h2>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-500">Items ({itemCount})</span>

            <span className="font-medium text-neutral-950">
              {formatCurrency(subtotal)}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-500">Shipping</span>

            <span className="text-neutral-500">Calculated at checkout</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-neutral-500">Tax</span>

            <span className="text-neutral-500">Calculated at checkout</span>
          </div>
        </div>

        <div className="mt-6 border-t border-neutral-200 pt-5">
          <div className="flex items-center justify-between">
            <span className="font-medium text-neutral-950">Subtotal</span>

            <span className="text-lg font-semibold text-neutral-950">
              {formatCurrency(subtotal)}
            </span>
          </div>

          <p className="mt-2 text-xs leading-5 text-neutral-500">
            Shipping and taxes will be calculated during checkout.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCheckout}
          className="mt-3 h-12 w-full rounded-lg bg-neutral-950 px-6 text-sm font-medium text-white hover:bg-neutral-800"
        >
          Proceed to checkout
        </button>

        <Link
          href={ROUTES.SHOP}
          className="mt-3 flex h-11 w-full items-center justify-center rounded-lg border border-neutral-300 text-sm font-medium text-neutral-700 transition hover:border-neutral-950 hover:text-neutral-950"
        >
          Continue shopping
        </Link>
      </div>
    </aside>
  );
}
