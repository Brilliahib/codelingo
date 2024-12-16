import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { LeaderboardPlayer } from "@/types/leaderboard/leaderboard";

interface LeaderboardResponse {
  statusCode: number;
  message: string;
  data: LeaderboardPlayer[];
}

export const fetchLeaderboard = async (
  league: string,
  token: string
): Promise<LeaderboardPlayer[]> => {
  const { data } = await api.get<LeaderboardResponse>(
    `/leaderboard/${league}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return data.data;
};

export const useLeaderboard = (
  league: string,
  token: string,
  options?: Partial<UseQueryOptions<LeaderboardPlayer[], AxiosError>>
) => {
  return useQuery({
    queryKey: ["leaderboard", league],
    queryFn: () => fetchLeaderboard(league, token),
    ...options,
  });
};
