"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { cartQueryKeys } from "@/features/cart/api/cart.queries";

import {
  createOrder,
  getGuestOrder,
  getOrder,
  getOrderActivities,
  getOrders,
} from "../api/order.api";
import type { CreateOrderPayload } from "@/features/checkout/types/checkout.types";
import { orderQueryKeys } from "../api/order.queries";
import { useAuthStore } from "@/features/auth/store/auth.store";

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateOrderPayload) => createOrder(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: cartQueryKeys.all,
      });

      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
    },
  });
}

export function useOrders() {
  return useQuery({
    queryKey: orderQueryKeys.list(),
    queryFn: getOrders,
  });
}

export function useOrder(id: string) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return useQuery({
    queryKey: orderQueryKeys.detail(id),
    queryFn: () => (isAuthenticated ? getOrder(id) : getGuestOrder(id)),
    enabled: Boolean(id),
  });
}

export function useGuestOrder(id: string) {
  return useQuery({
    queryKey: orderQueryKeys.detail(id),
    queryFn: () => getGuestOrder(id),
    enabled: Boolean(id),
  });
}

export function useOrderActivities(orderId: string) {
  return useQuery({
    queryKey: orderQueryKeys.activities(orderId),
    queryFn: () => getOrderActivities(orderId),

    enabled: Boolean(orderId),
  });
}
