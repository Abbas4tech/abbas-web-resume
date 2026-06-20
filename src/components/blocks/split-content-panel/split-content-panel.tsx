import type { Document } from "@contentful/rich-text-types";
import type { HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
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
          <div className="rounded-xl bg-base-300 p-4">
            <RichText
              document={description}
              paragraphClass="py-1.5 text-center lg:text-xl"
            />
          </div>
        )}
        {infoRows.length ? (
          <div className="grid grid-cols-1 gap-4 rounded-xl md:grid-cols-2">
            {infoRows.map((row) => (
              <StatGroup key={row.label} {...row} />
            ))}
          </div>
        ) : null}
      </div>
    )
  )
);
SplitContentPanel.displayName = "SplitContentPanel";

export { SplitContentPanel };
