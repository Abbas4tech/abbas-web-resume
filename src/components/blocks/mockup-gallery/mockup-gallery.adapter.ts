import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import type { MockupGalleryItem, MockupGalleryProps } from "./mockup-gallery";

function buildItems(data: AdaptedContentList): MockupGalleryItem[] {
  return data.customEntries.map((entry) => ({
    id: entry.id,
    title: entry.title,
    description: entry.description || undefined,
    links: entry.links,
    imageAlt: entry.image?.alternativeText || entry.image?.title || "",
    imageSrc: entry.image?.url || "",
    imageWidth: entry.image?.width || 0,
    imageHeight: entry.image?.height || 0,
  }));
}

/**
 * Maps generic AdaptedContentList to the MockupGallery block props —
 * `ui: "MockupGalleryBrowser"`. Same `customEntries.image` data source as
 * adaptCardGrid, rendered inside a MockupBrowser frame instead of a plain
 * Card.
 */
export function adaptMockupGalleryBrowser(
  data: AdaptedContentList
): MockupGalleryProps {
  return { frame: "browser", items: buildItems(data) };
}

/**
 * Maps generic AdaptedContentList to the MockupGallery block props —
 * `ui: "MockupGalleryPhone"`. Same data as adaptMockupGalleryBrowser,
 * rendered inside a MockupPhone frame instead.
 */
export function adaptMockupGalleryPhone(
  data: AdaptedContentList
): MockupGalleryProps {
  return { frame: "phone", items: buildItems(data) };
}
