import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerMerchant,
  resendVerificationOtp,
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
