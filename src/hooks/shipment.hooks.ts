"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ShipmentQuery } from "@/types/shipment.types";
import {
  createShipment,
  getMerchantShipmentById,
  getMerchantShipments,
} from "@/api/shipment.api";
import { cancelShipment, initiateShipmentPayment } from "@/api/payment.api";
import { ICancelShipmentPayload, IShipmentIdPayload } from "@/validation/shipment.schem";

export const merchantShipmentKeys = {
  all: ["merchant-shipments"] as const,
  list: (query: ShipmentQuery) =>
    ["merchant-shipments", "list", query] as const,
  detail: (id: string) => ["merchant-shipments", "detail", id] as const,
};

export function useShipments(query: ShipmentQuery = {}) {
  return useQuery({
    queryKey: merchantShipmentKeys.list(query),
    queryFn: () => getMerchantShipments(query),
    staleTime: 30_000,
  });
}

export function useCreateShipment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createShipment,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: merchantShipmentKeys.all,
      });
    },
  });
}

export function useShipmentDetails(shipmentId: string) {
  return useQuery({
    queryKey: merchantShipmentKeys.detail(shipmentId),
    queryFn: () => getMerchantShipmentById(shipmentId),
    enabled: Boolean(shipmentId),
    staleTime: 30_000,
  });
}

export function useInitiateShipmentPayment() {
  return useMutation({
    mutationFn: (payload: IShipmentIdPayload) =>
      initiateShipmentPayment(payload),
  });
}
export function useCancelShipment() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      shipmentId,
      payload,
    }: {
      shipmentId: string;
      payload: ICancelShipmentPayload;
    }) => cancelShipment(shipmentId, payload),
    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: merchantShipmentKeys.all }),
        queryClient.invalidateQueries({
          queryKey: merchantShipmentKeys.detail(variables.shipmentId),
        }),
      ]);
    },
  });
}
