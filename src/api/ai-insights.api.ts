import apiClient from "@/lib/apiClient";
import type { AIInsightsResponse } from "@/types/ai-insights.types";

export const getAIInsights = async (): Promise<AIInsightsResponse> => {
  return apiClient<AIInsightsResponse>("/ai-insights/admin-ai-insights", {
    method: "GET",
  });
};