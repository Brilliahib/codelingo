import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Material } from "@/types/material/material";

interface MaterialResponse {
  data: Material;
}

export const MarkCompleteMaterialHandler = async (
  id: string,
  token: string
): Promise<MaterialResponse> => {
  const { data } = await api.post(`/materials/${id}/submit`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useMarkCompleteMaterial = (
  options?: UseMutationOptions<MaterialResponse, AxiosError<any>, string>
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (id: string) =>
      MarkCompleteMaterialHandler(id, sessionData?.access_token as string),
    ...options,
  });
};
