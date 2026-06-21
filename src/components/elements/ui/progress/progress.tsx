import type { HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import { cn } from "@/lib/utils";

export type ProgressProps = HTMLAttributes<HTMLDivElement> & {
  count: number;
};

const Progress = memo(
  forwardRef<HTMLDivElement, ProgressProps>(
    ({ count, className, ...props }, ref) => (
      <div
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={count}
        className={cn("relative h-1 w-full rounded-2xl bg-gray-600", className)}
        ref={ref}
        role="progressbar"
        {...props}
      >
        <div
          className="absolute top-0 left-0 h-full rounded-2xl bg-warning"
          style={{ width: `${count}%` }}
        >
          <span className="absolute -right-4 bottom-full mb-2 animate-pulse rounded-sm bg-slate-900 px-1 py-1 text-white text-xs">
            {count}%
          </span>
        </div>
      </div>
    )
  )
);
Progress.displayName = "Progress";

export { Progress };
