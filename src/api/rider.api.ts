import apiClient from "@/lib/apiClient";
import type { ApiResponse } from "@/types/auth";
import type { Rider, ReviewRiderPayload } from "@/types/rider.types";

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
