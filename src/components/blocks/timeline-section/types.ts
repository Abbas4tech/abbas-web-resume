import type { HTMLAttributes } from "react";
import type { RichTextProps } from "@/components/patterns/rich-text/types";
import type { TimelineEntryProps } from "@/components/patterns/timeline-entry/types";

export interface TimelineSectionEntry extends Omit<TimelineEntryProps, "body"> {
  description: Pick<RichTextProps, "document">;
}

export interface TimelineSectionProps extends HTMLAttributes<HTMLDivElement> {
  animation?: string;
  entries: TimelineSectionEntry[];
}
