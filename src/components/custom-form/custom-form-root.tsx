import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import type { ReactNode } from "react"

interface CustomFormRootProperties {
  children: ReactNode
}

const customFormRootVariants = cva("", {
  variants: {
    variant: {
      default: "",
      postInput:
        "h-auto w-160 rounded-[12px] border border-solid bg-input-background p-4 px-4 not-dark:shadow-md",
      postInputUpdate:
        "fixed top-1/2 left-1/2 z-50 grid w-full max-w-160.5! max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 gap-4 rounded-[12px] border border-solid bg-input-background p-4 px-4 duration-100 not-dark:shadow-md sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 [&_svg]:size-6!",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export function CustomFormRoot({
  children,
  variant = "default",
}: CustomFormRootProperties & VariantProps<typeof customFormRootVariants>) {
  return (
    <div className={cn(customFormRootVariants({ variant }))}>{children}</div>
  )
}
