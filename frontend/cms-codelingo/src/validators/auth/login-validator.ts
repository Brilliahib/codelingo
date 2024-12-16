import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email harus diisi" }).trim(),
  password: z.string().min(1, { message: "Password harus diisi" }),
});

export type LoginType = z.infer<typeof loginSchema>;
