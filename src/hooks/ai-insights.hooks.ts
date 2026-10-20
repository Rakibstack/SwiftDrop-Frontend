
"use client";

import { getAIInsights } from "@/api/ai-insights.api";
import { useQuery } from "@tanstack/react-query";

export const useAIInsights = () => {
  return useQuery({
    queryKey: ["admin", "ai-insights"],
    queryFn: getAIInsights,
    staleTime: 60_000,
    retry: 1,
  });
};
