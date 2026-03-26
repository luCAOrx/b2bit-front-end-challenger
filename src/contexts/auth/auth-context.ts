import type { UseFormReturn } from "react-hook-form"
import { z } from "zod"
import { createContext } from "react"
import type { LoginUserFormSchema } from "@/form-schemas/login-user-form-schema"
import type { DecodedJwtUserProperties } from "./auth-provider"
import type { LoginUserRequest } from "@services/mini-twitter-api/authenticate-user"

export interface AuthContextData {
  isAuthenticated: boolean
  user: DecodedJwtUserProperties | null
  signIn: (
    { email, password }: LoginUserRequest,
    form: UseFormReturn<z.infer<typeof LoginUserFormSchema>>
  ) => Promise<void>
  signOut: () => Promise<void>
}

export const AuthContext = createContext<AuthContextData | undefined>(undefined)
