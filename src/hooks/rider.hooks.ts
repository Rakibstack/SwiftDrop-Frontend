
"use client";

import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import type { ReviewRiderPayload } from "@/types/rider.types";
import { getAllRiders, reviewRider } from "@/api/rider.api";

export const riderKeys = {
  all: ["admin-riders"] as const,
  list: () => [...riderKeys.all, "list"] as const,
};

export function useRiders() {
  return useQuery({
    queryKey: riderKeys.list(),
    queryFn: getAllRiders,
    staleTime: 30_000,
  });
}

export function useReviewRider() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ReviewRiderPayload) =>
      reviewRider(payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: riderKeys.all,
      });
    },
  });
}