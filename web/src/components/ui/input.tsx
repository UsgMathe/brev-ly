import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "./label";
import { WarningIcon } from "@phosphor-icons/react";

export interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  errorMessage?: React.ReactNode;
}
function Input({ className, type, label, errorMessage, ...props }: InputProps) {
  return (
    <div className="group space-y-2">
      {label && (
        <Label
          aria-invalid={!!errorMessage || props['aria-invalid']}
          htmlFor={props.id}
          className="text-xs text-gray-500 transition-[colors,font-weight] group-focus-within:text-blue-base group-focus-within:font-bold aria-invalid:text-danger aria-invalid:font-bold"
        >
          {label}
        </Label>
      )}
      <input
        type={type}
        data-slot="input"
        aria-invalid={!!errorMessage || props['aria-invalid']}
        className={cn(
          "peer file:text-foreground placeholder:text-gray-400 text-gray-600 selection:bg-primary selection:text-primary-foreground dark:bg-input/30 h-9 w-full min-w-0 rounded-md border border-gray-300 bg-transparent px-3 py-[15px] text-sm font-normal transition-[color,border-width] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
          "focus-visible:border-blue-base focus-visible:border-[1.5px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive caret-blue-base",
          className
        )}
        {...props}
      />
      {errorMessage && (
        <div className="flex items-center gap-2">
          <WarningIcon className="w-4 text-danger" />
          <p className="text-sm text-gray-500">{errorMessage}</p>
        </div>
      )}
    </div>
  )
}

export { Input }
