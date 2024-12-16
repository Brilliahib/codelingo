import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Auth } from "@/types/auth/auth";
import { UpdatePhotoProfileType } from "@/validators/auth/change-photo-profile";

interface UpdatePhotoProfileResponse {
  data: Auth;
}

export const updatePhotoProfileHandler = async (
  body: UpdatePhotoProfileType,
  token: string
): Promise<UpdatePhotoProfileResponse> => {
  const { data } = await api.post("/auth/update-photo", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useUpdatePhotoProfile = (
  options?: UseMutationOptions<
    UpdatePhotoProfileResponse,
    AxiosError<any>,
    UpdatePhotoProfileType
  >
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: UpdatePhotoProfileType) =>
      updatePhotoProfileHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
