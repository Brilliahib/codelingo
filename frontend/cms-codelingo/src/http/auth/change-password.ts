import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Auth } from "@/types/auth/auth";
import { updatePasswordType } from "@/validators/auth/change-password-validator";

interface UpdatePasswordResponse {
  data: Auth;
}

export const updatePasswordHandler = async (
  body: updatePasswordType,
  token: string
): Promise<UpdatePasswordResponse> => {
  const { data } = await api.post("/auth/change-password", body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useUpdatePassword = (
  options?: UseMutationOptions<
    UpdatePasswordResponse,
    AxiosError<any>,
    updatePasswordType
  >
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: updatePasswordType) =>
      updatePasswordHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
