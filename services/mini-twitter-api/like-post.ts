import type { AxiosResponse } from "axios"
import { miniTwitterApi } from "."

interface LikePostRouteParams {
  id: number
}

interface LikePostResponse {
  liked: boolean
}

export interface LikePostResponseError {
  error: string
}

export async function likePost({
  id,
}: LikePostRouteParams): Promise<AxiosResponse<LikePostResponse>> {
  return await miniTwitterApi.post(`/posts/${id}/like`)
}
