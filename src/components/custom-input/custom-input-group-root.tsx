import { Field } from "../ui/field"
import type { ControllerFieldState } from "react-hook-form"
import type { ReactNode } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

interface CustomInputGroupInputRootProperties {
  children: ReactNode
  fieldState: ControllerFieldState
}

const customInputGroupInputRootVariants = cva("", {
  variants: {
    variant: {
      default: "",
      post: "border-b not-dark:shadow-md",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export function CustomInputGroupInputRoot({
  children,
  fieldState,
  variant = "default",
}: CustomInputGroupInputRootProperties &
  VariantProps<typeof customInputGroupInputRootVariants>) {
  return (
    <Field
      className={cn(customInputGroupInputRootVariants({ variant }))}
      data-invalid={fieldState.invalid}
    >
      {children}
    </Field>
  )
}
