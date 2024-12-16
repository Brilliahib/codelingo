import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { SubmitQuestionType } from "@/validators/quiz/submit-question-validator";
import { SubmitQuestionResult } from "@/types/quiz/quiz";

interface SubmitQuestionParams {
  id: string;
  token: string;
}

interface SubmitQuestionResponse {
  data: SubmitQuestionResult;
}

export const addSubmitQuestionHandler = async (
  body: SubmitQuestionType,
  { id, token }: SubmitQuestionParams
): Promise<SubmitQuestionResponse> => {
  const { data } = await api.post(`/questions/submit/${id}`, body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const useAddSubmitQuestion = (
  id: string,
  options?: UseMutationOptions<
    SubmitQuestionResponse,
    AxiosError<any>,
    SubmitQuestionType
  >
) => {
  const { data: session } = useSession();

  return useMutation({
    mutationFn: (body: SubmitQuestionType) => {
      const token = session?.access_token as string;
      return addSubmitQuestionHandler(body, { id, token });
    },
    ...options,
  });
};
