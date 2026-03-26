import { createFileRoute } from "@tanstack/react-router"
import { HomePage } from "@/pages/home-page"

export type PostSearch = {
  pesquisa?: string
}

export const Route = createFileRoute("/")({
  component: HomePage,
  head: () => ({
    meta: [
      {
        title: "Início",
      },
    ],
  }),
  validateSearch: (search: PostSearch): PostSearch => {
    return {
      pesquisa: search.pesquisa,
    }
  },
})
