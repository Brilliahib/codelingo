import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { api } from "@/lib/axios";

import { RegisterType } from "@/validators/auth/register-validator";

interface User {
  id: number;
  email: string;
  name: string;
}

interface RegisterResponse {
  user: User;
  token: string;
}

export const registerApiHandler = async (
  body: RegisterType
): Promise<RegisterResponse> => {
  const { data } = await api.post("/auth/register", body);
  return data;
};

export const useRegister = (
  options?: UseMutationOptions<RegisterResponse, AxiosError<any>, RegisterType>
) => {
  return useMutation({ mutationFn: registerApiHandler, ...options });
};
