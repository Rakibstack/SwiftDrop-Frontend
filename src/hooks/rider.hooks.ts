"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  acceptShipment,
  deliverShipment,
  getAllRiders,
  getMyShipments,
  getRiderShipmentById,
  markShipmentInTransit,
  markShipmentOutForDelivery,
  pickupShipment,
  reviewRider,
} from "@/api/rider.api";

import type { ReviewRiderPayload } from "@/types/rider.types";
import type { ApiResponse } from "@/types/auth";

interface GetMyShipmentsParams {
  page?: number;
  limit?: number;
}

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

export const riderShipmentKeys = {
  all: ["rider", "shipments"] as const,
  lists: () => [...riderShipmentKeys.all, "list"] as const,
  list: (params: GetMyShipmentsParams) =>
    [...riderShipmentKeys.lists(), params] as const,
  details: () => [...riderShipmentKeys.all, "detail"] as const,
  detail: (shipmentId: string) =>
    [...riderShipmentKeys.details(), shipmentId] as const,
};

export const useMyShipments = (params: GetMyShipmentsParams = {}) => {
  return useQuery({
    queryKey: riderShipmentKeys.list(params),
    queryFn: () => getMyShipments(params),
  });
};

export const useRiderShipmentDetails = (shipmentId: string) => {
  return useQuery({
    queryKey: riderShipmentKeys.detail(shipmentId),
    queryFn: () => getRiderShipmentById(shipmentId),
    enabled: Boolean(shipmentId),
    retry: false,
  });
};

type ShipmentAction = (shipmentId: string) => Promise<ApiResponse<unknown>>;

function useRiderShipmentAction(
  action: ShipmentAction,
  successMessage: string,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (shipmentId: string) => action(shipmentId),

    onSuccess: async (response, shipmentId) => {
      toast.success(response.message || successMessage);

      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: riderShipmentKeys.all,
        }),
        queryClient.invalidateQueries({
          queryKey: riderShipmentKeys.detail(shipmentId),
        }),
      ]);
    },

    onError: (error: Error) => {
      toast.error(error.message || "Shipment update failed.");
    },
  });
}

export const useAcceptShipment = () =>
  useRiderShipmentAction(acceptShipment, "Shipment accepted successfully.");

export const usePickupShipment = () =>
  useRiderShipmentAction(pickupShipment, "Pickup confirmed successfully.");

export const useMarkShipmentInTransit = () =>
  useRiderShipmentAction(
    markShipmentInTransit,
    "Shipment marked as in transit.",
  );

export const useMarkShipmentOutForDelivery = () =>
  useRiderShipmentAction(
    markShipmentOutForDelivery,
    "Shipment marked out for delivery.",
  );

export const useDeliverShipment = () =>
  useRiderShipmentAction(deliverShipment, "Shipment delivered successfully.");
