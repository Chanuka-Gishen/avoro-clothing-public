import {
  Product,
  ProductSummary,
} from "@/features/products/types/product.types";
import { WishlistItem } from "@/store/wishlist.store";

export const DELIVERY_CHARGERS = 400;

export function toWishlistItem(
  product: Product | ProductSummary,
): WishlistItem {
  const image =
    product.images?.[0] ??
    product.colors?.find((color) => color.images?.length)?.images?.[0] ??
    null;

  return {
    id: product.id,
    product: product as Product,
    productId: product.id,
    createdAt: product.createdAt,
  };
}
