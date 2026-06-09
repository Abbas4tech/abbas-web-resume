import type { HTMLAttributes } from "react";
import type { ProjectPreviewCardProps } from "@/components/patterns/project-preview-card/types";

export interface CardGalleryProps extends HTMLAttributes<HTMLDivElement> {
  animation?: string;
  cards: ProjectPreviewCardProps[];
}
