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
    entries: data.customEntries.map((item) => {
      const metaRows: TimelineSectionProps["entries"][number]["metaRows"] = [];
      if (item.startDate || item.endDate) {
        metaRows.push({
          icon: { iconCode: "md/MdDateRange", name: "Duration", size: "18" },
          text: `${item.startDate?.toLocaleString("en", { month: "long", year: "numeric" })} - ${item.endDate?.toLocaleString("en", { month: "long", year: "numeric" }) || "Present"}`,
        });
      }
      if (item.description) {
        metaRows.push({
          icon: { iconCode: "fa/FaMapMarkerAlt", name: "Place", size: "18" },
          text: item.description,
        });
      }
      if (item.subtitle) {
        metaRows.push({
          icon: { iconCode: "io5/IoPerson", name: "Role", size: "18" },
          text: item.subtitle,
        });
      }
      if (item.tags && item.tags.length > 0) {
        metaRows.push({
          icon: {
            iconCode: "fa/FaStackOverflow",
            name: "Tech Stack",
            size: "18",
          },
          text: item.tags.join(", "),
        });
      }

      return {
        title: item.title,
        indicatorIcon: item.icon,
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
