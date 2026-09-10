import type { TechBadgeCloudProps } from "@/components/patterns/tech-badge-cloud/tech-badge-cloud";
import type { AdaptedContentList } from "@/contentful/adapters/content-list";

/**
 * Maps generic AdaptedContentList to the TechBadgeCloud block props.
 */
export function adaptTechBadgeCloud(
  data: AdaptedContentList
): TechBadgeCloudProps {
  return {
    items: data.customEntries.map((item) => ({
      label: item.title,
      icon: item.icon ?? undefined,
    })),
  };
}
