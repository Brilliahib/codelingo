import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(1, { message: "Nama harus diisi." }).trim(),
    username: z.string().min(1, { message: "Nama harus diisi." }).trim(),
    email: z.string().min(1, { message: "Email harus diisi." }).trim(),
    password: z.string().min(1, { message: "Password harus diisi." }),
    password_confirmation: z
      .string()
      .min(1, { message: "konfirmasi password harus diisi" }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Konfirmasi password harus sama dengan password.",
    path: ["password_confirmation"],
  });

export type RegisterType = z.infer<typeof registerSchema>;
