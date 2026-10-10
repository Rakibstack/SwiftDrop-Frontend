

"use client";

import { deleteAdminUser, getAdminUserById, getAdminUsers } from "@/api/users.api";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";


const ADMIN_USERS_QUERY_KEY = ["admin-users"];
const ADMIN_USER_QUERY_KEY = ["admin-user"];

export function useAdminUsers(page = 1, limit = 10) {
  return useQuery({
    queryKey: [...ADMIN_USERS_QUERY_KEY, page, limit],
    queryFn: () => getAdminUsers({ page, limit }),
  });
}

export function useAdminUserDetails(userId: string) {
  return useQuery({
    queryKey: [...ADMIN_USER_QUERY_KEY, userId],
    queryFn: () => getAdminUserById(userId),
    enabled: Boolean(userId),
  });
}

export function useDeleteAdminUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAdminUser,
    onSuccess: async (_, userId) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ADMIN_USERS_QUERY_KEY,
        }),
        queryClient.removeQueries({
          queryKey: [...ADMIN_USER_QUERY_KEY, userId],
        }),
      ]);
    },
  });
}
