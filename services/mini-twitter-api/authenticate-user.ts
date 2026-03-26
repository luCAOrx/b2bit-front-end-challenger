import type { AxiosResponse } from "axios"
import { miniTwitterApi } from "."

export interface UserProperties {
  id: number
  name: string
  email: string
}

export interface LoginUserRequest {
  email: string
  password: string
}

export interface LoginUserResponse {
  token: string
  user: UserProperties
}

export async function loginUser({
  email,
  password,
}: LoginUserRequest): Promise<AxiosResponse<LoginUserResponse>> {
  return await miniTwitterApi.post("/auth/login", { email, password })
}
