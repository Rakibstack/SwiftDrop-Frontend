import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/auth";
import type { ReviewRiderPayload, Rider } from "@/types/rider.types";
import type {
  MyShipmentsResponse,
  RiderShipment,
} from "@/types/shipment.types";

const RIDER_BASE_PATH = "/rider";

interface RiderListData {
  data: Rider[];
}

interface GetMyShipmentsParams {
  page?: number;
  limit?: number;
}

export async function getAllRiders(): Promise<Rider[]> {
  const response = await apiClient<ApiResponse<RiderListData>>(
    `${RIDER_BASE_PATH}/get-all-riders`,
  );

  return response.data.data;
}

export async function reviewRider(
  payload: ReviewRiderPayload,
): Promise<ApiResponse<unknown>> {
  return apiClient<ApiResponse<unknown>>(`${RIDER_BASE_PATH}/approve-rider`, {
    method: "POST",
    body: payload,
  });
}

export const getMyShipments = async (
  params: GetMyShipmentsParams = {},
): Promise<MyShipmentsResponse> => {
  return apiClient<MyShipmentsResponse>(`${RIDER_BASE_PATH}/my-shipments`, {
    method: "GET",
    query: {
      page: params.page ?? 1,
      limit: params.limit ?? 10,
    },
  });
};

export const getRiderShipmentById = async (
  shipmentId: string,
): Promise<RiderShipment> => {
  const limit = 100;
  let page = 1;

  while (true) {
    const response = await getMyShipments({ page, limit });
    const pageData = response.data;
    const shipments = pageData.data;

    const shipment = shipments.find((item) => item.id === shipmentId);

    if (shipment) {
      return shipment;
    }

    const totalPages = pageData.meta.totalPages;

    if (page >= totalPages || shipments.length === 0) {
      throw new Error("Shipment not found in your assigned shipments.");
    }

    page += 1;
  }
};

export const acceptShipment = async (
  shipmentId: string,
): Promise<ApiResponse<unknown>> => {
  return apiClient<ApiResponse<unknown>>(
    `${RIDER_BASE_PATH}/shipments/${shipmentId}/accept`,
    { method: "PATCH" },
  );
};

export const pickupShipment = async (
  shipmentId: string,
): Promise<ApiResponse<unknown>> => {
  return apiClient<ApiResponse<unknown>>(
    `${RIDER_BASE_PATH}/shipments/${shipmentId}/pickup`,
    { method: "PATCH" },
  );
};

export const markShipmentInTransit = async (
  shipmentId: string,
): Promise<ApiResponse<unknown>> => {
  return apiClient<ApiResponse<unknown>>(
    `${RIDER_BASE_PATH}/shipments/${shipmentId}/markInTransit`,
    { method: "PATCH" },
  );
};

export const markShipmentOutForDelivery = async (
  shipmentId: string,
): Promise<ApiResponse<unknown>> => {
  return apiClient<ApiResponse<unknown>>(
    `${RIDER_BASE_PATH}/shipments/${shipmentId}/outForDelivery`,
    { method: "PATCH" },
  );
};

export const deliverShipment = async (
  shipmentId: string,
): Promise<ApiResponse<unknown>> => {
  return apiClient<ApiResponse<unknown>>(
    `${RIDER_BASE_PATH}/shipments/${shipmentId}/deliverShipment`,
    { method: "PATCH" },
  );
};
