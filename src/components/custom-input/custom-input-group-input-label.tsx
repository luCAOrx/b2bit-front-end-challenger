import { cn } from "@/lib/utils"
import { FieldLabel } from "../ui/field"
import type { FieldValues, Path, UseFormReturn } from "react-hook-form"

interface CustomInputGroupInputLabelProperties<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  form: UseFormReturn<TFieldValues>
  formFieldName: TFieldName
  fieldLabelTitle: string
}

export function CustomInputGroupInputLabel<
  TFieldValues extends FieldValues,
  TFieldName extends Path<TFieldValues>,
>({
  form,
  formFieldName,
  fieldLabelTitle,
}: CustomInputGroupInputLabelProperties<TFieldValues, TFieldName>) {
  const isFormError = !!form.formState.errors[formFieldName]

  return (
    <FieldLabel
      htmlFor={`form-${formFieldName}`}
      className={cn(
        isFormError
          ? "text-red-500"
          : "align-middle text-sm leading-5 font-normal tracking-normal not-dark:text-text-secondary-foreground"
      )}
    >
      {fieldLabelTitle}
    </FieldLabel>
  )
}
