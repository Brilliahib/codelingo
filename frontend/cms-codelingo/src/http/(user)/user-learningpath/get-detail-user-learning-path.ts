import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { UserLearningPath } from "@/types/user-learning-path/user-learning-path";

interface GetUserLearningPathDetailParams {
  id: number;
  token: string;
}

interface GetUserLearningPathDetailResponse {
  data: UserLearningPath;
}

export const getUserLearningPathDetailHandler = async ({
  id,
  token,
}: GetUserLearningPathDetailParams): Promise<GetUserLearningPathDetailResponse> => {
  const { data } = await api.get<GetUserLearningPathDetailResponse>(
    `/user-learning-path/detail/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetUserLearningPathDetail = (
  { id, token }: GetUserLearningPathDetailParams,
  options?: Partial<
    UseQueryOptions<GetUserLearningPathDetailResponse, AxiosError>
  >
) => {
  return useQuery({
    queryKey: ["learning-path-detail"],
    queryFn: () => getUserLearningPathDetailHandler({ id, token }),
    ...options,
  });
};
