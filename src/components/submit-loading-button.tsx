import { cva, type VariantProps } from "class-variance-authority"
import { Button } from "./ui/button"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface ButtonLoadingProps {
  isSubmitting: boolean
  children: ReactNode
}

const buttonVariants = cva(
  "h-9 w-20 cursor-pointer rounded-md bg-primary-button text-white",
  {
    variants: {
      size: {
        xs: "h-14 w-120 cursor-pointer rounded-[9999px] bg-primary-button text-center align-middle text-base text-[16px] leading-6 font-bold tracking-normal text-white hover:bg-[#0D93F2]/80 hover:text-[#E2E2EC]/80",
        sm: "ml-auto flex h-9 w-21.25 cursor-pointer rounded-full bg-primary-button px-5 py-2 text-center align-middle text-sm leading-5 font-bold tracking-normal text-white hover:bg-[#0D93F2]/80 hover:text-[#E2E2EC]/80",
        icon: "ml-auto flex h-9 min-h-9 w-12 min-w-12 cursor-pointer rounded-full px-5 py-2 text-center align-middle text-sm leading-5 font-bold tracking-normal text-white",
      },
    },
  }
)
export default function SubmitLoadingButton({
  isSubmitting,
  size,
  children,
  className,
  onClick,
}: ButtonLoadingProps &
  VariantProps<typeof buttonVariants> &
  React.ComponentProps<"button">) {
  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      onClick={onClick}
      aria-label="Botão para cadastrar"
      className={cn(
        buttonVariants({
          size,
          className,
        })
      )}
    >
      {isSubmitting ? (
        <div className="inline-flex h-9 w-15.25 items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <>{children}</>
      )}
    </Button>
  )
}
