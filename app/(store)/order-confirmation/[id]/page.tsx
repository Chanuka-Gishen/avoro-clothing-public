// src/app/(store)/order-confirmation/[id]/page.tsx

"use client";

import { CheckCircle2, Package } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { ROUTES } from "@/config/routes";
import { useOrder } from "@/features/orders/hooks/use-orders";
import { formatCurrency } from "@/lib/utils/currency";
import { useAuthStore } from "@/features/auth/store/auth.store";

export default function OrderConfirmationPage() {
  const params = useParams<{
    id: string;
  }>();

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const { data, isLoading, isError } = useOrder(params.id);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20">
        <div className="h-72 animate-pulse rounded-2xl bg-neutral-100" />
      </div>
    );
  }

  const order = data?.response;

  if (isError || !order) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center">
        <h1 className="text-2xl font-semibold">Unable to load order</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <CheckCircle2 className="mx-auto size-14 text-green-600" />

        <h1 className="mt-5 text-3xl font-semibold tracking-tight text-neutral-950">
          Order received
        </h1>

        <p className="mt-3 text-neutral-500">
          Thank you. Your order has been placed successfully.
        </p>
      </div>

      <div className="mt-10 rounded-2xl border border-neutral-200 p-6">
        <div className="flex items-center gap-3">
          <Package className="size-5 text-neutral-500" />

          <div>
            <p className="text-xs uppercase tracking-wide text-neutral-400">
              Order number
            </p>

            <p className="font-semibold text-neutral-950">
              #{order.orderNumber}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-5 border-t border-neutral-100 pt-5">
          <div>
            <p className="text-xs text-neutral-400">Total</p>

            <p className="mt-1 font-semibold">{formatCurrency(order.total)}</p>
          </div>

          <div>
            <p className="text-xs text-neutral-400">Status</p>

            <p className="mt-1 font-semibold">{order.status}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link
          href={
            isAuthenticated
              ? `/account/orders/${order.id}`
              : `/guest/orders/${order.id}`
          }
          className="flex h-11 flex-1 items-center justify-center rounded-lg bg-neutral-950 px-5 text-sm font-medium text-white"
        >
          View order
        </Link>

        <Link
          href={ROUTES.SHOP}
          className="flex h-11 flex-1 items-center justify-center rounded-lg border border-neutral-300 px-5 text-sm font-medium text-neutral-700"
        >
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
