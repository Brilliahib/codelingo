import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Material } from "@/types/material/material";

interface GetAllMaterialParams {
  id: number;
  token: string;
}

interface GetAllMaterialResponse {
  data: Material[];
}

export const getAllMaterialHandler = async ({
  id,
  token,
}: GetAllMaterialParams): Promise<GetAllMaterialResponse> => {
  const { data } = await api.get<GetAllMaterialResponse>(`/materials/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllMaterial = (
  { id, token }: GetAllMaterialParams,
  options?: Partial<UseQueryOptions<GetAllMaterialResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["material-list"],
    queryFn: () => getAllMaterialHandler({ id, token }),
    ...options,
  });
};
