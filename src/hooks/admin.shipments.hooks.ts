"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  assignShipmentRider,
  getAdminShipmentById,
  getAllAdminShipments,
} from "@/api/admin-shipment.api";

import type {
  AdminShipmentQuery,
  AssignRiderPayload,
} from "@/types/admin-shipment.types";

export const adminShipmentKeys = {
  all: ["admin-shipments"] as const,

  list: (query: AdminShipmentQuery) =>
    [...adminShipmentKeys.all, "list", query] as const,

  detail: (id: string) => [...adminShipmentKeys.all, "detail", id] as const,
};

export function useAdminShipments(query: AdminShipmentQuery) {
  return useQuery({
    queryKey: adminShipmentKeys.list(query),
    queryFn: () => getAllAdminShipments(query),
    staleTime: 30_000,
  });
}

export function useAdminShipmentDetails(shipmentId: string) {
  return useQuery({
    queryKey: adminShipmentKeys.detail(shipmentId),
    queryFn: () => getAdminShipmentById(shipmentId),
    enabled: Boolean(shipmentId),
  });
}

export function useAssignShipmentRider(shipmentId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AssignRiderPayload) =>
      assignShipmentRider(shipmentId, payload),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: adminShipmentKeys.all,
        }),
        queryClient.invalidateQueries({
          queryKey: ["admin-dashboard"],
        }),
      ]);
    },
  });
}
