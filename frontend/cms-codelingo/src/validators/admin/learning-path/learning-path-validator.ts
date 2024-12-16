import { z } from "zod";

export const learningPathSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Judul learning path wajib diisi" })
    .trim(),
  description: z
    .string()
    .min(1, { message: "Deskripsi learning path wajib diisi" }),
});

export type LearningPathType = z.infer<typeof learningPathSchema>;
