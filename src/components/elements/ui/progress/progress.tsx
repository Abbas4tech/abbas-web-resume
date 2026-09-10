"use client";

import { m, useReducedMotion, type Variants } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import { cn } from "@/lib/utils";

export type ProgressProps = HTMLAttributes<HTMLDivElement> & {
  count: number;
};

const progressVariants: Variants = {
  initial: { width: 0 },
  animate: (count) => ({
    width: `${count}%`,
    transition: {
      type: "spring" as const,
      stiffness: 80,
      damping: 15,
      delay: 0.5,
    },
  }),
};

const Progress = memo(
  forwardRef<HTMLDivElement, ProgressProps>(
    ({ count, className, ...props }, ref) => {
      const prefersReducedMotion = useReducedMotion();

      return (
        <div
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={count}
          className={cn(
            "relative h-1 w-full rounded-2xl bg-gray-600",
            className
          )}
          ref={ref}
          role="progressbar"
          {...props}
        >
          <m.div
            className="absolute top-0 left-0 h-full rounded-2xl bg-warning"
            custom={count}
            variants={progressVariants}
          >
            {!prefersReducedMotion && (
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <m.div
                  animate={{ x: ["-100%", "220%"] }}
                  className="absolute inset-y-0 w-1/3 bg-linear-to-r from-transparent via-white/40 to-transparent"
                  transition={{
                    duration: 1.6,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatDelay: 0.6,
                    ease: "easeInOut",
                    delay: 0.6,
                  }}
                />
              </div>
            )}
            {/* Outside the overflow-hidden shimmer clip above so it isn't cut off. */}
            <span className="absolute -right-4 bottom-full mb-2 animate-pulse rounded-sm bg-slate-900 px-1 py-1 text-white text-xs">
              {count}%
            </span>
          </m.div>
        </div>
      );
    }
  )
);
Progress.displayName = "Progress";

export { Progress };
