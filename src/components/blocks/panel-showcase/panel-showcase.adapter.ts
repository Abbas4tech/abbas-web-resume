import type { AdaptedContentItem } from "@/contentful/adapters/content-item";
import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import type { PanelShowcaseProps, PanelShowcaseRow } from "./panel-showcase";

function buildRows(
  panel: AdaptedContentItem,
  variant: PanelShowcaseRow["variant"]
): PanelShowcaseRow[] {
  return (panel.subItems || []).map((row) => ({
    label: row.title,
    progress: row.progress || 0,
    icons: row.icons || [],
    variant,
  }));
}

/**
 * Maps generic AdaptedContentList to the PanelShowcase block props —
 * `ui: "PanelShowcase"`. Same `subItems` data source as
 * adaptPanelShowcaseWithRadialProgress, rendered as the original linear
 * Progress bar instead of a RadialProgress ring.
 */
export function adaptPanelShowcase(
  data: AdaptedContentList
): PanelShowcaseProps {
  return {
    panels: data.customEntries.map((panel) => ({
      title: panel.title,
      headingIcon: panel.icon || { iconCode: "" },
      rows: buildRows(panel, "linear"),
    })),
  };
}

/**
 * Maps generic AdaptedContentList to the PanelShowcase block props —
 * `ui: "PanelShowcaseWithRadialProgress"`. Same `subItems` data as
 * adaptPanelShowcase, rendered as a RadialProgress ring per row instead of a
 * linear Progress bar.
 */
export function adaptPanelShowcaseWithRadialProgress(
  data: AdaptedContentList
): PanelShowcaseProps {
  return {
    panels: data.customEntries.map((panel) => ({
      title: panel.title,
      headingIcon: panel.icon || { iconCode: "" },
      rows: buildRows(panel, "radial"),
    })),
  };
}

/**
 * Maps generic AdaptedContentList to the PanelShowcase block props —
 * `ui: "SkillsMatrix"`. Same `subItems` data as adaptPanelShowcase, rendered
 * as one dense table (category / skill / proficiency) instead of the
 * per-panel MockupWindow grid.
 */
export function adaptSkillsMatrix(
  data: AdaptedContentList
): PanelShowcaseProps {
  return {
    layout: "table",
    panels: data.customEntries.map((panel) => ({
      title: panel.title,
      headingIcon: panel.icon || { iconCode: "" },
      rows: buildRows(panel, "linear"),
    })),
  };
}
