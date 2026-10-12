import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import type {
  UpdateMerchantProfilePayload,
  UpdateRiderProfilePayload,
} from "@/types/profile.types";
import {
  updateMerchantProfile,
  updateProfileImage,
  updateRiderProfile,
} from "@/api/profile.api";

export const currentUserQueryKey = ["current-user"] as const;

function getErrorMessage(error: unknown, fallback: string): string {
  return error instanceof Error ? error.message : fallback;
}

export function useUpdateProfileImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProfileImage,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: currentUserQueryKey,
      });

      toast.success("Profile image updated successfully.");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error, "Could not update profile image."));
    },
  });
}

export function useUpdateMerchantProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateMerchantProfilePayload) =>
      updateMerchantProfile(payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: currentUserQueryKey,
      });

      toast.success("Merchant profile updated successfully.");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error, "Could not update merchant profile."));
    },
  });
}

export function useUpdateRiderProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateRiderProfilePayload) =>
      updateRiderProfile(payload),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: currentUserQueryKey,
      });

      toast.success("Rider profile updated successfully.");
    },

    onError: (error) => {
      toast.error(getErrorMessage(error, "Could not update rider profile."));
    },
  });
}
