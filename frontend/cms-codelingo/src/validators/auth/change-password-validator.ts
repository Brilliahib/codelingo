import { z } from "zod";

export const updatePasswordSchema = z
  .object({
    current_password: z
      .string()
      .min(1, { message: "Password lama wajib diisi" })
      .trim(),
    new_password: z.string().min(1, { message: "Password baru wajib diisi." }),
    new_password_confirmation: z
      .string()
      .min(1, { message: "Konfirmasi password baru wajib diisi" }),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    message: "Konfirmasi password harus sama dengan password.",
    path: ["password_confirmation"],
  });

export type updatePasswordType = z.infer<typeof updatePasswordSchema>;
