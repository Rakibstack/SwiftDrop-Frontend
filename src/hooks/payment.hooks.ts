"use client";

import { getMerchantPaymentById, getMerchantPayments } from "@/api/payment.api";
import { useQuery } from "@tanstack/react-query";

export const paymentKeys = {
  all: ["merchant-payments"] as const,
  list: () => [...paymentKeys.all, "list"] as const,
  detail: (paymentId: string) =>
    [...paymentKeys.all, "detail", paymentId] as const,
};

export function usePayments() {
  return useQuery({
    queryKey: paymentKeys.list(),
    queryFn: getMerchantPayments,
    staleTime: 30_000,
  });
}

export function usePaymentDetails(paymentId: string) {
  return useQuery({
    queryKey: paymentKeys.detail(paymentId),
    queryFn: () => getMerchantPaymentById(paymentId),
    enabled: Boolean(paymentId),
    staleTime: 30_000,
  });
}
