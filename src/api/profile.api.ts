
import apiClient from "@/lib/apiClient";
import type {
  MerchantProfile,
  ProfileApiResponse,
  ProfileUser,
  UpdateMerchantProfilePayload,
  UpdateRiderProfilePayload,
  RiderProfile,
} from "@/types/profile.types";

export function updateProfileImage(file: File) {
  const body = new FormData();

  body.append("profileImage", file);  

  return apiClient<ProfileApiResponse<ProfileUser>>(
    "/user/profile-image",
    {
      method: "PATCH",
      body,
    },
  );
}


export function updateMerchantProfile(
  payload: UpdateMerchantProfilePayload,
) {
  return apiClient<ProfileApiResponse<MerchantProfile>>(
    "/user/merchant-profile",
    {
      method: "PATCH",
      body: payload,
    },
  );
}

export function updateRiderProfile(
  payload: UpdateRiderProfilePayload,
) {
  return apiClient<ProfileApiResponse<RiderProfile>>(
    "/rider/update-rider-profile",
    {
      method: "PATCH",
      body: payload,
    },
  );
}