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



// export type ShipmentStatus =
//   | "PENDING"
//   | "ASSIGNED"
//   | "ACCEPTED"
//   | "PICKED_UP"
//   | "IN_TRANSIT"
//   | "DELIVERED"
//   | "DELIVERY_FAILED"
//   | "CANCELLED"
//   | (string & {});

export interface RiderShipment {
  id: string;
  trackingId: string;

  senderName: string;
  senderPhone: string;
  senderAddress: string;

  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;

  parcelType: string;
  parcelDescription: string;
  weight: string;
  codAmount: string;
  deliveryFee: string;

  status: ShipmentStatus;

  assignedAt: string | null;
  pickedUpAt: string | null;
  deliveredAt: string | null;
  deliveryFailedAt: string | null;
  failureReason: string | null;

  createdAt: string;
  updatedAt: string;
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

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export type MyShipmentsResponse =
  ApiResponse<PaginatedResponse<RiderShipment>>;

