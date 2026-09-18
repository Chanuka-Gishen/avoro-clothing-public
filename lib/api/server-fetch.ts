import { env } from "@/config/env";
import type { ApiResponse } from "@/types/api.types";

type ServerFetchOptions = RequestInit & {
  next?: NextFetchRequestConfig;
};

export async function serverFetch<T>(
  endpoint: string,
  options: ServerFetchOptions = {},
): Promise<ApiResponse<T>> {
  const response = await fetch(`${env.apiBaseUrl}${endpoint}`, {
    ...options,
    headers: {
      Accept: "application/json",
      ...options.headers,
    },
  });

  const data = (await response.json()) as ApiResponse<T>;

  if (!response.ok) {
    console.log(response);

    throw new Error(data.responseMessage || "Something went wrong.");
  }

  return data;
}
