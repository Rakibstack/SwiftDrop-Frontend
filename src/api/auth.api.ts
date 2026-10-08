import apiClient from "@/lib/apiClient";
import { UserProfile } from "@/types/auth";
import type {
  ApiResponse,
  ForgotPasswordPayload,
  GoogleLoginPayload,
  LoginPayload,
  RegisterMerchantPayload,
  ResendRiderVerificationOtpPayload,
  ResetPasswordPayload,
  VerifyEmailPayload,
  VerifyRiderPayload,
} from "@/types/auth.types";
import { IApplyAsRiderPayload } from "@/validation/rider.schema";

export const registerMerchant = async (payload: RegisterMerchantPayload) => {
  return apiClient<ApiResponse<null>>("/auth/register", {
    method: "POST",
    body: payload,
  });
};

export const verifyEmail = async (payload: VerifyEmailPayload) => {
  return apiClient<ApiResponse<null>>("/auth/verify-email", {
    method: "POST",
    body: payload,
  });
};

export const resendVerificationOtp = async (payload: { email: string }) => {
  return apiClient<ApiResponse<null>>("/auth/resend-verification-otp", {
    method: "POST",
    body: payload,
  });
};
export const verifyRider = async (payload: VerifyRiderPayload) => {
  return apiClient<ApiResponse<null>>("/rider/verify-rider-email", {
    method: "POST",
    body: payload,
  });
};

export const resendRiderVerificationOtp = async (
  payload: ResendRiderVerificationOtpPayload,
) => {
  return apiClient<ApiResponse<null>>("/rider/resend-verification-otp", {
    method: "POST",
    body: payload,
  });
};

export const loginUser = async (payload: LoginPayload) => {
  return apiClient<ApiResponse<null>>("/auth/login", {
    method: "POST",
    body: payload,
  });
};

export const getCurrentUser = async () => {
  return apiClient<ApiResponse<UserProfile>>("/auth/me", {
    method: "GET",
  });
};
export const logoutUser = async () => {
  return apiClient<ApiResponse<null>>("/auth/logout", {
    method: "POST",
  });
};
export const applyAsRider = async (payload: IApplyAsRiderPayload) => {
  return apiClient<ApiResponse<null>>("/rider/apply-as-rider", {
    method: "POST",
    body: payload,
  });
};

export const refreshToken = async () => {
  return apiClient("/auth/refresh-token", {
    method: "POST",
  });
};

export const forgotPassword = async (payload: ForgotPasswordPayload) => {
  return apiClient<ApiResponse<null>>("/auth/forgot-password", {
    method: "POST",
    body: payload,
  });
};

export const resetPassword = async (payload: ResetPasswordPayload) => {
  return apiClient<ApiResponse<null>>("/auth/reset-password", {
    method: "POST",
    body: payload,
  });
};

export const googleLogin = async (payload: GoogleLoginPayload) => {
  return apiClient("/auth/google", {
    method: "POST",
    body: payload,
  });
};
