import apiClient from "@/lib/apiClient";
import { ApiResponse } from "@/types/auth";
import type {
  CreateShipmentPayload,
  Shipment,
  ShipmentListData,
  ShipmentQuery,
} from "@/types/shipment.types";

export async function createShipment(payload: CreateShipmentPayload) {
  return apiClient<ApiResponse<Shipment>>("/shipment", {
    method: "POST",
    body: payload,
  });
}

export async function getMerchantShipments(query: ShipmentQuery = {}) {
  return apiClient<ApiResponse<ShipmentListData>>(
    "/shipment/get-all-shipment-merchant",
    {
      method: "GET",
      query,
    },
  );
}

export async function getMerchantShipmentById(shipmentId: string) {
  return apiClient<ApiResponse<Shipment>>(
    `/shipment/get-single-shipment-merchant/${shipmentId}`,
    {
      method: "GET",
    },
  );
}
