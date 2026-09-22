import {
  Product,
  ProductSummary,
} from "@/features/products/types/product.types";
import { WishlistItem } from "@/features/wishlist/types/wishlist.types";

export function toWishlistItem(
  product: Product | ProductSummary,
): WishlistItem {
  const image =
    product.images?.[0] ??
    product.colors?.find((color) => color.images?.length)?.images?.[0] ??
    null;

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,

    price: product.price,
    comparePrice: product.comparePrice,

    image: image
      ? {
          url: image.url,
          alt: image.alt,
        }
      : null,
  };
}
