// src/features/categories/api/category.api.ts

import { serverFetch } from "@/lib/api/server-fetch";

import type { Category } from "../types/category.types";
import type { ApiResponse } from "@/types/api.types";

export async function getCategories(): Promise<ApiResponse<Category[]>> {
  return serverFetch<Category[]>("/categories/find");
}
