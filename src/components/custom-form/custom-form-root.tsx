import type { ReactNode } from "react"

interface CustomFormRootProperties {
  children: ReactNode
}

export function CustomFormRoot({ children }: CustomFormRootProperties) {
  return <>{children}</>
}
