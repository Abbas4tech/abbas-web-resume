import type { MediaCardProps } from "./media-card";

export const baseMock: MediaCardProps = {
  title: "AI Assistant Platform",
  description:
    "A robust AI assistant built with Next.js, TailwindCSS, and LangChain.",
  links: [
    {
      __typename: "Link",
      id: "ai-platform-link",
      internalName: "AI Platform Link",
      text: "Open Project",
      href: "https://example.com/ai-platform",
      icon: {
        __typename: "Icon",
        id: "icon-1",
        internalName: "Icon 1",
        name: "Open Project",
        library: "md",
        title: "Open Project",
        color: "currentColor",
        iconCode: "md/MdOpenInNew",
        showTooltip: false,
      },
    },
  ],
  thumbnailAlt: "AI Assistant Dashboard Preview",
  thumbnailHeight: 400,
  thumbnailSrc: "https://placehold.co/600x400/png",
  thumbnailWidth: 600,
};
