
"use client";

import { getAdminPaymentById, getAdminPayments } from "@/api/admin.payment";
import {
  useQuery,
} from "@tanstack/react-query";


export const ADMIN_PAYMENTS_QUERY_KEY = ["admin-payments"] as const;

export const ADMIN_PAYMENT_QUERY_KEY = ["admin-payment"] as const;

export function useAdminPayments(
  page: number,
  limit: number = 10,
) {
  return useQuery({
    queryKey: [...ADMIN_PAYMENTS_QUERY_KEY, page, limit],
    queryFn: () => getAdminPayments({ page, limit }),
    placeholderData: (previousData) => previousData,
  });
}

export function useAdminPaymentDetails(paymentId: string) {
  return useQuery({
    queryKey: [...ADMIN_PAYMENT_QUERY_KEY, paymentId],
    queryFn: () => getAdminPaymentById(paymentId),
    enabled: Boolean(paymentId),
  });
}
