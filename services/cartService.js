import { api } from "./api";

export const cartService = {
  fetch: () => api.get("http://localhost:4001/api/cart"),
  add: (payload) => api.post("/cart/add", payload),
  update: (payload) => api.put("/cart/update", payload),
  remove: (id) => api.delete(`/cart/remove/${id}`),
  clear: () => api.post("/cart/clear"),
};