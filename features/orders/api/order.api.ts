import { apiClient } from "@/lib/api/api-client";
import type { ApiResponse } from "@/types/api.types";

import type { CreateOrderPayload } from "@/features/checkout/types/checkout.types";
import type { Order, OrderListItem } from "../types/order.types";
import { OrderActivitiesResponse } from "../types/order-activity.types";

export async function createOrder(payload: CreateOrderPayload) {
  const { data } = await apiClient.post<ApiResponse<Order>>("/orders", payload);

  return data;
}

export async function getOrders() {
  const { data } = await apiClient.get<ApiResponse<OrderListItem[]>>("/orders");

  return data;
}

export async function getOrder(orderId: string) {
  const { data } = await apiClient.get<ApiResponse<Order>>(
    `/orders/${orderId}/user`,
  );

  return data;
}

export async function getGuestOrder(orderId: string) {
  const { data } = await apiClient.get<ApiResponse<Order>>(
    `/orders/guest/${orderId}`,
  );

  return data;
}

export async function getOrderActivities(orderId: string) {
  const { data } = await apiClient.get<ApiResponse<OrderActivitiesResponse>>(
    `/orders/${orderId}/activities`,
  );

  return data;
}
