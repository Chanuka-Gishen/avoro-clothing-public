"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  addCartItem,
  getCart,
  removeCartItem,
  updateCartItem,
} from "../api/cart.api";
import { cartQueryKeys } from "../api/cart.queries";
import type {
  AddCartItemPayload,
  UpdateCartItemPayload,
} from "../types/cart.types";

export function useCart() {
  return useQuery({
    queryKey: cartQueryKeys.detail(),
    queryFn: getCart,
  });
}

export function useAddCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AddCartItemPayload) => addCartItem(payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: cartQueryKeys.all,
      });
    },
  });
}

export function useUpdateCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      itemId,
      payload,
    }: {
      itemId: string;
      payload: UpdateCartItemPayload;
    }) => updateCartItem(itemId, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: cartQueryKeys.all,
      });
    },
  });
}

export function useRemoveCartItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeCartItem,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: cartQueryKeys.all,
      });
    },
  });
}
