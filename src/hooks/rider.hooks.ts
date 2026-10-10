"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { acceptShipment, getAllRiders, getMyShipments, reviewRider } from "@/api/rider.api";
import type { ReviewRiderPayload } from "@/types/rider.types";
import { toast } from "sonner";

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
    mutationFn: (payload: ReviewRiderPayload) => reviewRider(payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: riderKeys.all,
      });
    },
  });
}

interface GetMyShipmentsParams {
  page?: number;
  limit?: number;
}

export const riderShipmentKeys = {
  all: ["rider", "shipments"] as const,

  lists: () => [...riderShipmentKeys.all, "list"] as const,

  list: (params: GetMyShipmentsParams) =>
    [...riderShipmentKeys.lists(), params] as const,
};

export const useMyShipments = (
  params: GetMyShipmentsParams = {},
) => {
  return useQuery({
    queryKey: riderShipmentKeys.list(params),
    queryFn: () => getMyShipments(params),
  });
};

export const useAcceptShipment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (shipmentId: string) =>
      acceptShipment(shipmentId),

    onSuccess: async (response) => {
      toast.success(
        response.message || "Shipment accepted successfully",
      );

      await queryClient.invalidateQueries({
        queryKey: riderShipmentKeys.all,
      });
    },

    onError: (error) => {
      toast.error(
        error.message || "Failed to accept shipment",
      );
    },
  });
};
