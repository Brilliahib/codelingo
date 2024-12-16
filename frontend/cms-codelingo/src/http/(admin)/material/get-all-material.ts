import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Material } from "@/types/material/material";

interface GetAllMaterialResponse {
  data: Material[];
}

export const getAllMaterialAdminHandler = async (
  token: string
): Promise<GetAllMaterialResponse> => {
  const { data } = await api.get<GetAllMaterialResponse>("/materials", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllMaterialAdmin = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllMaterialResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["materials-list"],
    queryFn: () => getAllMaterialAdminHandler(token),
    ...options,
  });
};
