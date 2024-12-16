import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Material } from "@/types/material/material";

interface DeleteMaterialPayload {
  id: string;
  token: string;
}

interface DeleteMaterialResponse {
  data: Material;
}

export const deleteMaterialHandler = async ({
  id,
  token,
}: DeleteMaterialPayload): Promise<DeleteMaterialResponse> => {
  const { data } = await api.delete(`/materials/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useDeleteMaterial = (
  options?: UseMutationOptions<
    DeleteMaterialResponse,
    AxiosError<any>,
    DeleteMaterialPayload
  >
) => {
  return useMutation({
    mutationFn: deleteMaterialHandler,
    ...options,
  });
};
