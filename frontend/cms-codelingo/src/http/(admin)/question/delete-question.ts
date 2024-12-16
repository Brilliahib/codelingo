import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Material } from "@/types/material/material";

interface DeleteQuestionPayload {
  id: string;
  token: string;
}

interface DeleteQuestionResponse {
  data: Material;
}

export const deleteQuestionHandler = async ({
  id,
  token,
}: DeleteQuestionPayload): Promise<DeleteQuestionResponse> => {
  const { data } = await api.delete(`/questions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useDeleteQuestion = (
  options?: UseMutationOptions<
    DeleteQuestionResponse,
    AxiosError<any>,
    DeleteQuestionPayload
  >
) => {
  return useMutation({
    mutationFn: deleteQuestionHandler,
    ...options,
  });
};
