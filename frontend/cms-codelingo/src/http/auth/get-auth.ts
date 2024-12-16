import { api } from "@/lib/axios";
import { Auth } from "@/types/auth/auth";

export const getAuthApiHandler = async (token: string): Promise<Auth> => {
  const { data } = await api.get<Auth>("/auth/get-auth", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};
