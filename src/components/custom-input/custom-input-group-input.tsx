import { cn } from "@/lib/utils"
import { FieldError, FieldLabel } from "../ui/field"
import type { ReactNode } from "react"
import type {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormReturn,
} from "react-hook-form"
import { InputGroup, InputGroupInput } from "../ui/input-group"

interface CustomInputGroupInputProperties<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  children: ReactNode
  field: ControllerRenderProps<TFieldValues, TFieldName>
  fieldState: ControllerFieldState
  form: UseFormReturn<TFieldValues>
  fieldLabelTitle: string
  formFieldName: TFieldName
  reactComponentInputProperties: React.ComponentProps<"input">
}

export function CustomInputGroupInput<
  TFieldValues extends FieldValues,
  TFieldName extends Path<TFieldValues>,
>({
  children,
  formFieldName,
  fieldLabelTitle,
  field,
  fieldState,
  form,
  reactComponentInputProperties: { type, placeholder },
}: CustomInputGroupInputProperties<TFieldValues, TFieldName>) {
  const isFormError = !!form.formState.errors[formFieldName]

  return (
    <>
      <FieldLabel
        htmlFor={`form-rhf-form-${formFieldName}`}
        className={cn(
          isFormError
            ? "text-red-500"
            : "align-middle text-sm leading-5 font-normal tracking-normal not-dark:text-text-secondary-foreground"
        )}
      >
        {fieldLabelTitle}
      </FieldLabel>
      <div
        className={cn(
          isFormError
            ? "flex rounded-[8px] border border-red-500 bg-input-background not-dark:border-2 not-dark:text-text-secondary not-dark:shadow-md placeholder:text-[14px] focus-within:border focus-within:border-[#FAFAFA] not-dark:focus-within:border not-dark:focus-within:border-text-secondary"
            : "flex rounded-[8px] border bg-input-background not-dark:border-2 not-dark:text-text-secondary not-dark:shadow-md placeholder:text-[14px] focus-within:border focus-within:border-[#FAFAFA] not-dark:focus-within:border not-dark:focus-within:border-text-secondary"
        )}
      >
        <InputGroup className="h-14.25 w-120 border-transparent! ring-0!">
          <InputGroupInput
            {...field}
            id="form-rhf-form-name"
            placeholder={placeholder}
            className="h-14.25 w-full border-none! bg-transparent! text-[16px]!"
            type={type}
            autoComplete="off"
          />
        </InputGroup>
        {children}
      </div>
      {fieldState.invalid && (
        <FieldError errors={[fieldState.error]} className="text-red-500" />
      )}
    </>
  )
}
