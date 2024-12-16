import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { AchievementsUser } from "@/types/user/achievements";

interface GetAchievementUserResponse {
  statusCode: number;
  message: string;
  data: AchievementsUser[];
}

export const getAchievementUserHandler = async (
  token: string
): Promise<GetAchievementUserResponse> => {
  const { data } = await api.get<GetAchievementUserResponse>(
    "/users/achievements/detail",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetAchievementUser = (
  token: string,
  options?: Partial<UseQueryOptions<GetAchievementUserResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["achievement-user"],
    queryFn: () => getAchievementUserHandler(token),
    ...options,
  });
};
