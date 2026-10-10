import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/auth";
import type { ReviewRiderPayload, Rider } from "@/types/rider.types";
import { MyShipmentsResponse, RiderShipment } from "@/types/shipment.types";

const RIDER_BASE_PATH = "/rider";

interface RiderListData {
  data: Rider[];
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

interface GetMyShipmentsParams {
  page?: number;
  limit?: number;
}

export const getMyShipments = async (
  params: GetMyShipmentsParams = {},
): Promise<MyShipmentsResponse> => {
  return apiClient<MyShipmentsResponse>("/rider/my-shipments", {
    method: "GET",
    query: {
      page: params.page ?? 1,
      limit: params.limit ?? 10,
    },
  });
};

export const acceptShipment = async (
  shipmentId: string,
): Promise<ApiResponse<RiderShipment>> => {
  return apiClient<ApiResponse<RiderShipment>>(
    `/rider/shipments/${shipmentId}/accept`,
    {
      method: "PATCH",
    }
  )
}