import type { Document } from "@contentful/rich-text-types";
import type { HTMLAttributes } from "react";
import type { InfoStatRowProps } from "@/components/patterns/info-stat-row/types";

export interface BioSectionProps extends HTMLAttributes<HTMLDivElement> {
  animation?: string;
  description?: Document;
  infoRows: InfoStatRowProps[];
}
