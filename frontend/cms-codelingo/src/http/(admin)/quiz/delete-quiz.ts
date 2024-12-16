import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Material } from "@/types/material/material";

interface DeleteQuizPayload {
  id: string;
  token: string;
}

interface DeleteQuizResponse {
  data: Material;
}

export const deleteQuizHandler = async ({
  id,
  token,
}: DeleteQuizPayload): Promise<DeleteQuizResponse> => {
  const { data } = await api.delete(`/quizzes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useDeleteQuiz = (
  options?: UseMutationOptions<
    DeleteQuizResponse,
    AxiosError<any>,
    DeleteQuizPayload
  >
) => {
  return useMutation({
    mutationFn: deleteQuizHandler,
    ...options,
  });
};
