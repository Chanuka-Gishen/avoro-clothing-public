import type { ProductImage } from "../types/product.types";

export function calculateDiscountPercentage(
  price: number,
  comparePrice?: number | null,
): number | null {
  if (!comparePrice || comparePrice <= price) {
    return null;
  }

  return Math.round(((comparePrice - price) / comparePrice) * 100);
}

export function getPrimaryProductImage(
  images: ProductImage[],
): ProductImage | null {
  if (!images.length) {
    return null;
  }

  return (
    images.find((image) => image.isPrimary) ??
    [...images].sort((a, b) => a.order - b.order)[0] ??
    null
  );
}
