import type { HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import { MotionWrapper } from "@/components/elements/behavior/motion-wrapper/motion-wrapper";
import type { StatusColor } from "@/components/elements/ui/status/status";
import { CountdownUnit } from "@/components/patterns/countdown-unit/countdown-unit";
import { StatusIndicator } from "@/components/patterns/status-indicator/status-indicator";
import { cn } from "@/lib/utils";

export interface AvailabilityBannerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Days until availability starts. Omit to show the status alone (already available). */
  daysUntil?: number;
  message: string;
  statusColor?: StatusColor;
}

const AvailabilityBanner = memo(
  forwardRef<HTMLDivElement, AvailabilityBannerProps>(
    ({ className, message, statusColor, daysUntil, ...props }, ref) => (
      <MotionWrapper animation="slide-right" as="div">
        <div
          className={cn(
            "flex flex-wrap items-center justify-between gap-4 rounded-box bg-base-200 p-4",
            className
          )}
          ref={ref}
          {...props}
        >
          <StatusIndicator color={statusColor} label={message} />
          {daysUntil !== undefined && (
            <CountdownUnit label="Days" value={daysUntil} />
          )}
        </div>
      </MotionWrapper>
    )
  )
);
AvailabilityBanner.displayName = "AvailabilityBanner";

export { AvailabilityBanner };
