import { Field } from "../ui/field"
import type { ControllerFieldState } from "react-hook-form"
import type { ReactNode } from "react"

interface CustomInputGroupInputRootProperties {
  children: ReactNode
  fieldState: ControllerFieldState
}

export function CustomInputGroupInputRoot({
  children,
  fieldState,
}: CustomInputGroupInputRootProperties) {
  return <Field data-invalid={fieldState.invalid}>{children}</Field>
}
