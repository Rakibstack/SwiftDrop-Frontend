import { ShipmentStatus } from "./shipment.types";

export type PaymentStatus =
  | "PENDING"
  | "PAID"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED"
  | "REFUNDED"
  | "EXPIRED"
  | "UNPAID"
  | string;

export interface PaymentShipment {
  id: string;
  trackingId?: string;
  status?: ShipmentStatus;
  recipientName?: string;
  senderName?: string;
}

export interface Payment {
  id: string;
  status: PaymentStatus;
  amount: number | string;
  currency?: string;
  paymentGateway?: string;
  merchantInvoiceNumber?: string;
  bkashPaymentId?: string | null;
  bkashTrxId?: string | null;
  payerReference?: string | null;
  paidAt?: string | null;
  refundedAt?: string | null;
  refundAmount?: number | string | null;
  refundReason?: string | null;
  shipmentId?: string;
  shipment?: PaymentShipment | null;
  createdAt: string;
  updatedAt?: string;
}