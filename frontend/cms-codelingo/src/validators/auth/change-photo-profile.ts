import { z } from "zod";

export const updatePhotoProfileSchema = z.object({
  image: z.string().min(1, { message: "Foto profil harus diisi" }).trim(),
});

export type UpdatePhotoProfileType = z.infer<typeof updatePhotoProfileSchema>;
