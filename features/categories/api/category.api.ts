import { serverFetch } from "@/lib/api/server-fetch";

import type { Category } from "../types/category.types";
import type { ApiResponse } from "@/types/api.types";
import { cache } from "react";

export async function getCategories(): Promise<ApiResponse<Category[]>> {
  return serverFetch<Category[]>("/categories/find");
}

export async function getCategoriesSeoInfo(): Promise<ApiResponse<Category[]>> {
  return serverFetch<Category[]>("/categories/seo");
}

export const getCachedCategoryBySlug = cache(async (slug: string) => {
  const result = await getCategoryBySlug(slug);

  return result.response ?? null;
});

export async function getCategoryBySlug(
  slug: string,
): Promise<ApiResponse<Category>> {
  return serverFetch<Category>(`/categories/slug/${slug}`);
}
