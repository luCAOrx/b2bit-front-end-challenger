import { cn } from "@/lib/utils"
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form"
import { InputGroup, InputGroupInput } from "../ui/input-group"
import { cva, type VariantProps } from "class-variance-authority"
import type { ReactNode } from "react"

interface CustomInputGroupInputProperties<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends Path<TFieldValues> = Path<TFieldValues>,
> {
  children?: ReactNode
  field: ControllerRenderProps<TFieldValues, TFieldName>
  formFieldName: TFieldName
}

const variants = cva("", {
  variants: {
    inputGroupVariant: {
      defaultInputGroup: "h-14.25 w-120 border-transparent! ring-0!",
      postInputGroup:
        "mt-5 mb-3 h-18 min-h-15 w-151.5 border-none border-transparent! ring-0!",
    },
    inputGroupInputVariant: {
      defaultInputGroupInput:
        "h-14.25 w-full border-none! bg-transparent! text-[16px]!",
      postInputGroupInputVariant:
        "bg-input-foreground border-none align-middle text-[18px]! leading-7 text-white not-dark:text-input-placeholder not-dark:placeholder-input-placeholder placeholder:text-[18px] placeholder:leading-7 placeholder:font-normal",
    },
  },
  defaultVariants: {
    inputGroupVariant: "defaultInputGroup",
    inputGroupInputVariant: "defaultInputGroupInput",
  },
})

export function CustomInputGroupInput<
  TFieldValues extends FieldValues,
  TFieldName extends Path<TFieldValues>,
>({
  children,
  formFieldName,
  field,
  inputGroupVariant,
  inputGroupInputVariant,
  ...props
}: CustomInputGroupInputProperties<TFieldValues, TFieldName> &
  VariantProps<typeof variants> &
  React.ComponentProps<"input">) {
  return (
    <InputGroup className={cn(variants({ inputGroupVariant }))}>
      <InputGroupInput
        {...field}
        id={`form-${formFieldName}`}
        className={cn(variants({ inputGroupInputVariant }))}
        autoComplete="off"
        {...props}
      />
      {children}
    </InputGroup>
  )
}
