import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Quiz } from "@/types/quiz/quiz";

interface GetAllQuizResponse {
  data: Quiz[];
}

export const getAllQuizAdminHandler = async (
  token: string
): Promise<GetAllQuizResponse> => {
  const { data } = await api.get<GetAllQuizResponse>("/quizzes", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllQuizAdmin = (
  token: string,
  options?: Partial<UseQueryOptions<GetAllQuizResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["quizzes-list"],
    queryFn: () => getAllQuizAdminHandler(token),
    ...options,
  });
};
