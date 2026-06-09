import { forwardRef, memo } from "react";
import { cn } from "@/lib/utils";
import type { LoadingProps } from "./types";

const Loading = memo(
  forwardRef<HTMLSpanElement, LoadingProps>(
    ({ className, size, variant = "spinner", ...props }, ref) => (
      <span
        className={cn(
          "loading",
          `loading-${variant}`,
          size && `loading-${size}`,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  )
);
Loading.displayName = "Loading";

export { Loading };
