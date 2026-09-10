import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import type { CardGridProps } from "./card-grid";

/**
 * Maps generic AdaptedContentList to the CardGrid block props.
 */
export function adaptCardGrid(data: AdaptedContentList): CardGridProps {
  return {
    cards: data.customEntries.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description || "",
      links: item.links,
      thumbnailAlt: item.image?.alternativeText || item.image?.title || "",
      thumbnailSrc: item.image?.url || "",
      thumbnailWidth: item.image?.width || 0,
      thumbnailHeight: item.image?.height || 0,
    })),
  };
}
