import { BLOCKS } from "@contentful/rich-text-types";
import type { AdaptedContentItem } from "@/contentful/adapters/content-item";
import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import type {
  TimelineSectionEntry,
  TimelineSectionProps,
} from "./timeline-section";

function buildBaseMetaRows(
  item: AdaptedContentItem
): TimelineSectionEntry["metaRows"] {
  const metaRows: TimelineSectionEntry["metaRows"] = [];
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
  return metaRows;
}

function buildEntryDescription(item: AdaptedContentItem) {
  return {
    document: item.body || {
      nodeType: BLOCKS.DOCUMENT,
      data: {},
      content: [],
    },
  };
}

/**
 * Maps generic AdaptedContentList to the TimelineSection block props —
 * `ui: "TimelineSection"`. Same data source as adaptTimelineSectionWithBadges
 * (`subItems` — there is no separate `tags`-based path), but rendered as the
 * original icon + comma-joined text row instead of a TechBadgeCloud.
 */
export function adaptTimelineSection(
  data: AdaptedContentList
): TimelineSectionProps {
  return {
    entries: data.customEntries.map((item) => {
      const metaRows = buildBaseMetaRows(item);
      if (item.subItems && item.subItems.length > 0) {
        metaRows.push({
          icon: {
            iconCode: "fa/FaStackOverflow",
            name: "Tech Stack",
            size: "18",
          },
          text: item.subItems.map((subItem) => subItem.title).join(", "),
        });
      }

      return {
        title: item.title,
        indicatorIcon: item.icon,
        metaRows,
        description: buildEntryDescription(item),
      };
    }),
  };
}

/**
 * Maps generic AdaptedContentList to the TimelineSection block props —
 * `ui: "TimelineSectionWithBadges"`. Same `subItems` data source as
 * adaptTimelineSection, rendered as a TechBadgeCloud (each subItem's own
 * icon) instead of comma-joined text.
 */
export function adaptTimelineSectionWithBadges(
  data: AdaptedContentList
): TimelineSectionProps {
  return {
    entries: data.customEntries.map((item) => {
      const metaRows = buildBaseMetaRows(item);
      if (item.subItems && item.subItems.length > 0) {
        metaRows.push({
          type: "badges",
          items: item.subItems.map((subItem) => ({
            label: subItem.title,
            icon: subItem.icons?.[0],
          })),
        });
      }

      return {
        title: item.title,
        indicatorIcon: item.icon,
        metaRows,
        description: buildEntryDescription(item),
      };
    }),
  };
}
