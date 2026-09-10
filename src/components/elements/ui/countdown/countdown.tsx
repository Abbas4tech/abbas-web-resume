import type { CSSProperties, HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import { cn } from "@/lib/utils";

export type CountdownProps = HTMLAttributes<HTMLSpanElement> & {
  /** A number between 0 and 999. Rendered as a static snapshot — this component does not tick on its own. */
  value: number;
};

/** DaisyUI countdown wrapper */
const Countdown = memo(
  forwardRef<HTMLSpanElement, CountdownProps>(
    ({ value, className, style, "aria-label": ariaLabel, ...props }, ref) => (
      <span className={cn("countdown", className)} ref={ref} {...props}>
        <output
          aria-label={ariaLabel ?? String(value)}
          style={{ "--value": value, ...style } as CSSProperties}
        >
          {value}
        </output>
      </span>
    )
  )
);
Countdown.displayName = "Countdown";

export { Countdown };
