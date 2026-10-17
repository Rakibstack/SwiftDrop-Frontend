import apiClient from "@/lib/apiClient";
import type {
  ApiResponse,
  MerchantTrackingData,
  PublicTrackingData,
} from "@/types/tracking.types";

export const trackingService = {
  async trackPublic(trackingId: string): Promise<PublicTrackingData> {
    const response = await apiClient<ApiResponse<PublicTrackingData>>(
      `/shipment/track-shipment-public/${encodeURIComponent(trackingId.trim())}`,
      {
        method: "GET",
      },
    );

    return response.data;
  },

  async trackMerchant(trackingId: string): Promise<MerchantTrackingData> {
    const response = await apiClient<ApiResponse<MerchantTrackingData>>(
      `/shipment/track-shipment/${encodeURIComponent(trackingId.trim())}`,
      {
        method: "GET",
      },
    );

    return response.data;
  },
};
