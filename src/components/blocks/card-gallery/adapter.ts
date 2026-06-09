import { adaptProjectPreviewCard } from "@/components/patterns/project-preview-card/adapter";
import type { CardGalleryProps } from "./types";

/**
 * Maps Contentful "Projects Page" data directly to the CardGallery block.
 */
export function adaptCardGallery(input: {
  contentAnimation?: string;
  pageData: {
    projectsCollection: {
      // biome-ignore lint/suspicious/noExplicitAny: temporary
      items: any[];
    };
  };
}): CardGalleryProps {
  return {
    animation: input.contentAnimation,
    cards: input.pageData.projectsCollection.items.map((item) =>
      adaptProjectPreviewCard(
        item as Parameters<typeof adaptProjectPreviewCard>[0]
      )
    ),
  };
}
