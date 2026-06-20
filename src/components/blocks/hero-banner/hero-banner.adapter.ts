import type { AdaptedContentSection } from "@/contentful/adapters/content-section";
import type { AdaptedImage } from "@/contentful/adapters/image";
import type { HeroBannerProps } from "./hero-banner";

export function adaptHeroBanner(
  data: AdaptedContentSection,
  siteLogo: AdaptedImage | null
): HeroBannerProps {
  const item = data.entry?.__typename === "ContentItem" ? data.entry : null;
  return {
    animation: "fade-down",
    bannerImage: item?.image || null,
    avatarImage: siteLogo,
    iconLinks: (item?.links || []).map((link) => ({
      label: link.text,
      href: link.href || "#",
      iconSrc: "",
      iconWidth: 0,
      iconHeight: 0,
    })),
  };
}
