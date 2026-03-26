import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatDateWithSlashSeparator } from "@/helpers/format-date-with-slash-separator"
import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import type { AxiosError } from "axios"
import { useState } from "react"
import SubmitLoadingButton from "@/components/submit-loading-button"
import { UpdatePostButton } from "./update-post-button"
import { Route } from "@/routes/index.route"
import type { PostProperties } from "@services/mini-twitter-api/get-posts"
import {
  likePost,
  type LikePostResponseError,
} from "@services/mini-twitter-api/like-post"
import { deletePost } from "@services/mini-twitter-api/delete-post"

interface SavedLikedPostPorperties {
  postId: number
  userId: number
  isLiked: boolean
}

export function PostContent({
  id,
  image,
  title,
  content,
  createdAt,
  authorName,
  likesCount,
  authorId,
}: PostProperties) {
  const { auth } = Route.useRouteContext()

  const [isSubmittingDeletePost, setIsSubmittingDeletePost] =
    useState<boolean>(false)
  const [isSubmittingLikePost, setIsSubmittingLikePost] =
    useState<boolean>(false)

  const savedLikedPosts = localStorage.getItem("@mini-twitter:likedPosts")

  const [like, setLike] = useState<boolean>(() => {
    if (!savedLikedPosts) return false

    try {
      const likedPosts: SavedLikedPostPorperties[] = JSON.parse(savedLikedPosts)

      return likedPosts.some(
        ({ postId, userId, isLiked }) =>
          postId === id && userId === Number(auth.user?.id) && isLiked === true
      )
    } catch (error) {
      return false
    }
  })

  const queryClient = useQueryClient()

  const isValidImage =
    typeof image === "string" &&
    (image.startsWith("data:image/") || image.startsWith("http"))

  function formatAuthorNameToUserName({
    authorName,
  }: {
    authorName: string
  }): string {
    return `@${authorName.split(" ").join("").toLowerCase()}`
  }

  async function handleLikePost() {
    if (!auth.isAuthenticated) return

    setLike(!like)
    setIsSubmittingLikePost(true)

    await likePost({ id })
      .then((response) => {
        const { liked } = response.data

        let likedPosts: SavedLikedPostPorperties[] = savedLikedPosts
          ? JSON.parse(savedLikedPosts)
          : []

        likedPosts = likedPosts.filter(({ postId }) => postId !== id)

        if (liked === true) {
          likedPosts.push({
            postId: id,
            userId: Number(auth.user?.id),
            isLiked: true,
          })
        }

        localStorage.setItem(
          "@mini-twitter:likedPosts",
          JSON.stringify(likedPosts)
        )

        queryClient.invalidateQueries({
          queryKey: ["get-posts"],
        })

        setIsSubmittingLikePost(false)
      })
      .catch((error: AxiosError<LikePostResponseError>) => {
        toast.error("Erro ao curtir o post.", {
          description: error.response?.data.error,
          position: "bottom-center",
          classNames: {
            error:
              "!bg-red-500 !text-white !rounded-[8px] !w-72 !h-16 !border-red-700 !text-[14px] !align-middle !text-base !leading-6 !font-normal !tracking-normal",
          },
        })
      })
  }

  async function handleDeletePost() {
    if (!auth.isAuthenticated && Number(auth.user?.id) !== authorId) return

    setIsSubmittingDeletePost(true)

    await deletePost({ id })
      .then(() => {
        if (savedLikedPosts) {
          const likedPosts: { postId: number; isLiked: boolean }[] =
            JSON.parse(savedLikedPosts)

          const updateLikedPosts = likedPosts.filter(
            ({ postId }) => postId !== id
          )

          localStorage.setItem(
            "@mini-twitter:likedPosts",
            JSON.stringify(updateLikedPosts)
          )
        }

        toast.success("Post deletado com sucesso!", {
          position: "bottom-right",
          classNames: {
            success:
              "!bg-emerald-700 !text-white !rounded-[8px] !w-72 !h-16 !border-emerald-800 !text-[14px] !align-middle !text-base !leading-6 !font-normal !tracking-normal",
          },
        })

        queryClient.invalidateQueries({
          queryKey: ["get-posts"],
        })

        setIsSubmittingDeletePost(false)
      })
      .catch((error: AxiosError<LikePostResponseError>) => {
        toast.error("Erro ao excluir o post.", {
          description: error.response?.data.error,
          position: "bottom-center",
          classNames: {
            error:
              "!bg-red-500 !text-white !rounded-[8px] !w-72 !h-16 !border-red-700 !text-[14px] !align-middle !text-base !leading-6 !font-normal !tracking-normal",
          },
        })
      })
  }

  return (
    <div className="mb-8 h-auto w-160 rounded-[12px] border border-solid bg-input-background p-4 not-dark:shadow-md">
      <header className="mb-3 flex h-6 w-fit items-center justify-between gap-1.5">
        <h1 className="align-middle text-[16px] leading-6 font-bold not-dark:text-[#314158]">
          {authorName}
        </h1>
        <h2 className="align-middle text-[14px] leading-5 font-normal text-text-secondary">
          {formatAuthorNameToUserName({ authorName })}
        </h2>
        <span className="text-text-secondary">-</span>
        <h2 className="align-middle text-[14px] leading-5 font-normal text-text-secondary">
          {formatDateWithSlashSeparator({ createdAt })}
        </h2>
      </header>
      <main className="flex h-full w-151.5 flex-col gap-3">
        <div className="flex flex-col gap-6">
          <header className="h-1.75 w-151.5">
            <h1 className="align-middle text-lg leading-7 font-bold tracking-normal not-dark:text-[#314158]">
              {title}
            </h1>
          </header>
          <p className="align-middle text-base leading-6.5 font-normal tracking-normal break-all text-text-secondary-foreground not-dark:text-[#314158]">
            {content}
          </p>
        </div>
        {isValidImage && (
          <img
            src={image}
            alt={`uploaded-image`}
            className="flex aspect-video h-50 w-151.5 rounded-[8px] object-cover"
            onError={(e) => {
              ;(e.target as HTMLImageElement).src =
                "./../../../assets/fallback-image.png"
            }}
          />
        )}
        <footer className="mt-2 flex h-6 w-151.5 items-center justify-between gap-2 pr-[0.02px]">
          <div className="flex gap-2">
            <SubmitLoadingButton
              size="icon"
              isSubmitting={isSubmittingLikePost}
              onClick={handleLikePost}
              className="ml-0 h-6 min-h-6 w-6 min-w-6 cursor-pointer bg-transparent p-0"
            >
              <Heart
                className={cn(
                  "h-6 min-h-6 w-6 min-w-6 text-like",
                  like && "fill-like"
                )}
              />
            </SubmitLoadingButton>
            {likesCount > 0 && (
              <span className="text-text-primary not-dark:text-[#314158]">
                {likesCount}
              </span>
            )}
          </div>

          {Number(auth.user?.id) === authorId && (
            <div className="flex gap-2">
              <UpdatePostButton
                postId={id}
                image={image}
                content={content}
                title={title}
              />
              <SubmitLoadingButton
                size="icon"
                isSubmitting={isSubmittingDeletePost}
                onClick={handleDeletePost}
                className="flex h-9 min-h-9 w-auto min-w-auto cursor-pointer justify-between rounded-full bg-like px-5 py-2 text-center align-middle text-sm leading-5 font-bold tracking-normal text-white hover:bg-like/80 hover:text-[#E2E2EC]/80"
              >
                Excluir
              </SubmitLoadingButton>
            </div>
          )}
        </footer>
      </main>
    </div>
  )
}
