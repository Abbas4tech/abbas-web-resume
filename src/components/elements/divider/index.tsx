import { forwardRef, memo } from "react";
import { cn } from "@/lib/utils";
import type { DividerProps } from "./types";

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
