import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { LearningPathType } from "@/validators/admin/learning-path/learning-path-validator";
import { Learning } from "@/types/learning/learning";

interface LearningPathResponse {
  data: Learning;
}

export const addLearningPathHandler = async (
  body: LearningPathType,
  token: string
): Promise<LearningPathResponse> => {
  const { data } = await api.post("/learning-paths", body, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const useAddLearningPath = (
  options?: UseMutationOptions<
    LearningPathResponse,
    AxiosError<any>,
    LearningPathType
  >
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: LearningPathType) =>
      addLearningPathHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
