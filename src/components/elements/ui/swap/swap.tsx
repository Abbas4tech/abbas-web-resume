import type { HTMLAttributes, ReactNode } from "react";
import { forwardRef, memo } from "react";
import { cn } from "@/lib/utils";
export type SwapProps = HTMLAttributes<HTMLLabelElement> & {
  active?: boolean;
  onContent: ReactNode;
  offContent: ReactNode;
  rotate?: boolean;
};

const Swap = memo(
  forwardRef<HTMLLabelElement, SwapProps>(
    ({ className, active, onContent, offContent, rotate, ...props }, ref) => (
      <label
        className={cn(
          "swap",
          rotate && "swap-rotate",
          active && "swap-active",
          className
        )}
        ref={ref}
        {...props}
      >
        <input
          aria-label="Toggle swap"
          className="theme-controller"
          type="checkbox"
        />
        <div className="swap-on">{onContent}</div>
        <div className="swap-off">{offContent}</div>
      </label>
    )
  )
);
Swap.displayName = "Swap";

export { Swap };
