import { apiClient } from "@/lib/api/api-client";
import type { ApiResponse } from "@/types/api.types";

import type { AddWishlistItemPayload, Wishlist } from "../types/wishlist.types";

export async function getWishlist() {
  const { data } = await apiClient.get<ApiResponse<Wishlist>>("/wishlist");

  return data;
}

export async function addWishlistItem(payload: AddWishlistItemPayload) {
  const { data } = await apiClient.post<ApiResponse<Wishlist>>(
    "/wishlist/items",
    payload,
  );

  return data;
}

export async function removeWishlistItem(productId: string) {
  const { data } = await apiClient.delete<ApiResponse<Wishlist>>(
    `/wishlist/items/${productId}`,
  );

  return data;
}
