import { PageNotFound } from "@/components/page-not-found/page-not-found"
import {
  HeadContent,
  Outlet,
  createRootRouteWithContext,
} from "@tanstack/react-router"

import type { AuthContextData } from "@/contexts/auth/auth-context"

interface MyRouterContext {
  auth: AuthContextData
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <HeadContent />
      <Outlet />
    </>
  ),
  notFoundComponent: () => <PageNotFound />,
})
