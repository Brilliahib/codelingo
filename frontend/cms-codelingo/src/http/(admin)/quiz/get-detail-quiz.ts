import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Quiz } from "@/types/quiz/quiz";

interface GetDetailQuizParams {
  id: string;
  token: string;
}

interface GetDetailQuizResponse {
  data: Quiz;
}

export const getDetailQuizHandler = async ({
  id,
  token,
}: GetDetailQuizParams): Promise<GetDetailQuizResponse> => {
  const { data } = await api.get<GetDetailQuizResponse>(
    `/quizzes/detail/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetDetailQuiz = (
  { id, token }: GetDetailQuizParams,
  options?: Partial<UseQueryOptions<GetDetailQuizResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["quizzes-detail"],
    queryFn: () => getDetailQuizHandler({ id, token }),
    ...options,
  });
};
