"use client";

import Image from "next/image";
import type { FieldError, UseFormRegister } from "react-hook-form";

import { usePaymentMethods } from "@/features/payment-methods/hooks/use-payment-methods";
import type { CheckoutFormValues } from "@/features/checkout/schemas/checkout.schema";

interface PaymentMethodSectionProps {
  register: UseFormRegister<CheckoutFormValues>;
  error?: FieldError;
}

export function PaymentMethodSection({
  register,
  error,
}: PaymentMethodSectionProps) {
  const { data, isLoading, isError } = usePaymentMethods();

  const paymentMethods = data?.response ?? [];

  return (
    <section className="border-t border-neutral-200 pt-8">
      <h2 className="text-lg font-semibold text-neutral-950">Payment method</h2>

      <p className="mt-1 text-sm text-neutral-500">
        Select how you would like to pay for your order.
      </p>

      {isLoading && (
        <div className="mt-5 space-y-3">
          {[1, 2].map((item) => (
            <div
              key={item}
              className="h-20 animate-pulse rounded-xl bg-neutral-100"
            />
          ))}
        </div>
      )}

      {isError && (
        <p className="mt-4 text-sm text-red-600">
          Unable to load payment methods.
        </p>
      )}

      {!isLoading && !isError && paymentMethods.length === 0 && (
        <p className="mt-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-600">
          No payment methods are currently available.
        </p>
      )}

      {paymentMethods.length > 0 && (
        <div className="mt-5 space-y-3">
          {paymentMethods.map((paymentMethod) => (
            <label
              key={paymentMethod.id}
              className="flex cursor-pointer items-center gap-4 rounded-xl border border-neutral-200 p-4 transition hover:border-neutral-400 has-[:checked]:border-neutral-950 has-[:checked]:ring-1 has-[:checked]:ring-neutral-950"
            >
              <input
                type="radio"
                value={paymentMethod.id}
                {...register("paymentMethodId")}
                className="size-4 shrink-0 accent-neutral-950"
              />

              {paymentMethod.image && (
                <div className="relative h-10 w-16 shrink-0 overflow-hidden rounded-md border border-neutral-100 bg-white">
                  <Image
                    src={paymentMethod.image}
                    alt={paymentMethod.title}
                    fill
                    sizes="64px"
                    className="object-contain p-1"
                  />
                </div>
              )}

              <div className="min-w-0">
                <p className="text-sm font-semibold text-neutral-950">
                  {paymentMethod.title}
                </p>

                {paymentMethod.description && (
                  <p className="mt-1 text-xs leading-5 text-neutral-500">
                    {paymentMethod.description}
                  </p>
                )}
              </div>
            </label>
          ))}
        </div>
      )}

      {error?.message && (
        <p className="mt-2 text-xs text-red-600">{error.message}</p>
      )}
    </section>
  );
}
