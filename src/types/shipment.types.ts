export type ShipmentStatus =
  | "PAYMENT_PENDING"
  | "PAYMENT_CONFIRMED"
  | "CANCELLED"
  | "ASSIGNED"
  | "ACCEPTED"
  | "PICKED_UP"
  | "IN_TRANSIT"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "DELIVERY_FAILED";

export interface CreateShipmentPayload {
  senderName: string;
  senderPhone: string;
  senderAddress: string;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  parcelType: string;
  parcelDescription?: string;
  weight?: number;
  codAmount: number;
}

export interface TrackingEvent {
  id: string;
  status: ShipmentStatus;
  description: string;
  createdAt: string;
}

export interface Shipment {
  id: string;
  trackingId: string;
  senderName: string;
  senderPhone: string;
  senderAddress: string;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  parcelType: string;
  parcelDescription: string | null;
  weight: number | null;
  deliveryFee: number;
  codAmount: number;
  status: ShipmentStatus;
  createdAt: string;
  updatedAt: string;
  trackingEvents: TrackingEvent[];
}

export interface ShipmentPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ShipmentListData {
  data: Shipment[];
}

export interface ShipmentQuery {
  page?: number;
  limit?: number;
  searchTerm?: string;
  status?: ShipmentStatus;
}
