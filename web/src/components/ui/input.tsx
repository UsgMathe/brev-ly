import * as React from "react";

import { cn } from "@/lib/utils";
import { WarningIcon } from "@phosphor-icons/react";
import { Label } from "./label";

export interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  errorMessage?: React.ReactNode;
}
function Input({
  prefix,
  className,
  type,
  label,
  errorMessage,
  ...props
}: InputProps & { prefix?: string }) {
  return (
    <div className="group space-y-2">
      {label && (
        <Label
          aria-invalid={!!errorMessage || props["aria-invalid"]}
          htmlFor={props.id}
          className="text-xs text-gray-500 transition-[colors,font-weight] group-focus-within:text-blue-base group-focus-within:font-bold aria-invalid:text-danger aria-invalid:font-bold"
        >
          {label}
        </Label>
      )}

      <div
        className={cn(
          "flex items-center rounded-md border border-gray-300 bg-transparent",
          "focus-within:border-[1.5px] px-3",
          props["aria-invalid"] || !!errorMessage ? "border-danger" : "focus-within:border-blue-base",
        )}
      >
        {prefix && (
          <label htmlFor={props.id} className="text-sm text-gray-400 select-none">
            {prefix}
          </label>
        )}

        <input
          type={type}
          aria-invalid={!!errorMessage || props["aria-invalid"]}
          className={cn(
            "w-full bg-transparent py-[15px] pr-3 text-sm text-gray-600 outline-none caret-blue-base",
            className
          )}
          {...props}
        />
      </div>

      {errorMessage && (
        <div className="flex items-center gap-2">
          <WarningIcon className="w-4 text-danger" />
          <p className="text-sm text-gray-500">{errorMessage}</p>
        </div>
      )}
    </div>
  );
}


export { Input };

