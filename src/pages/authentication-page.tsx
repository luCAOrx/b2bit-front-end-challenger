import { useNavigate } from "@tanstack/react-router"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Login } from "@/components/auth/login"
import { Register } from "@/components/auth/register"
import {
  Route,
  type AuthenticationRouteSearchTab,
} from "@/routes/autenticacao.route"

export function AuthenticationPage() {
  const navigate = useNavigate({ from: Route.fullPath })

  const { guia } = Route.useSearch()

  return (
    <main className="flex min-h-svh items-center justify-center">
      <div className="flex h-135 flex-col items-center gap-14">
        <header className="align-middle text-[40px] leading-[1.2] font-bold tracking-[-0.27px]">
          Mini Twitter
        </header>
        <Tabs
          value={guia}
          onValueChange={(value) => {
            navigate({
              search: (previousTab: AuthenticationRouteSearchTab) => ({
                ...previousTab,
                guia: value as "login" | "cadastrar",
              }),
              replace: true,
            })
          }}
        >
          <TabsList className="grid w-full grid-cols-2 p-0">
            <TabsTrigger
              value="login"
              className="h-11.75 w-60 cursor-pointer rounded-none border border-b-[3px] bg-transparent pt-2 pb-3 shadow-none transition-colors data-[state=active]:border-b-primary-button data-[state=active]:text-primary-button data-[state=inactive]:border-b-border data-[state=inactive]:text-input-placeholder dark:data-[state=active]:border-b-primary-button dark:data-[state=active]:text-text-primary dark:data-[state=inactive]:border-b-input-placeholder dark:data-[state=inactive]:text-input-placeholder"
            >
              <span className="text-center align-middle text-base leading-6 font-bold tracking-normal">
                Login
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="cadastrar"
              className="h-11.75 w-60 cursor-pointer rounded-none border border-b-[3px] bg-transparent pt-2 pb-3 shadow-none transition-colors data-[state=active]:border-b-primary-button data-[state=active]:text-primary-button data-[state=inactive]:border-b-border data-[state=inactive]:text-input-placeholder dark:data-[state=active]:border-b-primary-button dark:data-[state=active]:text-text-primary dark:data-[state=inactive]:border-b-input-placeholder dark:data-[state=inactive]:text-input-placeholder"
            >
              <span className="text-center align-middle text-base leading-6 font-bold tracking-normal">
                Cadastrar
              </span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Login />
          </TabsContent>
          <TabsContent value="cadastrar">
            <Register />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
