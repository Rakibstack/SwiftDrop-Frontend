


import apiClient from "@/lib/apiClient";
import type {
  AdminPaymentDetailsResponse,
  AdminPaymentsResponse,
} from "@/types/admin-payment.types";

export interface GetAdminPaymentsParams {
  page?: number;
  limit?: number;
}

export async function getAdminPayments(
  params: GetAdminPaymentsParams = {},
): Promise<AdminPaymentsResponse> {
  return apiClient<AdminPaymentsResponse>(
    "/payment/get-all-payment-admin",
    {
      method: "GET",
      query: {
        page: params.page ?? 1,
        limit: params.limit ?? 10,
      },
    },
  );
}

export async function getAdminPaymentById(
  paymentId: string,
): Promise<AdminPaymentDetailsResponse> {
  return apiClient<AdminPaymentDetailsResponse>(
    `/payment//get-single-payment-admin/${encodeURIComponent(paymentId)}`,
    {
      method: "GET",
    },
  );
}
