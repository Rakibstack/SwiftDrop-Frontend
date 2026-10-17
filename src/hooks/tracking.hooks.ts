import { trackingService } from "@/api/tracking-event.api";
import { useQuery } from "@tanstack/react-query";

export const trackingKeys = {
  all: ["tracking"] as const,

  public: (trackingId: string) =>
    [...trackingKeys.all, "public", trackingId] as const,

  merchant: (trackingId: string) =>
    [...trackingKeys.all, "merchant", trackingId] as const,
};

export function usePublicTracking(trackingId: string) {
  const normalizedId = trackingId.trim();

  return useQuery({
    queryKey: trackingKeys.public(normalizedId),
    queryFn: () => trackingService.trackPublic(normalizedId),
    enabled: normalizedId.length > 0,
    retry: 1,
    staleTime: 30_000,
  });
}

export function useMerchantTracking(trackingId: string) {
  const normalizedId = trackingId.trim();

  return useQuery({
    queryKey: trackingKeys.merchant(normalizedId),
    queryFn: () => trackingService.trackMerchant(normalizedId),
    enabled: normalizedId.length > 0,
    retry: 1,
    staleTime: 30_000,
  });
}
