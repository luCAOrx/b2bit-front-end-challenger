import { router } from "@/router"
import type { AxiosError } from "axios"
import { useEffect, useState, type ReactNode } from "react"
import type { UseFormReturn } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"
import { jwtDecode } from "jwt-decode"
import type { LoginUserFormSchema } from "@/form-schemas/login-user-form-schema"
import { AuthContext } from "./auth-context"
import {
  loginUser,
  type LoginUserRequest,
} from "@services/mini-twitter-api/authenticate-user"
import { miniTwitterApi } from "@services/mini-twitter-api"
import type { RegisterUserResponseError } from "@services/mini-twitter-api/register-user"
import { logoutUser } from "@services/mini-twitter-api/logout-user"

export interface DecodedJwtUserProperties {
  id: number
  name: string
}

interface JwtDecodedTokenPorperties {
  sub: string
  name: string
  iat: number
}

type AuthProvider = {
  children: ReactNode
}

export function AuthProvider(props: AuthProvider) {
  const [user, setUser] = useState<DecodedJwtUserProperties | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  async function signIn(
    { email, password }: LoginUserRequest,
    form: UseFormReturn<z.infer<typeof LoginUserFormSchema>>
  ) {
    await loginUser({ email, password })
      .then((response) => {
        form.reset()

        const { token, user } = response.data

        localStorage.setItem("@mini-twitter:token", token)

        miniTwitterApi.defaults.headers.common.Authorization = `Beare ${token}`

        setUser(user)
        setIsAuthenticated(true)
      })
      .catch((error: AxiosError<RegisterUserResponseError>) => {
        form.setError("email", {
          message: error.response?.data.error,
        })

        form.setError("password", {
          message: error.response?.data.error,
        })
      })
  }

  async function signOut() {
    const token = localStorage.getItem("@mini-twitter:token")

    await logoutUser({ authorization: String(token) })
      .then(() => {
        setUser(null)
        setIsAuthenticated(false)

        localStorage.removeItem("@mini-twitter:token")
        localStorage.removeItem("@mini-twitter:likedPosts")

        toast.success("Você foi deslogado(a) da sessão.", {
          position: "bottom-right",
          classNames: {
            success:
              "!bg-emerald-700 !text-white !rounded-[8px] !w-72 !h-16 !border-emerald-800 !text-[14px] !align-middle !text-base !leading-6 !font-normal !tracking-normal",
          },
        })

        router.navigate({ to: "/" })
      })
      .catch((error: AxiosError<RegisterUserResponseError>) => {
        toast.error("Erro ao se deslogar da sessão.", {
          description: error.response?.data.error,
          position: "bottom-right",
          classNames: {
            error:
              "!bg-red-500 !text-white !rounded-[8px] !w-72 !h-16 !border-red-700 !text-[14px] !align-middle !text-base !leading-6 !font-normal !tracking-normal",
          },
        })
      })
  }

  useEffect(() => {
    const token = localStorage.getItem("@mini-twitter:token")

    if (token) {
      ;(() => {
        const decodedJwt = jwtDecode<JwtDecodedTokenPorperties>(token)
        const userData: DecodedJwtUserProperties = {
          id: Number(decodedJwt.sub),
          name: decodedJwt.name,
        }

        setUser(userData)
        setIsAuthenticated(true)

        miniTwitterApi.defaults.headers.common.Authorization = `Beare ${token}`
      })()
    }
  }, [])

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut }}>
      {props.children}
    </AuthContext.Provider>
  )
}
