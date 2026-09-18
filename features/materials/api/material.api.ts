import { apiClient } from "@/lib/api/api-client";
import type { ApiResponse } from "@/types/api.types";
import { Material } from "../types/material.types";

export async function getMaterials() {
  const { data } = await apiClient.get<ApiResponse<Material[]>>("/materials");

  return data;
}
