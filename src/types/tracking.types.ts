export type ShipmentStatus =
  | "PAYMENT_PENDING"
  | "PAYMENT_CONFIRMED"
  | "PICKED_UP"
  | "ASSIGNED"
  | "IN_TRANSIT"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "DELIVERY_FAILED"
  | "CANCELLED"
  | "RETURNED";

export type ParcelType =
  | "DOCUMENT"
  | "PARCEL"
  | "FRAGILE"
  | "ELECTRONICS"
  | "OTHER";

export interface TrackingEvent {
  status: ShipmentStatus;
  location: string | null;
  description: string;
  createdAt: string;
}

export interface PublicTrackingData {
  trackingId: string;
  parcelType: ParcelType;
  status: ShipmentStatus;
  trackingEvents: TrackingEvent[];
}

export interface MerchantTrackingData {
  id: string;
  trackingId: string;
  merchantId: string;
  riderId: string | null;

  senderName: string;
  senderPhone: string;
  senderAddress: string;

  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;

  parcelType: ParcelType;
  parcelDescription: string;
  weight: string;
  deliveryFee: string;
  codAmount: string;

  status: ShipmentStatus;

  assignedAt: string | null;
  pickedUpAt: string | null;
  deliveredAt: string | null;
  deliveryFailedAt: string | null;
  failureReason: string | null;
  cancelledAt: string | null;
  cancellationReason: string | null;

  createdAt: string;
  updatedAt: string;
  trackingEvents: TrackingEvent[];
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
}
