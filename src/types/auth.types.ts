export interface RegisterMerchantPayload {
  name: string;
  email: string;
  password: string;
  businessName: string;
  businessPhone: string;
  businessAddress: string;
}

export interface VerifyEmailPayload {
  email: string;
  otp: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}

export interface GoogleLoginPayload {
  idToken: string;
}

export interface VerifyRiderPayload {
  email: string;
  otp: string;
}

export interface ResendRiderVerificationOtpPayload {
  email: string;
}
