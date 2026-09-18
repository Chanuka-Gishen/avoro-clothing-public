import Image from "next/image";

import { getPrimaryProductImage } from "@/features/products/utils/product.utils";
import { formatCurrency } from "@/lib/utils/currency";

import { OrderStatusBadge } from "./order-status-badge";
import { Order } from "@/features/orders/types/order.types";
import { PaymentStatusBadge } from "./payment-status-badge";
import { OrderActivityTimeline } from "./order-activity-timeline";

interface OrderDetailsProps {
  order: Order;
}

export function OrderDetails({ order }: OrderDetailsProps) {
  function StatusItem({
    label,
    badge,
  }: {
    label: string;
    badge: React.ReactNode;
  }) {
    return (
      <div className="min-w-36 rounded-xl border border-neutral-200 bg-white p-4">
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-neutral-400">
          {label}
        </p>

        {badge}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm text-neutral-500">Order</p>

          <h1 className="mt-1 text-2xl font-semibold text-neutral-950">
            #{order.orderNumber}
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            {new Intl.DateTimeFormat("en-LK", {
              dateStyle: "long",
            }).format(new Date(order.createdAt))}
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
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

      <div className="mt-8 divide-y divide-neutral-200 border-y border-neutral-200">
        {order.items.map((item) => {
          const image =
            (item.variant && getPrimaryProductImage(item.variant.images)) ||
            getPrimaryProductImage(item.product.images);

          return (
            <div key={item.id} className="flex gap-4 py-5">
              <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-neutral-100">
                {image?.url && (
                  <Image
                    src={image.url}
                    alt={image.alt ?? item.product.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-medium text-neutral-950">
                  {item.product.name}
                </p>

                {item.variant && (
                  <>
                    <p className="mt-1 text-sm text-neutral-500">
                      {item.variant.name}
                    </p>

                    {!!item.variant.colors.length && (
                      <p className="mt-1 text-xs text-neutral-400">
                        {item.variant.colors.join(" + ")}
                      </p>
                    )}
                  </>
                )}

                <p className="mt-2 text-sm text-neutral-500">
                  Qty: {item.quantity}
                </p>

                {item.isManufacturingRequired && (
                  <div className="mt-2 rounded-lg bg-amber-50 px-3 py-2 text-xs">
                    <p className="font-medium text-amber-800">
                      Production required
                    </p>

                    <p className="mt-1 text-amber-700">
                      {item.stockQuantityUsed} from stock
                      {item.newlyMadeQuantity > 0 &&
                        ` · ${item.newlyMadeQuantity} made to order`}
                    </p>

                    {item.variant &&
                      (item.variant.productionDaysMin != null ||
                        item.variant.productionDaysMax != null) && (
                        <p className="mt-1 text-amber-700">
                          Estimated production:{" "}
                          {formatProductionTime(
                            item.variant.productionDaysMin,
                            item.variant.productionDaysMax,
                          )}
                        </p>
                      )}
                  </div>
                )}
              </div>

              <p className="font-medium text-neutral-950">
                {formatCurrency(item.price * item.quantity)}
              </p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <AddressCard title="Shipping address" address={order.shippingAddress} />

        <AddressCard
          title="Billing address"
          address={order.billingAddress ?? order.shippingAddress}
        />
      </div>

      <div className="mt-8 ml-auto max-w-md rounded-xl border border-neutral-200 p-5">
        <SummaryRow label="Subtotal" value={order.subtotal} />

        <SummaryRow label="Shipping" value={order.shipping} />

        <SummaryRow label="Tax" value={order.tax} />

        {order.discount > 0 && (
          <SummaryRow label="Discount" value={-order.discount} />
        )}

        <div className="mt-4 flex justify-between border-t border-neutral-200 pt-4">
          <span className="font-semibold">Total</span>

          <span className="text-lg font-semibold">
            {formatCurrency(order.total)}
          </span>
        </div>
      </div>

      <OrderActivityTimeline orderId={order.id} />

      {order.notes && (
        <div className="mt-8 rounded-xl bg-neutral-50 p-5">
          <h2 className="text-sm font-semibold text-neutral-950">
            Order notes
          </h2>

          <p className="mt-2 text-sm leading-6 text-neutral-600">
            {order.notes}
          </p>
        </div>
      )}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: number }) {
  return (
    <div className="mb-3 flex justify-between text-sm">
      <span className="text-neutral-500">{label}</span>

      <span className="font-medium">{formatCurrency(value)}</span>
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
    <div>
      <h2 className="text-sm font-semibold text-neutral-950">{title}</h2>

      <div className="mt-3 text-sm leading-6 text-neutral-600">
        <p>{address.street}</p>
        <p>
          {address.city}, {address.state}
        </p>
        <p>{address.zip}</p>
        <p>{address.country}</p>
      </div>
    </div>
  );
}

function formatProductionTime(min?: number | null, max?: number | null) {
  if (min != null && max != null) {
    return `${min}–${max} days`;
  }

  if (min != null) {
    return `from ${min} days`;
  }

  if (max != null) {
    return `up to ${max} days`;
  }

  return "Contact us for availability";
}
