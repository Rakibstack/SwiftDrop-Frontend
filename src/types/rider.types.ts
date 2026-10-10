export type RiderStatus = "PENDING" | "ACTIVE" | "REJECTED" | string;

export type RiderReviewStatus = "ACTIVE" | "REJECTED";

export interface RiderUser {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  emailVerified: boolean;
  authProvider: string;
  imageUrl: string;
  imagePublicId: string;
  needPasswordChange: boolean;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Rider {
  id: string;
  phone: string;
  address: string;
  vehicleType: string;
  licenseNumber: string;
  status: RiderStatus;
  userId: string;
  isSuspended: boolean;
  sespendedAt: string | null;
  rejectedAt: string | null;
  rejectionReason: string | null;
  reviewedBy: string | null;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
  user: RiderUser;
}

export interface ReviewRiderPayload {
  riderId: string;
  status: RiderReviewStatus;
  rejectionReason?: string;
}
