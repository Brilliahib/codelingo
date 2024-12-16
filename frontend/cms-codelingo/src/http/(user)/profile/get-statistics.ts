import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { Statistics } from "@/types/user/user-statistics";

interface GetStatisticsResponse {
  statusCode: number;
  message: string;
  data: Statistics;
}

export const getStatisticsHandler = async (
  token: string
): Promise<GetStatisticsResponse> => {
  const { data } = await api.get<GetStatisticsResponse>("/users/league/rank", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetStatistics = (
  token: string,
  options?: Partial<UseQueryOptions<GetStatisticsResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["user-statistics"],
    queryFn: () => getStatisticsHandler(token),
    ...options,
  });
};
