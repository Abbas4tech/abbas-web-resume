import type { HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import { Progress } from "@/components/elements/ui/progress/progress";
import { cn } from "@/lib/utils";

export interface IconProgressRowProps extends HTMLAttributes<HTMLDivElement> {
  /** Accessible name for the progress bar (e.g. the skill it represents) */
  label?: string;
  /** 0-100 progress value */
  progress: number;
}

/**
 * A grid row: icon cluster (left) + progress bar (right).
 * Children on the left slot are the icons (pass <IconCluster> content).
 */
const IconProgressRow = memo(
  forwardRef<HTMLDivElement, IconProgressRowProps>(
    ({ className, progress, label, children, ...props }, ref) => (
      <div
        className={cn("grid grid-cols-2 items-center", className)}
        ref={ref}
        {...props}
      >
        <div className="flex gap-4 text-xl md:text-4xl">{children}</div>
        <Progress aria-label={label} count={progress} />
      </div>
    )
  )
);
IconProgressRow.displayName = "IconProgressRow";

export { IconProgressRow };
