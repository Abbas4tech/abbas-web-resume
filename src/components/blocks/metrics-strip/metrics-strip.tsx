import type { HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import {
  MotionStaggerContainer,
  MotionStaggerItem,
} from "@/components/elements/behavior/motion-stagger/motion-stagger";
import type { StatGroupProps } from "@/components/patterns/stat-group/stat-group";
import { StatGroup } from "@/components/patterns/stat-group/stat-group";
import { cn } from "@/lib/utils";

export interface MetricsStripProps extends HTMLAttributes<HTMLDivElement> {
  stats: StatGroupProps[];
}

const MetricsStrip = memo(
  forwardRef<HTMLDivElement, MetricsStripProps>(
    ({ className, stats, ...props }, ref) => (
      <MotionStaggerContainer
        as="div"
        className={cn(
          "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4",
          className
        )}
        ref={ref}
        {...props}
      >
        {stats.map((stat) => (
          <MotionStaggerItem as="div" key={stat.label}>
            <StatGroup className="rounded-xl bg-base-300 shadow-md" {...stat} />
          </MotionStaggerItem>
        ))}
      </MotionStaggerContainer>
    )
  )
);
MetricsStrip.displayName = "MetricsStrip";

export { MetricsStrip };
