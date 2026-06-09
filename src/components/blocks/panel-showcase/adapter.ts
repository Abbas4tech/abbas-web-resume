import type { IconProps } from "@/components/elements/icon/types";
import { adaptIconProgressRow } from "@/components/patterns/icon-progress-row/adapter";
import type { PanelShowcaseProps } from "./types";

/**
 * Maps Contentful "Skills Page" data directly to the PanelShowcase block.
 */
export function adaptPanelShowcase(input: {
  contentAnimation?: string;
  pageData: {
    skillsSetCollection: {
      items: Array<{
        title: string;
        icon: IconProps;
        skillsArrayCollection: {
          items: Array<{
            skillProgress: number;
            skillIconsCollection: { items: IconProps[] };
          }>;
        };
      }>;
    };
  };
}): PanelShowcaseProps {
  return {
    animation: input.contentAnimation,
    panels: input.pageData.skillsSetCollection.items.map((panel) => ({
      title: panel.title,
      headingIcon: panel.icon,
      rows: panel.skillsArrayCollection.items.map((row) => ({
        progress: adaptIconProgressRow({ skillProgress: row.skillProgress })
          .progress,
        icons: row.skillIconsCollection.items,
      })),
    })),
  };
}
