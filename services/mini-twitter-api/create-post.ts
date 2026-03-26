import type { AxiosResponse } from "axios"
import { miniTwitterApi } from "."

export interface CreatePostRequest {
  content: string
  title: string
  image?: string
}

export interface CreatePostResponse {
  id: number
  title: string
  content: string
  image: string
  authorId: number
  createdAt: string
}

export interface CreatePostResponseError {
  error: string
}

export async function createPost({
  title,
  content,
  image,
}: CreatePostRequest): Promise<AxiosResponse<CreatePostResponse>> {
  return await miniTwitterApi.post("/posts/", { title, content, image })
}
