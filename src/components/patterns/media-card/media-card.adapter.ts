import type { MediaCardProps } from "./media-card";

/**
 * Future: replace input type with Contentful SDK auto-generated Project type.
 */
export function adaptMediaCard(input: {
  title: string;
  description: string;
  thumbnail: { url: string; fileName: string; width: number; height: number };
  deployedLink: string;
  deployedLinkIcon: {
    iconCode?: string;
    classes?: string[];
    name?: string;
    showTooltip?: boolean;
  };
}): MediaCardProps {
  return {
    title: input.title,
    description: input.description,
    thumbnailSrc: input.thumbnail.url,
    thumbnailAlt: input.thumbnail.fileName,
    thumbnailWidth: input.thumbnail.width,
    thumbnailHeight: input.thumbnail.height,
    href: input.deployedLink,
    linkIcon: input.deployedLinkIcon,
  };
}
