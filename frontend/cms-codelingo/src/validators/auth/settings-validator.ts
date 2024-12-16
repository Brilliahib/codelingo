import { z } from "zod";

export const profileSettingSchema = z.object({
  name: z.string().min(1, { message: "Nama wajib diisi" }).trim(),
  username: z.string().min(1, { message: "Username wajib diisi" }).trim(),
  email: z.string().min(1, { message: "Email wajib diisi" }).trim(),
});

export type profileSettingType = z.infer<typeof profileSettingSchema>;
