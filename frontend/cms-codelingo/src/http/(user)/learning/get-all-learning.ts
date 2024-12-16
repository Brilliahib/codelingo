import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Learning } from "@/types/learning/learning";

interface GetAllLearningPathResponse {
  data: Learning[];
}

export const getAllLearningPathHandler = async (
  token: string
): Promise<GetAllLearningPathResponse> => {
  const { data } = await api.get<GetAllLearningPathResponse>(
    "/learning-paths",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetAllLearningPath = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllLearningPathResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["learning-path-list"],
    queryFn: () => getAllLearningPathHandler(token),
    ...options,
  });
};
