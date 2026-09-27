import type { Metadata } from "next";
import { CheckoutForm } from "@/components/checkout/checkout-form";

export const metadata: Metadata = {
  title: "Checkout",
};

export default function CheckoutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-10">
        <p className="text-sm font-medium uppercase tracking-[0.16em] text-neutral-500">
          Checkout
        </p>

        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-neutral-950 sm:text-4xl">
          Complete your order
        </h1>
      </div>

      <CheckoutForm />
    </div>
  );
}
