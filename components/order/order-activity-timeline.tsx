"use client";

import {
  Banknote,
  CheckCircle2,
  CircleDot,
  Clock3,
  CreditCard,
  FileText,
  Package,
  RotateCcw,
  Settings,
  XCircle,
} from "lucide-react";

import { useOrderActivities } from "@/features/orders/hooks/use-orders";
import {
  OrderActivity,
  OrderActivityType,
} from "@/features/orders/types/order-activity.types";

interface OrderActivityTimelineProps {
  orderId: string;
}

export function OrderActivityTimeline({ orderId }: OrderActivityTimelineProps) {
  const { data, isLoading, isError } = useOrderActivities(orderId);

  if (isLoading) {
    return <OrderActivityTimelineSkeleton />;
  }

  if (isError) {
    return (
      <section className="mt-10">
        <h2 className="text-lg font-semibold text-neutral-950">
          Order activity
        </h2>

        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">Unable to load order activity.</p>
        </div>
      </section>
    );
  }

  const activities = data?.response?.activities ?? [];

  return (
    <section className="mt-10">
      <div>
        <h2 className="text-lg font-semibold text-neutral-950">
          Order activity
        </h2>

        <p className="mt-1 text-sm text-neutral-500">
          Follow the progress and updates for this order.
        </p>
      </div>

      {activities.length === 0 ? (
        <div className="mt-5 rounded-xl border border-neutral-200 p-5">
          <p className="text-sm text-neutral-500">
            No activity has been recorded yet.
          </p>
        </div>
      ) : (
        <div className="mt-6">
          {activities.map((activity, index) => (
            <ActivityItem
              key={activity.id}
              activity={activity}
              isLast={index === activities.length - 1}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function ActivityItem({
  activity,
  isLast,
}: {
  activity: OrderActivity;
  isLast: boolean;
}) {
  const config = getActivityConfig(activity.type);

  const Icon = config.icon;

  return (
    <div className="relative flex gap-4">
      {!isLast && (
        <div className="absolute left-[19px] top-10 h-[calc(100%-16px)] w-px bg-neutral-200" />
      )}

      <div
        className={`relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full ring-4 ring-white ${config.iconClassName}`}
      >
        <Icon className="size-4" />
      </div>

      <div className="min-w-0 flex-1 pb-8">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-neutral-950">
              {activity.title}
            </p>

            {activity.description && (
              <p className="mt-1 text-sm leading-6 text-neutral-500">
                {activity.description}
              </p>
            )}
          </div>

          <time
            dateTime={activity.createdAt}
            className="shrink-0 text-xs text-neutral-400"
          >
            {formatActivityDate(activity.createdAt)}
          </time>
        </div>

        <ActivityMetadata activity={activity} />
      </div>
    </div>
  );
}

function ActivityMetadata({ activity }: { activity: OrderActivity }) {
  const metadata = activity.metadata;

  if (!metadata) {
    return null;
  }

  const from = typeof metadata.from === "string" ? metadata.from : undefined;

  const to = typeof metadata.to === "string" ? metadata.to : undefined;

  if (!from && !to) {
    return null;
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
      {from && (
        <span className="rounded-md bg-neutral-100 px-2 py-1 font-medium text-neutral-600">
          {formatStatus(from)}
        </span>
      )}

      {from && to && <span className="text-neutral-400">→</span>}

      {to && (
        <span className="rounded-md bg-neutral-950 px-2 py-1 font-medium text-white">
          {formatStatus(to)}
        </span>
      )}
    </div>
  );
}

function getActivityConfig(type: OrderActivityType) {
  switch (type) {
    case "ORDER_CREATED":
      return {
        icon: CheckCircle2,
        iconClassName: "bg-emerald-50 text-emerald-700",
      };

    case "ORDER_STATUS_CHANGED":
      return {
        icon: Package,
        iconClassName: "bg-blue-50 text-blue-700",
      };

    case "PAYMENT_STATUS_CHANGED":
      return {
        icon: Banknote,
        iconClassName: "bg-emerald-50 text-emerald-700",
      };

    case "PAYMENT_METHOD_CHANGED":
      return {
        icon: CreditCard,
        iconClassName: "bg-violet-50 text-violet-700",
      };

    case "NOTE_ADDED":
      return {
        icon: FileText,
        iconClassName: "bg-neutral-100 text-neutral-700",
      };

    case "ORDER_CANCELLED":
      return {
        icon: XCircle,
        iconClassName: "bg-red-50 text-red-700",
      };

    case "ORDER_REFUNDED":
      return {
        icon: RotateCcw,
        iconClassName: "bg-orange-50 text-orange-700",
      };

    case "SYSTEM":
      return {
        icon: Settings,
        iconClassName: "bg-neutral-100 text-neutral-600",
      };

    default:
      return {
        icon: CircleDot,
        iconClassName: "bg-neutral-100 text-neutral-600",
      };
  }
}

function formatActivityDate(value: string) {
  return new Intl.DateTimeFormat("en-LK", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function formatStatus(value: string) {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function OrderActivityTimelineSkeleton() {
  return (
    <section className="mt-10">
      <div className="h-6 w-36 animate-pulse rounded bg-neutral-100" />

      <div className="mt-6 space-y-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="flex gap-4">
            <div className="size-10 shrink-0 animate-pulse rounded-full bg-neutral-100" />

            <div className="flex-1">
              <div className="h-4 w-48 animate-pulse rounded bg-neutral-100" />

              <div className="mt-3 h-3 w-72 max-w-full animate-pulse rounded bg-neutral-100" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
