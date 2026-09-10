import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import type { TestimonialWallProps } from "./testimonial-wall";

export function adaptTestimonialWall(
  data: AdaptedContentList
): TestimonialWallProps {
  return {
    testimonials: data.customEntries.map((item) => ({
      author: item.title,
      meta: item.subtitle || undefined,
      message: item.description,
      avatarSrc: item.image?.url,
      avatarAlt: item.image?.alternativeText || item.image?.title || undefined,
    })),
  };
}
