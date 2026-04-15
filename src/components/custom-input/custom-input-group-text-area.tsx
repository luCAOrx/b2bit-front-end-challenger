import { cn } from "@/lib/utils"
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "../ui/input-group"
import { cva, type VariantProps } from "class-variance-authority"

interface CustomInputGroupTextAreaProperties<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  field: ControllerRenderProps<TFieldValues, TFieldName>
  formFieldName: TFieldName
}

const variants = cva("", {
  variants: {
    variant: {
      default:
        "bg-input-foreground mt-5 mb-3 h-18 min-h-15 w-151.5 resize-none pt-2 pr-3 pb-9 align-middle text-[18px]! leading-7 text-white not-dark:text-input-placeholder not-dark:placeholder-input-placeholder placeholder:text-[18px] placeholder:leading-7 placeholder:font-normal",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export function CustomInputGroupTextArea<
  TFieldValues extends FieldValues,
  TFieldName extends Path<TFieldValues>,
>({
  formFieldName,
  field,
  variant,
  ...props
}: CustomInputGroupTextAreaProperties<TFieldValues, TFieldName> &
  VariantProps<typeof variants> &
  React.ComponentProps<"textarea">) {
  return (
    <InputGroup className="border-none ring-0!">
      <InputGroupTextarea
        {...field}
        id={`form-${formFieldName}`}
        className={cn(variants({ variant }))}
        autoComplete="off"
        {...props}
      />
      <InputGroupAddon align="block-end">
        <InputGroupText className="tabular-nums">
          {field.value.length}/250 caracteres
        </InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  )
}
