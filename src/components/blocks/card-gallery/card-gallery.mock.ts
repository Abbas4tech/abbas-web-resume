import type { CardGalleryProps } from "./card-gallery";

export const baseMock: CardGalleryProps = {
  animation: "fade-up",
  cards: [
    {
      title: "Project Alpha",
      description: "A cool next.js project.",
      href: "https://example.com/alpha",
      linkIcon: { iconCode: "md/MdLink", name: "Link" },
      thumbnailAlt: "Project Alpha Thumbnail",
      thumbnailSrc: "https://placehold.co/600x400/png",
      thumbnailHeight: 400,
      thumbnailWidth: 600,
    },
    {
      title: "Project Beta",
      description: "An innovative React application.",
      href: "https://example.com/beta",
      linkIcon: { iconCode: "md/MdOpenInNew", name: "Open" },
      thumbnailAlt: "Project Beta Thumbnail",
      thumbnailSrc: "https://placehold.co/600x400/png",
      thumbnailHeight: 400,
      thumbnailWidth: 600,
    },
  ],
};
