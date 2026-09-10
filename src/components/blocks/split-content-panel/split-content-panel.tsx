import type { Document } from "@contentful/rich-text-types";
import type { HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import {
  MotionStaggerContainer,
  MotionStaggerItem,
} from "@/components/elements/behavior/motion-stagger/motion-stagger";
import { MotionWrapper } from "@/components/elements/behavior/motion-wrapper/motion-wrapper";
import { RichText } from "@/components/patterns/rich-text/rich-text";
import type { StatGroupProps } from "@/components/patterns/stat-group/stat-group";
import { StatGroup } from "@/components/patterns/stat-group/stat-group";
import { cn } from "@/lib/utils";

export interface SplitContentPanelProps extends HTMLAttributes<HTMLDivElement> {
  description?: Document;
  infoRows: StatGroupProps[];
}

const SplitContentPanel = memo(
  forwardRef<HTMLDivElement, SplitContentPanelProps>(
    ({ className, description, infoRows, ...props }, ref) => (
      <div
        className={cn("flex flex-col gap-4", className)}
        ref={ref}
        {...props}
      >
        {description && (
          <MotionWrapper
            animation="fade-up"
            className="rounded-xl bg-base-300 p-4"
          >
            <RichText
              document={description}
              paragraphClass="py-1.5 text-center lg:text-xl"
            />
          </MotionWrapper>
        )}
        {infoRows.length ? (
          <MotionStaggerContainer
            as="div"
            className="grid grid-cols-1 gap-4 rounded-xl md:grid-cols-2"
          >
            {infoRows.map((row) => (
              <MotionStaggerItem as="div" key={row.label}>
                <StatGroup {...row} />
              </MotionStaggerItem>
            ))}
          </MotionStaggerContainer>
        ) : null}
      </div>
    )
  )
);
SplitContentPanel.displayName = "SplitContentPanel";

export { SplitContentPanel };
