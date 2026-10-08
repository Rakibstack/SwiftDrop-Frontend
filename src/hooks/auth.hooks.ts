import {
  applyAsRider,
  forgotPassword,
  getCurrentUser,
  googleLogin,
  loginUser,
  logoutUser,
  registerMerchant,
  resendRiderVerificationOtp,
  resendVerificationOtp,
  resetPassword,
  verifyEmail,
  verifyRider,
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
export function useApplyAsRider() {
  return useMutation({
    mutationFn: applyAsRider,
  });
}
export function useVerifyRider() {
  return useMutation({
    mutationFn: verifyRider,
  });
}

export function useResendRiderVerificationOtp() {
  return useMutation({
    mutationFn: resendRiderVerificationOtp,
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
