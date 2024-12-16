import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Question } from "@/types/quiz/quiz";

interface GetQuestionExplanationDetailParams {
  id: string;
  token: string;
}

interface GetQuestionExplanationDetailResponse {
  data: Question;
}

export const getQuestionExplanationDetailHandler = async ({
  id,
  token,
}: GetQuestionExplanationDetailParams): Promise<GetQuestionExplanationDetailResponse> => {
  const { data } = await api.get<GetQuestionExplanationDetailResponse>(
    `/questions/detail/${id}/explanation`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const useGetQuestionExplanationDetail = (
  { id, token }: GetQuestionExplanationDetailParams,
  options?: Partial<
    UseQueryOptions<GetQuestionExplanationDetailResponse, AxiosError>
  >
) => {
  return useQuery({
    queryKey: ["question-explanation-detail"],
    queryFn: () => getQuestionExplanationDetailHandler({ id, token }),
    ...options,
  });
};
