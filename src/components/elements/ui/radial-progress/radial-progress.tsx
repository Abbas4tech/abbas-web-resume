import type { CSSProperties, HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import { cn } from "@/lib/utils";

export type RadialProgressProps = HTMLAttributes<HTMLDivElement> & {
  count: number;
};

/** DaisyUI radial-progress wrapper */
const RadialProgress = memo(
  forwardRef<HTMLDivElement, RadialProgressProps>(
    ({ count, className, style, ...props }, ref) => (
      <div
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={count}
        className={cn("radial-progress bg-base-200 text-warning", className)}
        ref={ref}
        role="progressbar"
        style={{ "--value": count, ...style } as CSSProperties}
        {...props}
      >
        {count}%
      </div>
    )
  )
);
RadialProgress.displayName = "RadialProgress";

export { RadialProgress };
