
export type UserRole = "ADMIN" | "MERCHANT" | "RIDER";

export type RiderVehicleType = "BIKE" | "MOTORCYCLE";

export interface MerchantProfile {
  businessName?: string | null;
  businessPhone?: string | null;
  businessAddress?: string | null;
}

export interface RiderProfile {
  phone?: string | null;
  address?: string | null;
  vehicleType?: RiderVehicleType | null;
  licenseNumber?: string | null;
}

export interface ProfileUser {
  id?: string;
  name?: string;
  email?: string;
  role?: UserRole | string;
  status?: string;
  imageUrl?: string | null;
  emailVerified?: boolean;
  createdAt?: string;

  merchantProfile?: MerchantProfile | null;
  riderProfile?: RiderProfile | null;

  businessName?: string | null;
  businessPhone?: string | null;
  businessAddress?: string | null;

  phone?: string | null;
  address?: string | null;
  vehicleType?: RiderVehicleType | null;
  licenseNumber?: string | null;
}

export interface UpdateMerchantProfilePayload {
  businessName?: string;
  businessPhone?: string;
  businessAddress?: string;
}

export interface UpdateRiderProfilePayload {
  phone?: string;
  address?: string;
  vehicleType?: RiderVehicleType;
  licenseNumber?: string;
}

export interface ProfileApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}