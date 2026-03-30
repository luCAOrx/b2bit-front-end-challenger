import type { ReactNode } from "react"
import SubmitLoadingButton from "../submit-loading-button"
import { Field, FieldGroup } from "../ui/field"
import type { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form"

interface CustomFormRootProperties<
  TFieldValues extends FieldValues = FieldValues,
> {
  children: ReactNode
  form: UseFormReturn<TFieldValues>
  title: string
  description: string
  handleSubmit: SubmitHandler<TFieldValues>
}

export function CustomFormRoot<TFieldValues extends FieldValues>({
  children,
  form,
  title,
  description,
  handleSubmit,
}: CustomFormRootProperties<TFieldValues>) {
  return (
    <>
      <div className="w-48px mt-12 mb-6 flex h-16 flex-col gap-1">
        <h1 className="align-middle text-3xl leading-9 font-bold tracking-[-0.75px]">
          {title}
        </h1>
        <h3 className="align-middle text-base leading-6 font-normal tracking-normal text-text-secondary">
          {description}
        </h3>
      </div>
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
      <footer className="mb-12 w-120 px-20 pt-8">
        <p className="break-after-all text-center align-middle text-xs leading-4 font-normal tracking-normal text-[#94A3B8] not-dark:text-[#02274F]">
          Ao clicar em continuar, você concorda com nossos Termos de Serviço e
          Política de Privacidade.
        </p>
      </footer>
    </>
  )
}
