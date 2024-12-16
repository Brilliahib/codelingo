import { api } from "@/lib/axios";

import { LoginType } from "@/validators/auth/login-validator";

interface LoginResponse {
  token: string;
  id: string;
}

export const loginApiHandler = async (
  body: LoginType
): Promise<LoginResponse> => {
  const { data } = await api.post("/auth/login", body);
  return data;
};
