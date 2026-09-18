export type OrderActivityType =
  | "ORDER_CREATED"
  | "ORDER_STATUS_CHANGED"
  | "PAYMENT_STATUS_CHANGED"
  | "PAYMENT_METHOD_CHANGED"
  | "NOTE_ADDED"
  | "ORDER_CANCELLED"
  | "ORDER_REFUNDED"
  | "SYSTEM";

export interface OrderActivityActor {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
}

export interface OrderActivity {
  id: string;
  orderId: string;

  type: OrderActivityType;

  title: string;
  description?: string | null;

  metadata?: Record<string, unknown> | null;

  actorId?: string | null;
  actor?: OrderActivityActor | null;

  createdAt: string;
}

export interface OrderActivitiesResponse {
  order: {
    id: string;
    orderNumber: string;
  };

  activities: OrderActivity[];
}
