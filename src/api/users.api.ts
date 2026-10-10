import apiClient from "@/lib/apiClient";
import { ApiResponse } from "@/types";
import { AdminUserDetailsResponse, AdminUsersResponse } from "@/types/admin-user.types";


const USER_ENDPOINT = "/user";

export interface GetAdminUsersParams {
  page?: number;
  limit?: number;
}

export async function getAdminUsers(
  params: GetAdminUsersParams = {},
): Promise<AdminUsersResponse> {
  return apiClient<AdminUsersResponse>(
    `${USER_ENDPOINT}/get-all-users`,
    {
      method: "GET",
      query: {
        page: params.page ?? 1,
        limit: params.limit ?? 10,
      },
    },
  );
}

export async function getAdminUserById(
  userId: string,
): Promise<AdminUserDetailsResponse> {
  return apiClient<AdminUserDetailsResponse>(
    `${USER_ENDPOINT}/get-single-user/${userId}`,
    {
      method: "GET",
    },
  );
}

export async function deleteAdminUser(
  userId: string,
): Promise<ApiResponse<unknown>> {
  return apiClient<ApiResponse<unknown>>(
    `${USER_ENDPOINT}/delete-user/${userId}`,
    {
      method: "PATCH",
    },
  );
}
