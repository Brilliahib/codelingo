import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Material } from "@/types/material/material";

interface GetMaterialDetailParams {
  id: string;
  token: string;
}

interface GetMaterialDetailResponse {
  data: Material;
}

export const getMaterialDetailHandler = async ({
  id,
  token,
}: GetMaterialDetailParams): Promise<GetMaterialDetailResponse> => {
  const { data } = await api.get<GetMaterialDetailResponse>(
    `/materials/detail/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetMaterialDetail = (
  { id, token }: GetMaterialDetailParams,
  options?: Partial<UseQueryOptions<GetMaterialDetailResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["material-detail"],
    queryFn: () => getMaterialDetailHandler({ id, token }),
    ...options,
  });
};
