import type { ReactNode } from "react"

interface PostRootProps {
  children: ReactNode
}

export function PostRoot({ children }: PostRootProps) {
  return (
    <main className="flex flex-col items-center justify-center gap-6.25">
      {children}
    </main>
  )
}
