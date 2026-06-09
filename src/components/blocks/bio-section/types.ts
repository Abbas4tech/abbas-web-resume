import type { HTMLAttributes } from "react";
import type { InfoStatRowProps } from "@/components/patterns/info-stat-row/types";
import type { RichTextProps } from "@/components/patterns/rich-text/types";

export interface BioSectionProps extends HTMLAttributes<HTMLDivElement> {
  animation?: string;
  description: Pick<RichTextProps, "document">;
  infoRows: InfoStatRowProps[];
}
