import {
  forgotPassword,
  getCurrentUser,
  googleLogin,
  loginUser,
  logoutUser,
  registerMerchant,
  resendVerificationOtp,
  resetPassword,
  verifyEmail,
} from "@/api/auth.api";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useRegister() {
  return useMutation({
    mutationFn: registerMerchant,
  });
}

export function useVerifyEmail() {
  return useMutation({
    mutationFn: verifyEmail,
  });
}

export function useResendVerificationOtp() {
  return useMutation({
    mutationFn: resendVerificationOtp,
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: loginUser,
  });
}
export function useGoogleOAuth() {
  return useMutation({
    mutationFn: googleLogin,
  });
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
    retry: false,
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: logoutUser,
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: forgotPassword,
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: resetPassword,
  });
}
