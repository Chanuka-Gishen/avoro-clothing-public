import { create } from "zustand";

import { authStorage } from "@/store/auth-storage";
import type { AuthUser } from "@/features/auth/types/auth.types";

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isInitialized: boolean;

  initialize: () => void;
  setAuth: (user: AuthUser) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isInitialized: false,

  initialize: () => {
    const user = authStorage.getUser();
    const accessToken = authStorage.getAccessToken();

    set({
      user,
      isAuthenticated: Boolean(user && accessToken),
      isInitialized: true,
    });
  },

  setAuth: (user) => {
    set({
      user,
      isAuthenticated: true,
      isInitialized: true,
    });
  },

  clearAuth: () => {
    set({
      user: null,
      isAuthenticated: false,
      isInitialized: true,
    });
  },
}));
