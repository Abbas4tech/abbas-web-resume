import { adaptRichText } from "@/components/patterns/rich-text/adapter";
import { adaptTimelineEntry } from "@/components/patterns/timeline-entry/adapter";
import type { TimelineSectionProps } from "./types";

/**
 * Maps Contentful "Experience Page" data directly to the TimelineSection block.
 */
export function adaptTimelineSection(input: {
  contentAnimation?: string;
  pageData: {
    experiencesCollection: {
      // biome-ignore lint/suspicious/noExplicitAny: temporary patch
      items: any[];
    };
  };
}): TimelineSectionProps {
  return {
    animation: input.contentAnimation,
    entries: input.pageData.experiencesCollection.items.map((item) => {
      // adaptTimelineEntry expects a ReactNode body, but our block takes a document struct.
      // So we adapt the entry ignoring body, then inject the rich text document struct.
      const entry = adaptTimelineEntry({
        ...(item as Parameters<typeof adaptTimelineEntry>[0]),
        body: null,
      });
      return {
        title: entry.title,
        indicatorIcon: entry.indicatorIcon,
        metaRows: entry.metaRows,
        description: adaptRichText(item.description),
      };
    }),
  };
}
