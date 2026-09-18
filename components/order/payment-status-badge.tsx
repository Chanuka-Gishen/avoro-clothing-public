import type { PaymentStatus } from "@/features/orders/types/order.types";

interface PaymentStatusBadgeProps {
  status: PaymentStatus;
}

const statusConfig: Record<
  PaymentStatus,
  {
    label: string;
    className: string;
  }
> = {
  PENDING: {
    label: "Payment pending",
    className: "bg-amber-50 text-amber-700 ring-amber-200",
  },

  PAID: {
    label: "Paid",
    className: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  },

  FAILED: {
    label: "Payment failed",
    className: "bg-red-50 text-red-700 ring-red-200",
  },

  REFUNDED: {
    label: "Refunded",
    className: "bg-neutral-100 text-neutral-700 ring-neutral-200",
  },
};

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1 ring-inset ${config.className}`}
    >
      {config.label}
    </span>
  );
}
