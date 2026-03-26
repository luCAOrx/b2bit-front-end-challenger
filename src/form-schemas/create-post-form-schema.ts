import { z } from "zod"

export const CreatePostFormSchema = z.object({
  title: z
    .string()
    .min(3, { message: "O titúlo deve ter mais do que 2 caracteres." }),
  content: z
    .string()
    .min(1, { message: "O post deve ter pelo menos 1 caractere." }),
  image: z.any().optional(),
})
