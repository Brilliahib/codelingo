import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";
import { Material } from "@/types/material/material";

interface GetAllQuestionParams {
  id: string;
  token: string;
}

interface GetAllQuestionResponse {
  data: Material[];
}

export const getAllQuestionHandler = async ({
  id,
  token,
}: GetAllQuestionParams): Promise<GetAllQuestionResponse> => {
  const { data } = await api.get<GetAllQuestionResponse>(`/questions/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useGetAllQuestion = (
  { id, token }: GetAllQuestionParams,
  options?: Partial<UseQueryOptions<GetAllQuestionResponse, AxiosError>>
) => {
  return useQuery({
    queryKey: ["question-list"],
    queryFn: () => getAllQuestionHandler({ id, token }),
    ...options,
  });
};
