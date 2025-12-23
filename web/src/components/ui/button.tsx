import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none",
  {
    variants: {
      variant: {
        primary: "bg-blue-base hover:bg-blue-dark text-white text-md w-full max-w-[352px] px-[20px] py-[15px]",
        secondary: "bg-gray-200 text-gray-500 [&_svg]:text-gray-600 hover:ring-blue-base hover:ring p-2 text-sm font-semibold w-fit",
        danger: "bg-danger text-white text-md py-2 px-3 text-sm hover:ring-red-base hover:ring",
      },
      size: {}
    },
    defaultVariants: {
      variant: "primary",
    },
  }
)

function Button({
  className,
  variant = "primary",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
