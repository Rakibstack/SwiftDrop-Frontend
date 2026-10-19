import apiClient from "@/lib/apiClient";
import type { AdminAnalyticsResponse } from "@/types/admin-analytics.types";

export const getAdminAnalytics = async (): Promise<AdminAnalyticsResponse> => {
  return apiClient<AdminAnalyticsResponse>("/analytic/admin-analytic", {
    method: "GET",
  });
};
