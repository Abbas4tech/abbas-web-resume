import type { AdaptedContentSection } from "@/contentful/adapters/content-section";
import type { HeroBannerProps } from "./hero-banner";

/**
 * Maps generic AdaptedContentSection to the HeroBanner block props.
 */
export function adaptHeroBanner(data: AdaptedContentSection): HeroBannerProps {
  const item = data.entry?.__typename === "ContentItem" ? data.entry : null;
  return {
    animation: undefined,
    bannerImageSrc: item?.image?.url || "",
    bannerImageAlt: item?.image?.title || "",
    bannerImageWidth: item?.image?.width || 0,
    bannerImageHeight: item?.image?.height || 0,
    // The generic schema only provides one image per item, so we fallback avatar if unavailable
    avatarSrc: item?.image?.url || "",
    avatarAlt: "",
    avatarWidth: 0,
    avatarHeight: 0,
    iconLinks: (item?.links || []).map((link) => ({
      label: link.text,
      href: link.href || "#",
      // Generic Link doesn't have an icon image, fallback to empty or handle gracefully in component
      iconSrc: "",
      iconWidth: 0,
      iconHeight: 0,
    })),
  };
}
