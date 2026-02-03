import { api } from "./api";

export const authService = {
  // login: (data) => api.post("/api/login", data),
  // register: (data) => api.post("/auth/register", data),
  // me: () => api.get("/auth/me"),

  sendOtp: (email, operationType = 2) =>
    api.post("/send-otp", {
      email,
      type: operationType,
    }),

  validateOtp: (payload) =>
    api.post("/validate-otp", 
      payload
    ),
  getCustomerDetails: () => api.get("/get-customer-details"),
};
