import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Material } from "@/types/material/material";
import { QuestionType } from "@/validators/admin/question/question-validator";

interface QuestionResponse {
  data: Material;
}

export const addQuestionHandler = async (
  body: QuestionType,
  token: string
): Promise<QuestionResponse> => {
  const formData = new FormData();

  formData.append("quiz_id", body.quiz_id);
  formData.append("question_text", body.question_text);
  formData.append("explanation_text", body.explanation_text);

  if (body.explanation_image) {
    formData.append("explanation_image", body.explanation_image);
  }

  if (body.question_image) {
    formData.append("question_image", body.question_image);
  }

  if (body.answers && Array.isArray(body.answers)) {
    body.answers.forEach((answer, index) => {
      Object.entries(answer).forEach(([key, value]) => {
        formData.append(`answers[${index}][${key}]`, value as string);
      });
    });
  } else {
    throw new Error("Answers must be an array.");
  }

  const { data } = await api.post("/questions", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const useAddQuestion = (
  options?: UseMutationOptions<QuestionResponse, AxiosError<any>, QuestionType>
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: QuestionType) =>
      addQuestionHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
