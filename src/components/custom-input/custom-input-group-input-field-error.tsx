import { FieldError } from "../ui/field"
import type { ControllerFieldState } from "react-hook-form"

interface CustomInputGroupInputFieldErrorProperties {
  fieldState: ControllerFieldState
}

export function CustomInputGroupInputFieldError({
  fieldState,
}: CustomInputGroupInputFieldErrorProperties) {
  return (
    <>
      {fieldState.invalid && (
        <FieldError
          errors={[fieldState.error]}
          className="text-[14px] text-red-500"
        />
      )}
    </>
  )
}
