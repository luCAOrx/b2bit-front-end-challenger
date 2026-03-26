import type { AxiosResponse } from "axios"
import { miniTwitterApi } from "."

interface DeletePostRouteParams {
  id: number
}

interface DeletePostResponse {
  success: boolean
}

export interface DeletePostResponseError {
  error: string
}

export async function deletePost({
  id,
}: DeletePostRouteParams): Promise<AxiosResponse<DeletePostResponse>> {
  return await miniTwitterApi.delete(`/posts/${id}`)
}
