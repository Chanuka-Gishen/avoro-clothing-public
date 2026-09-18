import type { ProductSort } from "../types/product.types";

const PRODUCT_SORT_VALUES: ProductSort[] = [
  "newest",
  "oldest",
  "price_asc",
  "price_desc",
  "name_asc",
  "name_desc",
];

export function parseProductSort(value?: string): ProductSort {
  if (value && PRODUCT_SORT_VALUES.includes(value as ProductSort)) {
    return value as ProductSort;
  }

  return "newest";
}
