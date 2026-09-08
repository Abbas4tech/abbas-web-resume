import { BLOCKS } from "@contentful/rich-text-types";
import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import type { ContentTabsProps } from "./content-tabs";

/**
 * Maps generic AdaptedContentList to the ContentTabs block props.
 * Each customEntry's title becomes the tab label, body the panel content.
 */
export function adaptContentTabs(data: AdaptedContentList): ContentTabsProps {
  return {
    tabs: data.customEntries.map((item) => ({
      label: item.title,
      content: item.body || {
        nodeType: BLOCKS.DOCUMENT,
        data: {},
        content: [],
      },
    })),
  };
}
