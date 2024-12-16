import { z } from "zod";

export const materialSchema = z.object({
  learning_path_id: z
    .string()
    .min(1, { message: "Learning path id wajib diisi" }),
  title: z
    .string()
    .min(1, { message: "Judul materi wajib diisi" })
    .max(255, { message: "Judul materi maksimal 255 karakter" }),
  material_text: z.string().min(1, { message: "Konten materi wajib diisi" }),
  material_image: z.union([
    z.string().nullable().optional(),
    z
      .instanceof(File)
      .refine(
        (file) =>
          ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(
            file.type
          ),
        {
          message: "Gambar harus berformat jpeg, png, jpg, atau gif",
        }
      )
      .refine((file) => file.size <= 2048 * 1024, {
        message: "Ukuran gambar maksimal 2MB",
      }),
  ]),
});

export type MaterialType = z.infer<typeof materialSchema>;
