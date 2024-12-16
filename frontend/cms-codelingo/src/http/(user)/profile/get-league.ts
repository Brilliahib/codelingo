import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";

interface ProfileResponse {
  statusCode: number;
  message: string;
  progress: number;
  current_league: string;
  next_league: string;
}

export const fetchLeague = async (token: string): Promise<ProfileResponse> => {
  const { data } = await api.get<ProfileResponse>(`/leaderboard/next-league`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const useFetchLeague = (
  token: string,
  options?: Partial<UseQueryOptions<ProfileResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["next-league"],
    queryFn: () => fetchLeague(token),
    ...options,
  });
};
