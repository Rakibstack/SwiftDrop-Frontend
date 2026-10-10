import apiClient from "@/lib/apiClient";
import type {
  AdminShipment,
  AdminShipmentListResponse,
  AdminShipmentQuery,
  AssignRiderPayload,
} from "@/types/admin-shipment.types";
import type { ApiResponse } from "@/types/auth";

const SHIPMENT_PATH = "/shipment";

interface AdminShipmentListData {
  data: AdminShipment[];
}

export async function getAllAdminShipments(
  query: AdminShipmentQuery,
): Promise<AdminShipmentListResponse> {
  const params = new URLSearchParams();

  params.set("page", String(query.page));
  params.set("limit", String(query.limit));

  if (query.searchTerm?.trim()) {
    params.set("searchTerm", query.searchTerm.trim());
  }

  if (query.status) {
    params.set("status", query.status);
  }

  return apiClient<AdminShipmentListResponse>(
    `${SHIPMENT_PATH}/get-all-shipment-admin?${params.toString()}`,
  );
}

export async function getAdminShipmentById(shipmentId: string) {
  return apiClient<ApiResponse<AdminShipment>>(
    `${SHIPMENT_PATH}/get-single-shipment-admin/${shipmentId}`,
  );
}

export async function assignShipmentRider(
  shipmentId: string,
  payload: AssignRiderPayload,
) {
  return apiClient<ApiResponse<AdminShipment>>(
    `${SHIPMENT_PATH}/${shipmentId}/assign-rider`,
    {
      method: "PATCH",
      body: payload,
    },
  );
}
