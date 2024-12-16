import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { LearningDetail } from "@/types/learning/learning";

interface GetLearningPathDetailParams {
  id: number;
  token: string;
}

interface GetLearningPathDetailResponse {
  data: LearningDetail;
}

export const getLearningPathDetailHandler = async ({
  id,
  token,
}: GetLearningPathDetailParams): Promise<GetLearningPathDetailResponse> => {
  const { data } = await api.get<GetLearningPathDetailResponse>(
    `/learning-paths/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetLearningPathDetail = (
  { id, token }: GetLearningPathDetailParams,
  options?: Partial<UseQueryOptions<GetLearningPathDetailResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["learning-path-detail"],
    queryFn: () => getLearningPathDetailHandler({ id, token }),
    ...options,
  });
};
