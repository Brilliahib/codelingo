import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Question } from "@/types/quiz/quiz";

interface GetQuestionDetailParams {
  id: string;
  token: string;
}

interface GetQuestionDetailResponse {
  data: Question;
}

export const getQuestionDetailHandler = async ({
  id,
  token,
}: GetQuestionDetailParams): Promise<GetQuestionDetailResponse> => {
  const { data } = await api.get<GetQuestionDetailResponse>(
    `/questions/detail/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetQuestionDetail = (
  { id, token }: GetQuestionDetailParams,
  options?: Partial<UseQueryOptions<GetQuestionDetailResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["question-detail"],
    queryFn: () => getQuestionDetailHandler({ id, token }),
    ...options,
  });
};
