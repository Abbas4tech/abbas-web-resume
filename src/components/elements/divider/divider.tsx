import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
export type DividerProps = HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical";
};

import { forwardRef, memo } from "react";

const Divider = memo(
  forwardRef<HTMLDivElement, DividerProps>(
    ({ className, orientation = "horizontal", ...props }, ref) => (
      <div
        className={cn(
          "divider",
          orientation === "vertical" && "divider-vertical",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  )
);
Divider.displayName = "Divider";

export { Divider };
