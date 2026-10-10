import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/auth";
import { Payment } from "@/types/payment.types";
import { ICancelShipmentPayload, IShipmentIdPayload } from "@/validation/shipment.schem";


// Change this prefix if your payment router is mounted elsewhere.
const PAYMENT_BASE_PATH = "/payment";

export interface InitiateShipmentPaymentResponse {
  paymentURL: string;
}

export async function initiateShipmentPayment(payload: IShipmentIdPayload) {
  return apiClient<ApiResponse<InitiateShipmentPaymentResponse>>(
    `${PAYMENT_BASE_PATH}/initiate-shipment-payment`,
    {
      method: "POST",
      body: payload,
    },
  );
}

export async function cancelShipment(
  shipmentId: string,
  payload: ICancelShipmentPayload,
) {
  return apiClient<ApiResponse<unknown>>(
    `${PAYMENT_BASE_PATH}/cancel-shipment/${shipmentId}`,
    {
      method: "POST",
      body: payload,
    },
  );
}


type PaymentListData = Payment[] | { data?: Payment[] };

export async function getMerchantPayments() {
  const response = await apiClient<ApiResponse<PaymentListData>>(
    `/payment/get-all-payment-merchant`,
  );

  const payments = Array.isArray(response.data)
    ? response.data
    : response.data?.data ?? [];

  return {
    ...response,
    data: payments,
  } as ApiResponse<Payment[]>;
}

export async function getMerchantPaymentById(paymentId: string) {
  const response = await apiClient<ApiResponse<Payment | { payment: Payment }>>(
    `/payment/get-single-payment-merchant/${paymentId}`,
  );

  const payment =
    "payment" in response.data
      ? response.data.payment
      : response.data;

  return {
    ...response,
    data: payment,
  } as ApiResponse<Payment>;
}
