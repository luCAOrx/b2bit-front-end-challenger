import { z } from "zod"

export const RegisterUserFormSchema = z.object({
  name: z.string().min(2, {
    message: "O nome deve ter mais do que 1 letra.",
  }),
  email: z.email({ message: "O e-mail deve ter formato de e-mail." }),
  password: z
    .string()
    .min(4, { message: "A senha deve ter mais do que 3 caracteres." }),
})
