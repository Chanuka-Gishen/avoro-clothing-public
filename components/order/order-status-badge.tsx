import type { OrderStatus } from "@/features/orders/types/order.types";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const statusConfig: Record<
  OrderStatus,
  {
    label: string;
    className: string;
  }
> = {
  PENDING: {
    label: "Order placed",
    className: "bg-amber-50 text-amber-700 ring-amber-200",
  },

  PROCESSING: {
    label: "Processing",
    className: "bg-blue-50 text-blue-700 ring-blue-200",
  },

  SHIPPED: {
    label: "Shipped",
    className: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  },

  DELIVERED: {
    label: "Delivered",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },

  CANCELLED: {
    label: "Cancelled",
    className: "bg-red-50 text-red-700 ring-red-200",
  },

  REFUNDED: {
    label: "Refunded",
    className: "bg-neutral-100 text-neutral-700 ring-neutral-200",
  },
};

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${config.className}`}
    >
      {config.label}
    </span>
  );
}
