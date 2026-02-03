"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { api } from "@/services/api"; // axios instance

export const useAuthGuard = () => {
  const router = useRouter();
  const token = useAuthStore((s) => s.token);
  const logout = useAuthStore((s) => s.logout);

  useEffect(() => {
    const validate = async () => {
      if (!token) {
        logout();
        router.replace("/login");
        return;
      }

      try {
        const res = await api.get("/auth/validate");

        if (!res.data.valid) {
          throw new Error("Invalid token");
        }
      } catch {
        logout();
        router.replace("/login");
      }
    };

    validate();
  }, [token, logout, router]);
};