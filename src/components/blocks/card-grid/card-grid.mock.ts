import type { CardGridProps } from "./card-grid";

export const baseMock: CardGridProps = {
  animation: "fade-up",
  cards: [
    {
      title: "Project Alpha",
      description: "A cool next.js project.",
      links: [
        {
          __typename: "Link",
          id: "link-alpha",
          internalName: "Alpha Link",
          text: "Link",
          href: "https://example.com/alpha",
          icon: {
            __typename: "Icon",
            id: "icon-alpha",
            internalName: "Icon Alpha",
            name: "Link",
            library: "md",
            title: "Link",
            color: "currentColor",
            iconCode: "md/MdLink",
            showTooltip: false,
          },
        },
      ],
      thumbnailAlt: "Project Alpha Thumbnail",
      thumbnailSrc: "https://placehold.co/600x400/png",
      thumbnailHeight: 400,
      thumbnailWidth: 600,
    },
    {
      title: "Project Beta",
      description: "An innovative React application.",
      links: [
        {
          __typename: "Link",
          id: "link-beta",
          internalName: "Beta Link",
          text: "Open",
          href: "https://example.com/beta",
          icon: {
            __typename: "Icon",
            id: "icon-beta",
            internalName: "Icon Beta",
            name: "Open",
            library: "md",
            title: "Open",
            color: "currentColor",
            iconCode: "md/MdOpenInNew",
            showTooltip: false,
          },
        },
      ],
      thumbnailAlt: "Project Beta Thumbnail",
      thumbnailSrc: "https://placehold.co/600x400/png",
      thumbnailHeight: 400,
      thumbnailWidth: 600,
    },
  ],
};
