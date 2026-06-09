import type { Document } from "@contentful/rich-text-types";
import { adaptInfoStatRow } from "@/components/patterns/info-stat-row/adapter";
import { adaptRichText } from "@/components/patterns/rich-text/adapter";
import type { BioSectionProps } from "./types";

/**
 * Maps Contentful "About Page" data directly to the BioSection block.
 */
export function adaptBioSection(input: {
  contentAnimation?: string;
  pageData: {
    description: { json: Document };
    infoCollection: {
      items: Array<{
        title: string;
        value: string;
        icon: {
          iconCode?: string;
          classes?: string[];
          showTooltip?: boolean;
          name?: string;
        };
      }>;
    };
  };
}): BioSectionProps {
  return {
    animation: input.contentAnimation,
    description: adaptRichText({ json: input.pageData.description.json }),
    infoRows: input.pageData.infoCollection.items.map(adaptInfoStatRow),
  };
}
