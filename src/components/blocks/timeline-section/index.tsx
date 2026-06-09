import { forwardRef, memo } from "react";
import { PageContent } from "@/components/elements/page";
import { RichText } from "@/components/patterns/rich-text";
import { TimelineEntry } from "@/components/patterns/timeline-entry";
import { cn } from "@/lib/utils";
import type { TimelineSectionProps } from "./types";

const TimelineSection = memo(
  forwardRef<HTMLDivElement, TimelineSectionProps>(
    ({ className, entries, animation, ...props }, ref) => (
      <PageContent
        className={cn("mt-2 px-2 pl-4 md:mt-4 md:px-12", className)}
        data-aos={animation}
        ref={ref}
        {...props}
      >
        {entries.map((entry) => (
          <TimelineEntry
            body={
              <RichText
                className="description"
                document={entry.description.document}
              />
            }
            indicatorIcon={entry.indicatorIcon}
            key={entry.title}
            metaRows={entry.metaRows}
            title={entry.title}
          />
        ))}
      </PageContent>
    )
  )
);
TimelineSection.displayName = "TimelineSection";

export { TimelineSection };
