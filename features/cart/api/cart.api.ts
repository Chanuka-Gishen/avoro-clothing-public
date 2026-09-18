import { apiClient } from "@/lib/api/api-client";
import type { ApiResponse } from "@/types/api.types";

import type {
  AddCartItemPayload,
  Cart,
  UpdateCartItemPayload,
} from "../types/cart.types";

export async function getCart() {
  const { data } = await apiClient.get<ApiResponse<Cart>>("/cart");

  return data;
}

export async function addCartItem(payload: AddCartItemPayload) {
  const { data } = await apiClient.post<ApiResponse<Cart>>(
    "/cart/items",
    payload,
  );

  return data;
}

export async function updateCartItem(
  itemId: string,
  payload: UpdateCartItemPayload,
) {
  const { data } = await apiClient.patch<ApiResponse<Cart>>(
    `/cart/items/${itemId}`,
    payload,
  );

  return data;
}

export async function removeCartItem(itemId: string) {
  const { data } = await apiClient.delete<ApiResponse<Cart>>(
    `/cart/items/${itemId}`,
  );

  return data;
}

export async function clearCart() {
  const { data } = await apiClient.delete<ApiResponse<Cart>>("/cart/items");

  return data;
}
