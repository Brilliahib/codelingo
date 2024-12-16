import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Learning } from "@/types/learning/learning";

interface DeleteLearningPayload {
  id: string;
  token: string;
}

interface DeleteLearningResponse {
  data: Learning;
}

export const DeleteLearningHandler = async ({
  id,
  token,
}: DeleteLearningPayload): Promise<DeleteLearningResponse> => {
  const { data } = await api.delete(`/learning-paths/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useDeleteLearning = (
  options?: UseMutationOptions<
    DeleteLearningResponse,
    AxiosError<any>,
    DeleteLearningPayload
  >
) => {
  return useMutation({
    mutationFn: DeleteLearningHandler,
    ...options,
  });
};
