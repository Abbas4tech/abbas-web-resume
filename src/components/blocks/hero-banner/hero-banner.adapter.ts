import type { AdaptedContentSection } from "@/contentful/adapters/content-section";
import type { HeroBannerProps } from "./hero-banner";

export function adaptHeroBanner(data: AdaptedContentSection): HeroBannerProps {
  const item = data.entry?.__typename === "ContentItem" ? data.entry : null;
  return {
    bannerImage: item?.coverImage || null,
    avatarImage: item?.image || null,
    iconLinks: (item?.links || []).map((link) => ({
      label: link.text,
      href: link.href || "#",
      iconCode: link.icon?.iconCode || "",
    })),
  };
}
