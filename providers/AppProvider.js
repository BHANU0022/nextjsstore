"use client";
import { useEffect } from "react";
import { useAuthMachine } from "@/hooks/useAuthMachine";
import { useCartMachine } from "@/hooks/useCartMachine";

export default function AppProvider({ children }) {
  const { loadUser } = useAuthMachine();
  const { loadCart } = useCartMachine();

  useEffect(() => {
    loadUser().then(() => loadCart());
  }, []);

  return children;
}