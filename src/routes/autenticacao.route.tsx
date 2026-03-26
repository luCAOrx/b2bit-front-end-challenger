import { createFileRoute, redirect } from "@tanstack/react-router"

import { AuthenticationPage } from "@/pages/authentication-page"

export interface AuthenticationRouteSearchTab {
  guia?: "login" | "cadastrar"
}

export const Route = createFileRoute("/autenticacao")({
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: "/" })
    }
  },
  component: AuthenticationPage,
  validateSearch: (
    search: AuthenticationRouteSearchTab
  ): AuthenticationRouteSearchTab => {
    return {
      guia: (search.guia as "login" | "cadastrar") || "login",
    }
  },
  head: () => ({
    meta: [
      {
        title: "Autenticação",
      },
    ],
  }),
})
