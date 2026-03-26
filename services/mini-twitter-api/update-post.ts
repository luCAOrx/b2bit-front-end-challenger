import type { AxiosResponse } from "axios"
import { miniTwitterApi } from "."

export interface UpdatePostRequest {
  content: string
  title: string
  image?: string
}

export interface UpdatePostRouteParams {
  id: number
}

export interface UpdatePostResponse {
  success: boolean
}

export interface UpdatePostResponseError {
  error: string
}

export async function updatePost(
  { id }: UpdatePostRouteParams,
  { title, content, image }: UpdatePostRequest
): Promise<AxiosResponse<UpdatePostResponse>> {
  return await miniTwitterApi.put(`/posts/${id}`, { title, content, image })
}
