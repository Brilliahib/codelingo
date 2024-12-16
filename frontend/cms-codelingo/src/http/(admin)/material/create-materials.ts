import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { api } from "@/lib/axios";
import { useSession } from "next-auth/react";
import { Material } from "@/types/material/material";
import { MaterialType } from "@/validators/admin/materials/material-validator";

interface MaterialsResponse {
  data: Material;
}

export const addMaterialHandler = async (
  body: MaterialType,
  token: string
): Promise<MaterialsResponse> => {
  const formData = new FormData();

  formData.append("learning_path_id", body.learning_path_id);
  formData.append("title", body.title);
  formData.append("material_text", body.material_text);

  if (body.material_image) {
    formData.append("material_image", body.material_image);
  }

  const { data } = await api.post("/materials", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const useAddMaterial = (
  options?: UseMutationOptions<MaterialsResponse, AxiosError<any>, MaterialType>
) => {
  const { data: sessionData } = useSession();
  return useMutation({
    mutationFn: (body: MaterialType) =>
      addMaterialHandler(body, sessionData?.access_token as string),
    ...options,
  });
};
