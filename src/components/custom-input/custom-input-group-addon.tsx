import type { ReactNode } from "react"
import { InputGroupAddon } from "../ui/input-group"

interface CustomInputGroupAddonProperties {
  children: ReactNode
}

export function CustomInputGroupAddon({
  children,
}: CustomInputGroupAddonProperties) {
  return (
    <>
      <InputGroupAddon
        align="inline-end"
        className="flex h-14.25 w-14 items-center justify-center"
      >
        <div className="group h-6 min-h-6 w-6 min-w-6 rounded-[8px]">
          {children}
        </div>
      </InputGroupAddon>
    </>
  )
}
