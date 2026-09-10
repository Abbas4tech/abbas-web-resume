import type { HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import { Countdown } from "@/components/elements/ui/countdown/countdown";
import { cn } from "@/lib/utils";

export interface CountdownUnitProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: number;
}

/** One digit group + its unit label (e.g. "15" over "Days"). */
const CountdownUnit = memo(
  forwardRef<HTMLDivElement, CountdownUnitProps>(
    ({ className, value, label, ...props }, ref) => (
      <div
        className={cn("flex flex-col items-center gap-1", className)}
        ref={ref}
        {...props}
      >
        <Countdown aria-label={`${value} ${label}`} value={value} />
        <span className="text-xs opacity-70">{label}</span>
      </div>
    )
  )
);
CountdownUnit.displayName = "CountdownUnit";

export { CountdownUnit };
