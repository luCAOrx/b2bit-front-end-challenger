import type { ReactNode } from "react"
import { FieldGroup } from "../ui/field"
import {
  FormProvider,
  type FieldValues,
  type SubmitHandler,
  type UseFormReturn,
} from "react-hook-form"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

interface CustomFormRootProperties<
  TFieldValues extends FieldValues = FieldValues,
> {
  children: ReactNode
  form: UseFormReturn<TFieldValues>
  handleSubmit: SubmitHandler<TFieldValues>
}

const customFormFormVariants = cva("", {
  variants: {
    variant: {
      default: "",
      postInput: "flex h-full w-151.5 flex-col gap-3",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export function CustomFormForm<TFieldValues extends FieldValues>({
  children,
  form,
  handleSubmit,
  variant = "default",
}: CustomFormRootProperties<TFieldValues> &
  VariantProps<typeof customFormFormVariants>) {
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        method="POST"
        className={cn(customFormFormVariants({ variant }))}
      >
        <FieldGroup>{children}</FieldGroup>
      </form>
    </FormProvider>
  )
}
