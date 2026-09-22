import { serverFetch } from "@/lib/api/server-fetch";
import { buildQueryParams } from "@/lib/api/query-params";

import type { Product, ProductListParams } from "../types/product.types";

import type { ApiResponse, PaginatedResponse } from "@/types/api.types";
import { cache } from "react";

export async function getProducts(
  params: ProductListParams = {},
): Promise<ApiResponse<PaginatedResponse<Product>>> {
  const query = buildQueryParams({
    page: params.page,
    limit: params.limit,
    search: params.search,
    category: params.categorySlug,
    material: params.materialSlug,
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
    isFeatured: params.isFeatured,
    sortBy: params.sort,
  });

  return serverFetch<PaginatedResponse<Product>>(`/products${query}`, {
    cache: "no-store",
  });
}

export const getCachedProductBySlug = cache(async (slug: string) => {
  const result = await getProductBySlug(slug);

  return result.response ?? null;
});

export async function getProductBySlug(
  slug: string,
): Promise<ApiResponse<Product>> {
  return serverFetch<Product>(`/products/slug/${encodeURIComponent(slug)}`);
}

export async function getFeaturedProducts(limit = 8) {
  return getProducts({
    page: 1,
    limit,
    isFeatured: true,
  });
}

export async function getProductsByCategory(
  categorySlug: string,
  params: Omit<ProductListParams, "category"> = {},
) {
  return getProducts({
    ...params,
    categorySlug: categorySlug,
  });
}
