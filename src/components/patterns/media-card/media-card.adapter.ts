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
    links: [
      {
        __typename: "Link",
        id: "deployed-link",
        internalName: "Deployed Link",
        text: input.deployedLinkIcon.name || "Link",
        href: input.deployedLink,
        icon: {
          __typename: "Icon",
          id: "icon-deployed-link",
          internalName: "Deployed Link Icon",
          name: input.deployedLinkIcon.name || "Link",
          library: "md",
          title: input.deployedLinkIcon.name || "Link",
          color: "currentColor",
          iconCode: input.deployedLinkIcon.iconCode || "md/MdLink",
          showTooltip: !!input.deployedLinkIcon.showTooltip,
        },
      },
    ],
  };
}
