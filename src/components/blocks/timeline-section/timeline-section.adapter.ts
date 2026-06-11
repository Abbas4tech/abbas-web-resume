import { BLOCKS } from "@contentful/rich-text-types";
import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import type { TimelineSectionProps } from "./timeline-section";

/**
 * Maps generic AdaptedContentList to the TimelineSection block props.
 */
export function adaptTimelineSection(
  data: AdaptedContentList
): TimelineSectionProps {
  return {
    animation: undefined,
    entries: data.customEntries.map((item) => {
      const metaRows: { icon: { iconCode: string }; text: string }[] = [];
      if (item.startDate || item.endDate) {
        metaRows.push({
          icon: { iconCode: "calendar" },
          text: `${item.startDate || ""} - ${item.endDate || "Present"}`,
        });
      }
      if (item.subtitle) {
        metaRows.push({
          icon: { iconCode: "briefcase" },
          text: item.subtitle,
        });
      }

      return {
        title: item.title,
        indicatorIcon: item.icon || { iconCode: "" },
        metaRows,
        description: {
          document: item.body || {
            nodeType: BLOCKS.DOCUMENT,
            data: {},
            content: [],
          },
        },
      };
    }),
  };
}
