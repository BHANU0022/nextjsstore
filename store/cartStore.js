import { create } from "zustand";

export const useCartStore = create((set) => ({
  items: [],
  status: "idle", // idle | loading | adding | updating | removing | error

  setItems: (items) => set({ items }),

  addItemLocal: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),

  updateQtyLocal: (id, qty) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, qty } : item
      ),
    })),

  removeItemLocal: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  clear: () =>
    set({
      items: [],
    }),
}));
