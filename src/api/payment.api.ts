import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/auth";
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
