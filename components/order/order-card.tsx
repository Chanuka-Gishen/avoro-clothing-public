import Link from "next/link";

import { formatCurrency } from "@/lib/utils/currency";

import { OrderStatusBadge } from "./order-status-badge";
import { OrderListItem } from "@/features/orders/types/order.types";
import { PaymentStatusBadge } from "./payment-status-badge";

interface OrderCardProps {
  order: OrderListItem;
}

export function OrderCard({ order }: OrderCardProps) {
  return (
    <article className="rounded-xl border border-neutral-200 p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-400">
            Order
          </p>

          <Link
            href={`/account/orders/${order.id}`}
            className="mt-1 block font-semibold text-neutral-950 hover:underline"
          >
            #{order.orderNumber}
          </Link>

          <p className="mt-2 text-sm text-neutral-500">
            {new Intl.DateTimeFormat("en-LK", {
              dateStyle: "medium",
            }).format(new Date(order.createdAt))}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <OrderStatusBadge status={order.status} />

          <PaymentStatusBadge status={order.paymentStatus} />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
        <span className="text-sm text-neutral-500">
          {order._count.items} items
        </span>

        <span className="font-semibold text-neutral-950">
          {formatCurrency(order.total)}
        </span>
      </div>
    </article>
  );
}
