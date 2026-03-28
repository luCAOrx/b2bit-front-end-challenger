import { z } from "zod"

const FIVE_MEGA_BYTES_MAX_FILE_SIZE = 5 * 1024 * 1024
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]

export const CreatePostFormSchema = z.object({
  title: z
    .string()
    .min(3, { message: "O titúlo deve ter mais do que 2 caracteres." }),
  content: z
    .string()
    .min(1, { message: "O post deve ter pelo menos 1 caractere." }),
  image: z
    .union([z.instanceof(File), z.string(), z.null(), z.undefined()])
    .optional()
    .nullable()
    .refine(
      (value) => {
        if (!value || typeof value === "string") return true

        return value.size <= FIVE_MEGA_BYTES_MAX_FILE_SIZE
      },
      {
        message: `A imagem é muito grande. Por favor, escolha uma imagem menor que 6MB.`,
      }
    )
    .refine(
      (value) => {
        if (!value || typeof value === "string") return true

        return ACCEPTED_IMAGE_TYPES.includes(value.type)
      },
      {
        message:
          "Por favor, faça o upload de um arquivo de imagem válido (JPEG, PNG ou WebP).",
      }
    ),
})
