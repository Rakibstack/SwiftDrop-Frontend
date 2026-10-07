
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "MERCHANT" | "RIDER" | "ADMIN";
  emailVerified: boolean;
  isActive: boolean;
  imageUrl?: string | null;
  merchantProfile?: {
    id: string;
    businessName: string;
    businessPhone: string;
    businessAddress: string;
  } | null;
  riderProfile?: {
    id: string;
    phone: string;
    address: string;
  } | null;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}