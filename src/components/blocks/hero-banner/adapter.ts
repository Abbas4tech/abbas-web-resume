import { adaptSocialLink } from "@/components/patterns/social-link/adapter";
import type { HeroBannerProps } from "./types";

/**
 * Future: replace input type with Contentful SDK auto-generated AppData["bannerData"] type.
 */
export function adaptHeroBanner(input: {
  bannerAnimation?: string;
  bannerImage: { url: string; title: string; width: number; height: number };
  profilePicture: { url: string; title: string; width: number; height: number };
  socialLinksCollection: {
    items: Array<{
      description: string;
      title: string;
      url: string;
      width: number;
      height: number;
    }>;
  };
}): HeroBannerProps {
  return {
    bannerImageSrc: input.bannerImage.url,
    bannerImageAlt: input.bannerImage.title,
    bannerImageWidth: input.bannerImage.width,
    bannerImageHeight: input.bannerImage.height,
    avatarSrc: input.profilePicture.url,
    avatarAlt: input.profilePicture.title,
    avatarWidth: input.profilePicture.width,
    avatarHeight: input.profilePicture.height,
    animation: input.bannerAnimation,
    socialLinks: input.socialLinksCollection.items.map(adaptSocialLink),
  };
}
