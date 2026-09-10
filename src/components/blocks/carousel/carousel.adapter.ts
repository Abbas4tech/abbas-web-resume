import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import type { CarouselProps } from "./carousel";

export function adaptCarousel(data: AdaptedContentList): CarouselProps {
  return {
    slides: data.customEntries.map((item) => ({
      id: item.id,
      title: item.title,
      description: item.description || undefined,
      links: item.links,
      imageAlt:
        item.coverImage?.alternativeText || item.coverImage?.title || "",
      imageSrc: item.coverImage?.url || "",
      imageWidth: item.coverImage?.width || 0,
      imageHeight: item.coverImage?.height || 0,
    })),
  };
}
