
import apiClient from "@/lib/apiClient";
import type {
  ForgotPasswordPayload,
  GoogleLoginPayload,
  LoginPayload,
  RegisterMerchantPayload,
  ResetPasswordPayload,
  VerifyEmailPayload,
} from "@/types/auth.types";

export const registerMerchant = async (
  payload: RegisterMerchantPayload,
) => {
  return apiClient("/auth/register", {
    method: "POST",
    body: payload,
  });
};

export const verifyEmail = async (
  payload: VerifyEmailPayload,
) => {
  return apiClient("/auth/verify-email", {
    method: "POST",
    body: payload,
  });
};

export const login = async (payload: LoginPayload) => {
  return apiClient("/auth/login", {
    method: "POST",
    body: payload,
  });
};

export const getCurrentUser = async () => {
  return apiClient("/auth/me", {
    method: "GET",
  });
};

export const refreshToken = async () => {
  return apiClient("/auth/refresh-token", {
    method: "POST",
  });
};

export const forgotPassword = async (
  payload: ForgotPasswordPayload,
) => {
  return apiClient("/auth/forgot-password", {
    method: "POST",
    body: payload,
  });
};

export const resetPassword = async (
  payload: ResetPasswordPayload,
) => {
  return apiClient("/auth/reset-password", {
    method: "POST",
    body: payload,
  });
};

export const googleLogin = async (
  payload: GoogleLoginPayload,
) => {
  return apiClient("/auth/google", {
    method: "POST",
    body: payload,
  });
};