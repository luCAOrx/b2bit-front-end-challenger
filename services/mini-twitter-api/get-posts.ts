import { miniTwitterApi } from "."

export interface PostProperties {
  id: number
  title: string
  content: string
  image: string
  authorId: number
  createdAt: string
  authorName: string
  likesCount: number
}

export interface GetPostsQueryParams {
  page?: number
  search?: string
}

export interface GetPostsResponse {
  posts: PostProperties[]
  total: number
  page: number
  limit: number
}

export async function getPosts({
  page = 1,
  search = "",
}: GetPostsQueryParams): Promise<GetPostsResponse> {
  const response = await miniTwitterApi.get(
    `/posts/?page=${page}&search=${search}`
  )

  const data = response.data

  return data
}
