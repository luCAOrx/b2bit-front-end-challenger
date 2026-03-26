import { LogOut, Moon, Search, Sun } from "lucide-react"
import { useTheme } from "../theme-provider"
import { Button } from "../ui/button"
import { Link, useNavigate, useSearch } from "@tanstack/react-router"
import { Input } from "../ui/input"
import React, { useMemo, useState } from "react"
import { Route, type PostSearch } from "@/routes/index.route"

export function Header() {
  const fiveHundredMilliseconds = 500

  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()
  const { auth } = Route.useRouteContext()

  const searchParams: PostSearch = useSearch({ strict: false })

  const [inputValue, setInputValue] = useState(searchParams.pesquisa || "")

  const debouncedSearch = useMemo(
    () =>
      ((wait) => {
        let timeoutId: number
        return (value: string) => {
          clearTimeout(timeoutId)
          timeoutId = setTimeout(() => {
            navigate({
              to: "/",
              search: (previousSearch: PostSearch) => ({
                ...previousSearch,
                pesquisa: value || undefined,
              }),
              replace: true,
            })
          }, wait)
        }
      })(fiveHundredMilliseconds),
    [navigate]
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setInputValue(value)
    debouncedSearch(value)
  }

  return (
    <header
      className="mb-10 flex h-full w-full items-center justify-between border-b bg-foreground"
      aria-label="Cabeçalho"
    >
      <div className="my-5 ml-10 flex h-5.5 w-32 flex-1 items-center">
        <span className="align-middle text-[18px] leading-[120%] font-bold tracking-[-0.27px] text-primary-button in-dark:text-white">
          Mini Twitter
        </span>
      </div>

      <div className="not-dark:bg-input-foreground mr-10 flex h-10 w-full max-w-121 items-center gap-2 rounded-[8px] bg-input-background px-4 py-2 not-dark:shadow-md">
        <Search className="text-input-placeholder" size={18} />
        <Input
          placeholder="Buscar por post..."
          className="border-none text-white not-dark:text-input-placeholder not-dark:placeholder-input-placeholder placeholder:text-[14px] placeholder:leading-none placeholder:font-normal focus-visible:ring-0 focus-visible:ring-offset-0"
          type="search"
          value={inputValue}
          onChange={handleChange}
        />
      </div>

      {!auth.isAuthenticated ? (
        <div className="flex flex-1 items-center justify-end gap-2">
          <Button
            className="h-10 w-10 cursor-pointer rounded-[9999px] bg-input-background text-text-primary not-dark:bg-primary-button not-dark:text-white hover:bg-input-background/80 hover:text-text-secondary hover:not-dark:bg-[#0D93F2]/80 hover:not-dark:text-[#E2E2EC]/80"
            title="Alterar tema"
            aria-label="Botão para alterar o tema"
            onClick={() =>
              theme === "dark" ? setTheme("light") : setTheme("dark")
            }
          >
            <Sun
              aria-label="Ícone do tema claro"
              className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
            />
            <Moon
              aria-label="Ícone do tema escuro"
              className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
            />
          </Button>
          <Link
            to="/autenticacao"
            search={{ guia: "cadastrar" }}
            className="flex h-10 w-39 items-center justify-center rounded-[9999px] border border-border text-center align-middle text-[16px] leading-6 font-bold text-text-primary not-dark:shadow-md hover:text-[#E2E2EC]/80 not-dark:hover:text-[#0D93F2]/60"
          >
            Registrar-se
          </Link>
          <Link
            to="/autenticacao"
            search={{ guia: "login" }}
            className="mr-5 flex h-10 w-39 items-center justify-center rounded-[9999px] bg-primary-button text-center align-middle text-[16px] leading-6 font-bold text-white hover:bg-[#0D93F2]/80 hover:text-[#E2E2EC]/80"
          >
            Login
          </Link>
        </div>
      ) : (
        <div className="mr-5 flex flex-1 items-center justify-end gap-2">
          <Button
            className="h-10 w-10 cursor-pointer rounded-[9999px] bg-input-background text-text-primary not-dark:bg-primary-button not-dark:text-white hover:bg-input-background/80 hover:text-text-secondary hover:not-dark:bg-[#0D93F2]/80 hover:not-dark:text-[#E2E2EC]/80"
            title="Alterar tema"
            aria-label="Botão para alterar o tema"
            onClick={() =>
              theme === "dark" ? setTheme("light") : setTheme("dark")
            }
          >
            <Sun
              aria-label="Ícone do tema claro"
              className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
            />
            <Moon
              aria-label="Ícone do tema escuro"
              className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
            />
          </Button>
          <Link
            to="/"
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[9999px] bg-input-background text-text-primary not-dark:bg-primary-button not-dark:text-white hover:bg-input-background/80 hover:text-text-secondary hover:not-dark:bg-[#0D93F2]/80 hover:not-dark:text-[#E2E2EC]/80"
            title="Sair da aplicação"
            aria-label="Botão para sair da aplicação"
            onClick={async () => await auth.signOut()}
          >
            <LogOut
              aria-label="Ícone para sair da aplicação"
              className="absolute h-[1.2rem] w-[1.2rem]"
            />
          </Link>
        </div>
      )}
    </header>
  )
}
