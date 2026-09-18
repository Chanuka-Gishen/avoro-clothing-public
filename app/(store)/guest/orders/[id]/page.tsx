"use client";

import { useParams } from "next/navigation";

import { useGuestOrder } from "@/features/orders/hooks/use-orders";
import { OrderDetails } from "@/components/order/order-details";

export default function GuestOrderDetailsPage() {
  const params = useParams<{
    id: string;
  }>();

  const { data, isLoading, isError } = useGuestOrder(params.id);

  if (isLoading) {
    return <div className="h-96 animate-pulse rounded-xl bg-neutral-100" />;
  }

  if (isError || !data?.response) {
    return <p className="text-sm text-red-600">Unable to load this order.</p>;
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <OrderDetails order={data.response} />
        </div>
      </div>
    </main>
  );
}
