// src/app/(store)/account/orders/[id]/page.tsx

"use client";

import { useParams } from "next/navigation";

import { useOrder } from "@/features/orders/hooks/use-orders";
import { OrderDetails } from "@/components/order/order-details";

export default function OrderDetailsPage() {
  const params = useParams<{
    id: string;
  }>();

  const { data, isLoading, isError } = useOrder(params.id);

  if (isLoading) {
    return <div className="h-96 animate-pulse rounded-xl bg-neutral-100" />;
  }

  if (isError || !data?.response) {
    return <p className="text-sm text-red-600">Unable to load this order.</p>;
  }

  return <OrderDetails order={data.response} />;
}
