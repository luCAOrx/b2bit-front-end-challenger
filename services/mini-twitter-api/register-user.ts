import type { AxiosResponse } from "axios"
import { miniTwitterApi } from "."

export interface RegisterUserProperties {
  name: string
  email: string
  password: string
}

export interface RegisterUserResponse {
  id: number
  name: string
  email: string
}

export interface RegisterUserResponseError {
  error: string
}

export async function registerUser({
  name,
  email,
  password,
}: RegisterUserProperties): Promise<AxiosResponse<RegisterUserResponse>> {
  return await miniTwitterApi.post("/auth/register", { name, email, password })
}
