import type { UserRole } from "./user.type";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
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
  statusCode: number;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
