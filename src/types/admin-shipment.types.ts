export type ShipmentStatus =
  | "PAYMENT_PENDING"
  | "PAYMENT_CONFIRMED"
  | "ASSIGNED"
  | "ACCEPTED"
  | "PICKED_UP"
  | "IN_TRANSIT"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "DELIVERY_FAILED"
  | "CANCELLED";

export interface ShipmentPerson {
  id: string;
  name: string;
  email: string;
}

export interface ShipmentMerchant {
  id: string;
  businessName: string;
  businessPhone: string;
  businessAddress?: string;
  user?: ShipmentPerson;
}

export interface ShipmentRider {
  id: string;
  phone: string;
  address: string;
  vehicleType: string;
  licenseNumber: string;
  status: string;
  isSuspended: boolean;
  user: ShipmentPerson;
}

export interface ShipmentTrackingEvent {
  id: string;
  shipmentId: string;
  status: ShipmentStatus;
  location: string | null;
  description: string;
  updatedBy: string | null;
  createdAt: string;
}

export interface ShipmentPayment {
  id: string;
  status: string;
  currency: string;
  amount: string;
  paymentGateway: string;
  merchantInvoiceNumber: string;
  bkashTrxId: string | null;
  paidAt: string | null;
  createdAt: string;
}

export interface AdminShipment {
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

  parcelType: string;
  parcelDescription: string | null;
  weight: string | number | null;

  deliveryFee: string | number;
  codAmount: string | number;

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

  merchant: ShipmentMerchant;
  rider: ShipmentRider | null;
  trackingEvents: ShipmentTrackingEvent[];
  payments: ShipmentPayment[];
}

export interface AdminShipmentListData {
  data: AdminShipment[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface AdminShipmentListResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: AdminShipmentListData;
}

export interface AdminShipmentQuery {
  page: number;
  limit: number;
  searchTerm?: string;
  status?: ShipmentStatus | "";
}

export interface AssignRiderPayload {
  riderId: string;
}
