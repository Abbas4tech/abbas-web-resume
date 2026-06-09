import type { ProjectPreviewCardProps } from "./types";

export const baseMock: ProjectPreviewCardProps = {
  title: "AI Assistant Platform",
  description:
    "A robust AI assistant built with Next.js, TailwindCSS, and LangChain.",
  href: "https://example.com/ai-platform",
  linkIcon: { iconCode: "md/MdOpenInNew", name: "Open Project" },
  thumbnailAlt: "AI Assistant Dashboard Preview",
  thumbnailHeight: 400,
  thumbnailSrc: "https://placehold.co/600x400/png",
  thumbnailWidth: 600,
};
