import axios from "axios";
import { useAuthStore } from "@/store/authStore";

export const api = axios.create({
  baseURL: "https://api.gogxn.com/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  console.log("In the interceptros ##", config);
  console.log(" useAuthStore.getState()###", useAuthStore.getState());
  console.log(" useAuthStore.getState()###", useAuthStore.getState().token);
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  console.log("config", config);
  return config;
});
