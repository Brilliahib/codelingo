import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { QuizzesType } from "@/validators/admin/quiz/quiz-validator";
import { Quiz } from "@/types/quiz/quiz";

interface QuizzesResponse {
  data: Quiz;
}

export const addQuizzesHandler = async (
  body: QuizzesType,
  token: string
): Promise<QuizzesResponse> => {
  const { data } = await api.post("/quizzes", body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const useAddQuizzes = (
  options?: UseMutationOptions<QuizzesResponse, AxiosError<any>, QuizzesType>
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: QuizzesType) =>
      addQuizzesHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
