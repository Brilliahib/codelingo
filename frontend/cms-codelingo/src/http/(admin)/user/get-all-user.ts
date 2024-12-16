import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { User } from "@/types/user/user";

interface GetAllUserResponse {
  data: User[];
}

export const getAllUserHandler = async (
  token: string
): Promise<GetAllUserResponse> => {
  const { data } = await api.get<GetAllUserResponse>("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useGetAllUser = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllUserResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["learning-path-list"],
    queryFn: () => getAllUserHandler(token),
    ...options,
  });
};
