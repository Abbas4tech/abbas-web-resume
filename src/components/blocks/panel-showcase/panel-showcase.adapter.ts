import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import type { PanelShowcaseProps } from "./panel-showcase";

/**
 * Maps generic AdaptedContentList to the PanelShowcase block props.
 */
export function adaptPanelShowcase(
  data: AdaptedContentList
): PanelShowcaseProps {
  return {
    panels: data.customEntries.map((panel) => ({
      title: panel.title,
      headingIcon: panel.icon || { iconCode: "" },
      rows: (panel.subItems || []).map((row) => ({
        progress: row.progress || 0,
        icons: row.icons || [],
      })),
    })),
  };
}
