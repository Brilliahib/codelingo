import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";

type Answer = {
  id: string;
  question_id: string;
  answer_text: string;
  is_correct: number;
  created_at: string;
  updated_at: string;
};

type Question = {
  id: string;
  quiz_id: string;
  question_text: string;
  question_image: string | null;
  explanation_text: string;
  explanation_image: string;
  created_at: string;
  updated_at: string;
  answers: Answer[];
};

type GetQuestionsResponse = {
  statusCode: number;
  message: string;
  data: Question[];
};

export const getQuestionsHandler = async (
  token: string,
  quizId: string
): Promise<GetQuestionsResponse> => {
  try {
    const { data } = await api.get<GetQuestionsResponse>(
      `/questions/${quizId}/explanation`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const useGetQuestions = (
  token: string,
  quizId: string,
  options?: Partial<UseQueryOptions<GetQuestionsResponse, AxiosError>>
) => {
  return useQuery<GetQuestionsResponse, AxiosError>({
    queryKey: ["questions", quizId],
    queryFn: () => getQuestionsHandler(token, quizId),
    ...options,
  });
};
