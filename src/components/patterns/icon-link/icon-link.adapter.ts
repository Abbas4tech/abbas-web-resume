import type { IconLinkProps } from "./icon-link";

/**
 * Future: replace input type with Contentful SDK auto-generated Asset type.
 */
export function adaptIconLink(input: {
  description: string;
  title: string;
  url: string;
  width: number;
  height: number;
}): IconLinkProps {
  return {
    href: input.description,
    label: input.title,
    iconSrc: input.url,
    iconWidth: input.width,
    iconHeight: input.height,
  };
}
