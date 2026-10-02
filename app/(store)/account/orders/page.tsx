// src/app/(store)/account/orders/page.tsx

"use client";

import { OrderCard } from "@/components/order/order-card";
import { useOrders } from "@/features/orders/hooks/use-orders";

export default function OrdersPage() {
  const { data, isLoading, isError, refetch } = useOrders();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-xl bg-neutral-100"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <p className="text-sm text-red-600">Unable to load your orders.</p>

        <button
          type="button"
          onClick={() => refetch()}
          className="mt-4 rounded-lg bg-neutral-950 px-4 py-2 text-sm font-medium text-white"
        >
          Try again
        </button>
      </div>
    );
  }

  const orders = data?.response ?? [];

  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-950">
        Orders
      </h2>

      <p className="mt-2 text-sm text-neutral-500">
        View your order history and current status.
      </p>

      {orders.length ? (
        <div className="mt-8 space-y-4">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="mt-8 rounded-xl border border-dashed border-neutral-300 px-6 py-16 text-center">
          <p className="text-sm text-neutral-500">
            You haven&apos;t placed any orders yet.
          </p>
        </div>
      )}
    </div>
  );
}
