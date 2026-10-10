export type UserRole = "ADMIN" | "MERCHANT" | "RIDER";

export type UserStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

export type AuthProvider = "CREDENTIAL" | "GOOGLE";

export interface MerchantProfile {
  id: string;
  businessName: string;
  businessPhone: string;
  businessAddress: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface RiderProfile {
  id: string;
  phone: string;
  address: string;
  vehicleType: string;
  licenseNumber: string;
  status: string;
  userId: string;
  isSuspended: boolean;
  sespendedAt: string | null;
  rejectedAt: string | null;
  rejectionReason: string | null;
  reviewedBy: string | null;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  emailVerified: boolean;
  authProvider: AuthProvider;
  imageUrl: string;
  imagePublicId: string;
  needPasswordChange: boolean;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  merchantProfile: MerchantProfile | null;
  riderProfile: RiderProfile | null;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}

export interface AdminUsersListData {
  data: AdminUser[];
  meta: PaginationMeta;
}

export type AdminUsersResponse = ApiResponse<AdminUsersListData>;

export type AdminUserDetailsResponse = ApiResponse<AdminUser>;
