import { z } from "zod";

export const quizzesSchema = z.object({
  learning_path_id: z
    .string()
    .min(1, { message: "Learning path id wajib diisi" }),
  title: z.string().min(1, { message: "Judul quiz wajib diisi" }).trim(),
  description: z
    .string()
    .min(1, { message: "Deskripsi description wajib diisi" }),
});

export type QuizzesType = z.infer<typeof quizzesSchema>;
