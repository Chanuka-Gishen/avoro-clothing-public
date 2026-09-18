import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

import { env } from "@/config/env";
import { authStorage } from "@/store/auth-storage";
import type { AuthResponse } from "@/features/auth/types/auth.types";
import type { ApiResponse } from "@/types/api.types";

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const apiClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 15_000,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

const refreshClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 15_000,
  headers: {
    Accept: "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const accessToken = authStorage.getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    delete config.headers.Authorization;
  }

  return config;
});

let refreshPromise: Promise<string> | null = null;

async function getNewAccessToken(): Promise<string> {
  const refreshToken = authStorage.getRefreshToken();

  if (!refreshToken) {
    throw new Error("Refresh token not available.");
  }

  if (!refreshPromise) {
    refreshPromise = refreshClient
      .post<ApiResponse<AuthResponse>>("/auth/refresh", {
        refreshToken,
      })
      .then(({ data }) => {
        const auth = data.response;

        if (!auth?.accessToken) {
          throw new Error("Invalid refresh token response.");
        }

        authStorage.setAuth(
          auth.accessToken,
          auth.refreshToken ?? refreshToken,
          auth.user,
        );

        return auth.accessToken;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }

  return refreshPromise;
}

apiClient.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryableRequestConfig | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const url = originalRequest.url ?? "";

    const isAuthRequest = url.includes("/auth/");

    if (isAuthRequest) {
      return Promise.reject(error);
    }

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    const accessToken = authStorage.getAccessToken();
    const refreshToken = authStorage.getRefreshToken();

    if (!accessToken || !refreshToken) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const accessToken = await getNewAccessToken();

      originalRequest.headers.Authorization = `Bearer ${accessToken}`;

      return apiClient(originalRequest);
    } catch (refreshError) {
      authStorage.clear();

      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }

      return Promise.reject(refreshError);
    }
  },
);
