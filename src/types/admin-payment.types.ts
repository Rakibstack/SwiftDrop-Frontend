

export type PaymentStatus =
  | "PAID"
  | "PENDING"
  | "FAILED"
  | "CANCELLED"
  | "REFUNDED"
  | "EXPIRED"
  | (string & {});

export type PaymentGateway = "BKASH" | (string & {});

export type ShipmentStatus = string;

export interface PaymentGatewayResponse {
  [key: string]: unknown;
}

export interface PaymentMerchantUser {
  id?: string;
  name: string;
  email: string;
}

export interface PaymentMerchant {
  id?: string;
  businessName: string;
  businessPhone?: string | null;
  businessAddress?: string | null;
  user: PaymentMerchantUser;
}

export interface PaymentRider {
  id?: string;
  phone?: string | null;
  user?: {
    id?: string;
    name?: string;
    email?: string;
  } | null;
}

export interface PaymentShipmentList {
  id: string;
  trackingId: string;
  recipientName: string;
  recipientPhone: string;
  status: ShipmentStatus;
  merchant: {
    businessName: string;
    user: {
      name: string;
      email: string;
    };
  };
}

export interface PaymentShipmentDetails {
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
  merchant: PaymentMerchant;
  rider: PaymentRider | null;
}

export interface AdminPayment {
  id: string;
  status: PaymentStatus;
  currency: string;
  amount: string;
  paymentGateway: PaymentGateway;
  merchantInvoiceNumber: string;
  bkashPaymentId: string | null;
  bkashTrxId: string | null;
  payerReference: string | null;
  paidAt: string | null;
  gatewayResponse: PaymentGatewayResponse | null;
  refundTrxId: string | null;
  refundAmount: string | null;
  refundReason: string | null;
  refundAt: string | null;
  createdAt: string;
  updatedAt: string;
  shipmentId: string;
  shipment: PaymentShipmentList | PaymentShipmentDetails;
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

export interface AdminPaymentsListData {
  data: AdminPayment[];
  meta: PaginationMeta;
}

export type AdminPaymentsResponse =
  ApiResponse<AdminPaymentsListData>;

export type AdminPaymentDetailsResponse =
  ApiResponse<AdminPayment>;
