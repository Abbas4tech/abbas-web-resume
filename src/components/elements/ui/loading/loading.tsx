import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
export type LoadingVariant =
  | "spinner"
  | "dots"
  | "ring"
  | "ball"
  | "bars"
  | "infinity";
export type LoadingSize = "xs" | "sm" | "md" | "lg";
export type LoadingProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: LoadingVariant;
  size?: LoadingSize;
};

import { forwardRef, memo } from "react";

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
