import { z } from "zod";

export const questionSchema = z.object({
  quiz_id: z.string().min(1, { message: "Quiz ID wajib diisi" }),
  question_text: z
    .string()
    .min(1, { message: "Pertanyaan wajib diisi" })
    .max(255, { message: "Pertanyaan maksimal 255 karakter" }),
  question_image: z
    .union([
      z.string().nullable().optional(),
      z
        .instanceof(File)
        .refine(
          (file) =>
            ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(
              file.type
            ),
          { message: "Gambar harus berformat jpeg, png, jpg, atau gif" }
        ),
    ])
    .optional(),
  explanation_text: z
    .string()
    .min(1, { message: "Pertanyaan wajib diisi" })
    .max(255, { message: "Pertanyaan maksimal 255 karakter" }),
  explanation_image: z
    .union([
      z.string().nullable().optional(),
      z
        .instanceof(File)
        .refine(
          (file) =>
            ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(
              file.type
            ),
          { message: "Gambar harus berformat jpeg, png, jpg, atau gif" }
        ),
    ])
    .optional(),
  answers: z.array(
    z.object({
      answer_text: z.string().min(1, { message: "Jawaban tidak boleh kosong" }),
      is_correct: z.coerce.boolean().transform((val) => (val ? 1 : 0)),
    })
  ),
});

export type QuestionType = z.infer<typeof questionSchema>;
