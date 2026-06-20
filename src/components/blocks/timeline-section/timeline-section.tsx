import type { HTMLAttributes } from "react";
import { forwardRef, memo } from "react";
import { MotionScrollProgress } from "@/components/elements/motion-scroll-progress/motion-scroll-progress";
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
        className={cn(
          "relative mt-2 px-2 pl-6 md:mt-4 md:px-12 md:pl-14",
          className
        )}
        ref={ref}
        {...props}
      >
        {/* Scroll-linked progress line on the left */}
        <div className="absolute top-0 bottom-0 left-2 md:left-4">
          <MotionScrollProgress colorClass="bg-primary" lineHeight={2} />
        </div>

        <div className="flex w-full flex-col gap-6">
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
        </div>
      </PageContent>
    )
  )
);
TimelineSection.displayName = "TimelineSection";

export { TimelineSection };
