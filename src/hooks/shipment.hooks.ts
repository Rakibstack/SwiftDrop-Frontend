"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ShipmentQuery } from "@/types/shipment.types";
import { createShipment, getMerchantShipments } from "@/api/shipment.api";

export const merchantShipmentKeys = {
  all: ["merchant-shipments"] as const,
  list: (query: ShipmentQuery) =>
    ["merchant-shipments", "list", query] as const,
  detail: (id: string) =>
    ["merchant-shipments", "detail", id] as const,
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
      return queryClient.invalidateQueries({ queryKey: merchantShipmentKeys.all });
    },
  });
}
