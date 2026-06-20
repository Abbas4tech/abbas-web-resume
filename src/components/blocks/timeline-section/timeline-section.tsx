import type { HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import { PageContent } from "@/components/elements/page/page";
import type { RichTextProps } from "@/components/patterns/rich-text/rich-text";
import { RichText } from "@/components/patterns/rich-text/rich-text";
import type { TimelineEntryProps } from "@/components/patterns/timeline-entry/timeline-entry";
import { TimelineEntry } from "@/components/patterns/timeline-entry/timeline-entry";
import { cn } from "@/lib/utils";

export interface TimelineSectionEntry extends Omit<TimelineEntryProps, "body"> {
  description: Pick<RichTextProps, "document">;
}

export interface TimelineSectionProps extends HTMLAttributes<HTMLDivElement> {
  entries: TimelineSectionEntry[];
}

const TimelineSection = memo(
  forwardRef<HTMLDivElement, TimelineSectionProps>(
    ({ className, entries, ...props }, ref) => (
      <PageContent
        className={cn("mt-2 px-2 pl-4 md:mt-4 md:px-12", className)}
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
