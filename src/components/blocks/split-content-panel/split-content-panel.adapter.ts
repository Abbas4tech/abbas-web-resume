import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import type { AdaptedContentSection } from "@/contentful/adapters/content-section";
import type { SplitContentPanelProps } from "./split-content-panel";

/**
 * Maps generic AdaptedContentList to the SplitContentPanel block props.
 */
export function adaptSplitContentPanel(
  data: AdaptedContentList
): SplitContentPanelProps {
  return {
    description: data.description,
    infoRows: (data.customEntries || []).map((item) => ({
      label: item.title,
      value: item.description || "",
      icon: item.icon,
    })),
  };
}

/**
 * Maps a single-entry AdaptedContentSection to the SplitContentPanel block
 * props: the entry's rich-text body becomes the description, and its
 * subItems (StatItem entries) become the info rows, matching
 * docs/contentful/content-model.md's documented (but previously unwired)
 * intent for ContentSection to support this block.
 */
export function adaptSplitContentPanelFromSection(
  data: AdaptedContentSection
): SplitContentPanelProps {
  const item = data.entry?.__typename === "ContentItem" ? data.entry : null;

  return {
    description: item?.body || undefined,
    infoRows: (item?.subItems || []).map((subItem) => ({
      label: subItem.title,
      value: `${subItem.progress}%`,
      icon: subItem.icons?.[0],
    })),
  };
}
