import { z } from "zod"

export const LoginUserFormSchema = z.object({
  email: z.email({ message: "O e-mail deve ter formato de e-mail." }),
  password: z
    .string()
    .min(4, { message: "A senha deve ter mais do que 3 caracteres." }),
})
