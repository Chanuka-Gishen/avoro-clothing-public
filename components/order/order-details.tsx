import Image from "next/image";

import { formatCurrency } from "@/lib/utils/currency";

import { OrderStatusBadge } from "./order-status-badge";
import { Order } from "@/features/orders/types/order.types";
import { PaymentStatusBadge } from "./payment-status-badge";
import { OrderActivityTimeline } from "./order-activity-timeline";

interface OrderDetailsProps {
  order: Order;
}

export function OrderDetails({ order }: OrderDetailsProps) {
  return (
    <div>
      <div className="flex flex-col gap-6 border-b border-neutral-200 pb-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-neutral-400">
            AVORO / Order
          </p>

          <h1 className="mt-2 text-2xl font-medium uppercase tracking-[-0.02em] text-neutral-950 sm:text-3xl">
            #{order.orderNumber}
          </h1>

          <p className="mt-2 text-xs text-neutral-500">
            {new Intl.DateTimeFormat("en-LK", {
              dateStyle: "long",
            }).format(new Date(order.createdAt))}
          </p>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-4">
          <StatusItem
            label="Order status"
            badge={<OrderStatusBadge status={order.status} />}
          />

          <StatusItem
            label="Payment status"
            badge={<PaymentStatusBadge status={order.paymentStatus} />}
          />
        </div>
      </div>

      <section className="mt-8" aria-labelledby="order-items-heading">
        <div className="flex items-center justify-between">
          <h2
            id="order-items-heading"
            className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-950"
          >
            Items
          </h2>

          <span className="text-[10px] uppercase tracking-[0.12em] text-neutral-400">
            {order.items.reduce((total, item) => total + item.quantity, 0)}{" "}
            items
          </span>
        </div>

        <div className="mt-4 divide-y divide-neutral-200 border-y border-neutral-200">
          {order.items.map((item) => {
            const lineTotal = Number(item.price) * item.quantity;

            return (
              <article
                key={item.id}
                className="flex gap-4 py-5 sm:gap-6 sm:py-6"
              >
                <div className="relative aspect-[3/4] w-20 shrink-0 overflow-hidden bg-neutral-100 sm:w-24">
                  {item.product.images[0].url ? (
                    <Image
                      src={item.product.images[0].url}
                      alt={item.product.name}
                      fill
                      sizes="(max-width: 639px) 80px, 96px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center px-2 text-center text-[8px] font-medium uppercase tracking-[0.1em] text-neutral-400">
                      No image
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium uppercase leading-5 tracking-[0.04em] text-neutral-950 sm:text-sm">
                    {item.product.name}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className="size-3.5 shrink-0 border border-black/10"
                        style={{
                          backgroundColor: item.productColor.color.hexCode,
                        }}
                        aria-hidden="true"
                      />

                      <span className="text-[10px] uppercase tracking-[0.1em] text-neutral-500">
                        {item.productColor.color.name}
                      </span>
                    </div>

                    <span
                      className="h-3 w-px bg-neutral-200"
                      aria-hidden="true"
                    />

                    <span className="text-[10px] uppercase tracking-[0.1em] text-neutral-500">
                      Size {item.baseProductVariant.size.name}
                    </span>
                  </div>

                  <p className="mt-2 text-[9px] uppercase tracking-[0.12em] text-neutral-400">
                    SKU {item.baseProductVariant.sku}
                  </p>

                  <p className="mt-2 text-[10px] uppercase tracking-[0.1em] text-neutral-500">
                    Qty {item.quantity}
                  </p>

                  {item.quantity > 1 && (
                    <p className="mt-1 text-[10px] text-neutral-400">
                      {formatCurrency(Number(item.price))} each
                    </p>
                  )}
                </div>

                <p className="shrink-0 text-sm font-medium text-neutral-950">
                  {formatCurrency(lineTotal)}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <div className="mt-10 grid gap-8 border-b border-neutral-200 pb-10 lg:grid-cols-2">
        <AddressCard title="Shipping address" address={order.shippingAddress} />

        <AddressCard
          title="Billing address"
          address={order.billingAddress ?? order.shippingAddress}
        />
      </div>

      <div className="mt-8 ml-auto max-w-md">
        <SummaryRow label="Subtotal" value={order.subtotal} />

        <SummaryRow label="Shipping" value={Number(order.deliveryCharge)} />

        <SummaryRow label="Tax" value={order.taxTotal} />

        {Number(order.discountTotal) > 0 && (
          <SummaryRow label="Discount" value={-Number(order.discountTotal)} />
        )}

        <div className="mt-5 flex items-end justify-between border-t border-neutral-200 pt-5">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-950">
            Total
          </span>

          <span className="text-xl font-medium text-neutral-950">
            {formatCurrency(order.total)}
          </span>
        </div>
      </div>

      <OrderActivityTimeline orderId={order.id} />

      {order.notes && (
        <section className="mt-10 border-t border-neutral-200 pt-8">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-950">
            Order notes
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-600">
            {order.notes}
          </p>
        </section>
      )}
    </div>
  );
}

function StatusItem({
  label,
  badge,
}: {
  label: string;
  badge: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-2 text-[9px] font-medium uppercase tracking-[0.18em] text-neutral-400">
        {label}
      </p>

      {badge}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="mb-3 flex items-center justify-between gap-4">
      <span className="text-[11px] uppercase tracking-[0.1em] text-neutral-500">
        {label}
      </span>

      <span className="text-sm font-medium text-neutral-950">
        {formatCurrency(value)}
      </span>
    </div>
  );
}

function AddressCard({
  title,
  address,
}: {
  title: string;
  address: Order["shippingAddress"];
}) {
  return (
    <section>
      <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-950">
        {title}
      </h2>

      <div className="mt-4 text-sm leading-6 text-neutral-600">
        <p>{address.street}</p>

        <p>
          {address.city}, {address.state}
        </p>

        {address.zip && <p>{address.zip}</p>}

        <p>{address.country}</p>
      </div>
    </section>
  );
}
