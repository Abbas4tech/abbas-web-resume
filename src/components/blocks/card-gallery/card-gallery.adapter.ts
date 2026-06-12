import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import type { CardGalleryProps } from "./card-gallery";

/**
 * Maps generic AdaptedContentList to the CardGallery block props.
 */
export function adaptCardGallery(data: AdaptedContentList): CardGalleryProps {
  return {
    animation: undefined,
    cards: data.customEntries.map((item) => ({
      title: item.title,
      description: item.subtitle || "",
      href: item.links?.[0]?.href || "#",
      linkIcon: item.icon || { iconCode: "" },
      thumbnailAlt: item.image?.alternativeText || item.image?.title || "",
      thumbnailSrc: item.image?.url || "",
      thumbnailWidth: item.image?.width || 0,
      thumbnailHeight: item.image?.height || 0,
    })),
  };
}
