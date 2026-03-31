import type { ReactNode } from "react"
import SubmitLoadingButton from "../submit-loading-button"
import { Field, FieldGroup } from "../ui/field"
import type { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form"

interface CustomFormRootProperties<
  TFieldValues extends FieldValues = FieldValues,
> {
  children: ReactNode
  form: UseFormReturn<TFieldValues>
  handleSubmit: SubmitHandler<TFieldValues>
}

export function CustomFormForm<TFieldValues extends FieldValues>({
  children,
  form,
  handleSubmit,
}: CustomFormRootProperties<TFieldValues>) {
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)} method="POST">
      <FieldGroup>
        {children}
        <Field orientation="horizontal">
          <SubmitLoadingButton
            size="xs"
            isSubmitting={form.formState.isSubmitting}
          >
            Continuar
          </SubmitLoadingButton>
        </Field>
      </FieldGroup>
    </form>
  )
}
