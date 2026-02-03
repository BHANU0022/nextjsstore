import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
      status: "idle",

      setOtpSent: () => set({ status: "otp_sent" }),

      setLoading: () => set({ loading: true, error: null }),

      setError: (error) => set({ loading: false, error, status: "error" }),

      setAuth: (token) =>
        set({
          token,
          isAuthenticated: true,
          loading: false,
          error: null,
          status: "authenticated",
        }),

      setUser: (user) =>
        set({
          user,
          loading: false,
          error: null,
          // isAuthenticated:true,
        }),

      logout: () =>
        set({
          token: null,
          user: null,
          isAuthenticated: false,
          status: "idle",
        }),
    }),
    {
      name: "auth-storage", // localStorage key
      partialize: (state) => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
