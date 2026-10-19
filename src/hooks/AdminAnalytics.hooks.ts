"use client";

import { getAdminAnalytics } from "@/api/admin-analytics.api";
import { useQuery } from "@tanstack/react-query";

export const adminAnalyticsKeys = {
  all: ["admin-analytics"] as const,
};

export function useAdminAnalytics() {
  return useQuery({
    queryKey: adminAnalyticsKeys.all,
    queryFn: getAdminAnalytics,
    select: (response) => response.data,
  });
}
