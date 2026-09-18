import {
  OrderActivity,
  OrderActivityType,
} from "@/features/orders/types/order.types";
import {
  Ban,
  CircleDollarSign,
  Clock3,
  CreditCard,
  FileText,
  PackageCheck,
  RefreshCcw,
  Settings,
  User,
} from "lucide-react";

interface OrderActivityTimelineProps {
  activities: OrderActivity[];
}

const formatDate = (value: string) => {
  return new Intl.DateTimeFormat("en-LK", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

const formatValue = (value: unknown) => {
  if (typeof value !== "string") {
    return String(value ?? "");
  }

  return value
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const getActivityIcon = (type: OrderActivityType) => {
  switch (type) {
    case "ORDER_CREATED":
      return PackageCheck;

    case "ORDER_STATUS_CHANGED":
      return RefreshCcw;

    case "PAYMENT_STATUS_CHANGED":
      return CircleDollarSign;

    case "PAYMENT_METHOD_CHANGED":
      return CreditCard;

    case "NOTE_ADDED":
      return FileText;

    case "ORDER_CANCELLED":
      return Ban;

    case "ORDER_REFUNDED":
      return CircleDollarSign;

    case "SYSTEM":
    default:
      return Settings;
  }
};

const OrderActivityTimeline = ({ activities }: OrderActivityTimelineProps) => {
  if (!activities.length) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white px-6 py-10 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
          <Clock3 size={22} className="text-slate-500" />
        </div>

        <h3 className="mt-4 text-sm font-semibold text-slate-900">
          No activity yet
        </h3>

        <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-slate-500">
          Changes and updates made to this order will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-5 py-4">
        <h3 className="font-semibold text-slate-900">Order Activity</h3>

        <p className="mt-1 text-sm text-slate-500">
          History of changes and actions for this order.
        </p>
      </div>

      <div className="p-5">
        <div className="relative">
          <div className="absolute bottom-3 left-[19px] top-3 w-px bg-slate-200" />

          <div className="space-y-6">
            {activities.map((activity) => {
              const Icon = getActivityIcon(activity.type);

              const from = activity.metadata?.from;

              const to = activity.metadata?.to;

              const actorName = activity.actor
                ? [activity.actor.firstName, activity.actor.lastName]
                    .filter(Boolean)
                    .join(" ")
                : null;

              return (
                <div key={activity.id} className="relative flex gap-4">
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white">
                    <Icon size={18} className="text-slate-600" />
                  </div>

                  <div className="min-w-0 flex-1 pb-1">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {activity.title}
                        </p>

                        {activity.description && (
                          <p className="mt-1 text-sm leading-6 text-slate-500">
                            {activity.description}
                          </p>
                        )}
                      </div>

                      <time
                        dateTime={activity.createdAt}
                        className="shrink-0 text-xs text-slate-400"
                      >
                        {formatDate(activity.createdAt)}
                      </time>
                    </div>

                    {from !== undefined && to !== undefined && (
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                          {formatValue(from)}
                        </span>

                        <span className="text-sm text-slate-400">→</span>

                        <span className="rounded-md bg-slate-900 px-2.5 py-1 text-xs font-medium text-white">
                          {formatValue(to)}
                        </span>
                      </div>
                    )}

                    <div className="mt-3 flex items-center text-xs text-slate-400">
                      {actorName ? (
                        <span className="inline-flex items-center gap-1.5">
                          <User size={13} />
                          {actorName}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5">
                          <Settings size={13} />
                          System
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderActivityTimeline;
