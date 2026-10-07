
export type UserRole = "MERCHANT" | "RIDER" | "ADMIN";

export type UserStatus = "ACTIVE" | "SUSPENDED" | "DELETED";

export interface MerchantProfile {
  id: string;
  businessName: string;
  businessPhone: string;
  businessAddress: string;
}

export interface RiderProfile {
  id: string;
}

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  isDeleted: boolean;
  merchantProfile: MerchantProfile | null;
  riderProfile: RiderProfile | null;
}