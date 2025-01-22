"use client"

import * as React from "react"
import { Checkbox as MaterialCheckbox } from "@material-tailwind/react"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.ComponentPropsWithoutRef<"input">
>(({ className, ...props }, ref) => (
  <div className="flex items-center">
    {/* @ts-expect-error: Material-Tailwind Expected Error */}
    <MaterialCheckbox
      ref={ref}
      {...props}
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 checked:bg-primary checked:text-primary-foreground",
        className
      )}
    />
  </div>
))

Checkbox.displayName = "Checkbox"

export { Checkbox }
