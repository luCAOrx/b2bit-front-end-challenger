import { cn } from "@/lib/utils"
import type { ReactNode } from "react"
import type { FieldValues, Path, UseFormReturn } from "react-hook-form"

interface CustomInputGroupInputContainerProperties<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  children: ReactNode
  form: UseFormReturn<TFieldValues>
  formFieldName: TFieldName
}

export function CustomInputGroupInputContainer<
  TFieldValues extends FieldValues,
  TFieldName extends Path<TFieldValues>,
>({
  children,
  form,
  formFieldName,
}: CustomInputGroupInputContainerProperties<TFieldValues, TFieldName>) {
  const isFormError = !!form.formState.errors[formFieldName]

  return (
    <div
      className={cn(
        isFormError
          ? "flex rounded-[8px] border border-red-500 bg-input-background not-dark:border-2 not-dark:text-text-secondary not-dark:shadow-md placeholder:text-[14px] focus-within:border focus-within:border-[#FAFAFA] not-dark:focus-within:border not-dark:focus-within:border-text-secondary"
          : "flex rounded-[8px] border bg-input-background not-dark:border-2 not-dark:text-text-secondary not-dark:shadow-md placeholder:text-[14px] focus-within:border focus-within:border-[#FAFAFA] not-dark:focus-within:border not-dark:focus-within:border-text-secondary"
      )}
    >
      {children}
    </div>
  )
}
