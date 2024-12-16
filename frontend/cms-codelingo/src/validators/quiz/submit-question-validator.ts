import { z } from "zod";

export const submitQuestionValidator = z.object({
  user_id: z
    .number({ invalid_type_error: "User ID harus berupa angka" })
    .min(1, { message: "User ID harus diisi dan lebih besar dari 0" }),
  answer_id: z
    .string({ invalid_type_error: "Answer ID harus berupa string" })
    .min(1, { message: "Answer ID harus diisi" }),
});

export type SubmitQuestionType = z.infer<typeof submitQuestionValidator>;
