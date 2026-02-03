import { useAuthStore } from "@/store/authStore";
import { authService } from "@/services/authService";

export const useAuthMachine = () => {
  const {
    setLoading,
    setOtpSent,
    setAuth,
    setUser,
    setError,
    logout,
  } = useAuthStore();

  const sendOtp = async (email, operationType = 2) => {
    try {
      setLoading();

      const res = await authService.sendOtp(email, operationType);

      // 🔴 Optional safety check (industry standard)
      if (res?.data?.success === false) {
        setError(res.data.message);
        return false;
      }

      setOtpSent();
      return true;
    } catch (err) {
      const message =
        err?.response?.data?.message || "Failed to send OTP";

      setError(message);
      return false;
    }
  };

  const verifyOtp = async (email, otp, requestType = 2) => {
    try {
      setLoading();

      const payload = {
        email,
        otp,
        old_uuid: null,
        request_type: requestType,
        affKey: null,
      };

      const res = await authService.validateOtp(payload);

      if (res?.data?.success === false) {
        setError(res.data.message);
        return false;
      }

      const { token } = res.data;
      setAuth(token);

      const customerRes = await authService.getCustomerDetails();
      setUser(customerRes.data);

      return true;
    } catch (err) {
      const message =
        err?.response?.data?.message || "Invalid OTP";

      setError(message);
      return false;
    }
  };

  const doLogout = () => logout();

  return { sendOtp, verifyOtp, doLogout };
};
