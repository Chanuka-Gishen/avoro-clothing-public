import { apiClient } from "@/lib/api/api-client";
import type { ApiResponse } from "@/types/api.types";

import type {
  AuthResponse,
  LoginPayload,
  RegisterPayload,
} from "../types/auth.types";
import { authStorage } from "@/store/auth-storage";

export async function login(payload: LoginPayload) {
  const { data } = await apiClient.post<ApiResponse<AuthResponse>>(
    "/auth/login/customer",
    payload,
  );

  return data;
}

export async function register(payload: RegisterPayload) {
  const { data } = await apiClient.post<ApiResponse<AuthResponse>>(
    "/auth/register/customer",
    payload,
  );

  return data;
}

export async function refreshToken(refreshToken: string) {
  const { data } = await apiClient.post<ApiResponse<AuthResponse>>(
    "/auth/refresh/customer",
    {
      refreshToken,
    },
  );

  return data;
}

export async function logout() {
  const refreshToken = authStorage.getRefreshToken();

  await apiClient.post("/auth/logout/customer", {
    refreshToken,
  });
}
