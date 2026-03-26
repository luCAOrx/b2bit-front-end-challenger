import type { AxiosResponse } from "axios"
import { miniTwitterApi } from "."

interface LogoutUserRequest {
  authorization: string
}

interface LogoutUserResponse {
  success: boolean
  message: string
}

export async function logoutUser({
  authorization,
}: LogoutUserRequest): Promise<AxiosResponse<LogoutUserResponse>> {
  return await miniTwitterApi.post(
    "/auth/logout",
    {},
    {
      headers: {
        Authorization: authorization,
      },
    }
  )
}
