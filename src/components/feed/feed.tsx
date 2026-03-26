import { Post } from "@/components/feed/post"
import InfiniteScroll from "@/components/infinite-scroll"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Route } from "@/routes/index.route"
import {
  getPosts,
  type GetPostsResponse,
} from "@services/mini-twitter-api/get-posts"
import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"

export function Feed() {
  const oneMinute = 1000 * 60

  const { pesquisa } = Route.useSearch()
  const { auth } = Route.useRouteContext()

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useInfiniteQuery<GetPostsResponse>({
      queryKey: ["get-posts", `search-${pesquisa}`],
      queryFn: ({ pageParam = 1 }) =>
        getPosts({ page: Number(pageParam), search: pesquisa }),
      staleTime: oneMinute,
      placeholderData: keepPreviousData,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.posts.length === 10 ? allPages.length + 1 : undefined
      },
      initialPageParam: 1,
    })

  const posts = data?.pages.flatMap((page) => page.posts) ?? []
  const noResultsFound = !isPending && posts.length === 0

  return (
    <div className="flex min-h-screen flex-col">
      <Post.Root>
        {!auth.isAuthenticated ? <></> : <Post.Input />}
        {noResultsFound ? (
          <h1 className="text-md align-middle leading-5 font-normal tracking-normal not-dark:text-text-secondary-foreground">
            Nenhum resultado encontrado.
          </h1>
        ) : (
          <ScrollArea
            aria-label="Área de rolagem dos posts"
            className="h-218 w-160 bg-transparent"
            isScrollbarTransparent
          >
            {posts.map((post) => (
              <Post.Content key={post.id} {...post} />
            ))}

            <div className="flex justify-center">
              <InfiniteScroll
                hasMore={hasNextPage}
                isLoading={isFetchingNextPage}
                next={fetchNextPage}
                threshold={1}
              >
                {hasNextPage && (
                  <Loader2 className="mx-20 my-4 h-8 w-8 animate-spin" />
                )}
              </InfiniteScroll>
            </div>
          </ScrollArea>
        )}
      </Post.Root>
    </div>
  )
}
