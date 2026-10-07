import { registerMerchant, resendVerificationOtp, verifyEmail } from "@/api/auth.api";
import { useMutation } from "@tanstack/react-query";

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
