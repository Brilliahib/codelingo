"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

type ProgressProps = React.ComponentPropsWithoutRef<
  typeof ProgressPrimitive.Root
> & {
  type?: "xp" | "league";
};

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, type = "xp", ...props }, ref) => {
  // Tentukan warna berdasarkan tipe
  const indicatorColor = type === "xp" ? "bg-green-500" : "bg-yellow-400";

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 md:h-5 w-full overflow-hidden rounded-full bg-disabled",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn("h-full w-full flex-1 transition-all", indicatorColor)}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
