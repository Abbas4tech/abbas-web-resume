import type { SocialLinkProps } from "./social-link";

/**
 * Future: replace input type with Contentful SDK auto-generated Asset type.
 */
export function adaptSocialLink(input: {
  description: string;
  title: string;
  url: string;
  width: number;
  height: number;
}): SocialLinkProps {
  return {
    href: input.description,
    label: input.title,
    iconSrc: input.url,
    iconWidth: input.width,
    iconHeight: input.height,
  };
}
