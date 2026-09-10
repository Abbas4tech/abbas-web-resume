import type { Document } from "@contentful/rich-text-types";
import type { ContentListFieldsFragment } from "../generated/contentful-sdk.generated";
import { adaptContentItem } from "./content-item";

export function adaptContentList(
  item: ContentListFieldsFragment | null | undefined
) {
  if (!item) {
    return null;
  }

  return {
    __typename: "ContentList" as const,
    id: item.sys.id || "",
    internalName: item.internalName || "",
    // Falls back to an actually-registered LIST_BLOCK_REGISTRY key ("Grid"
    // was never registered, so an entry left blank in Contentful used to
    // render nothing in production — see ADR 0024).
    ui: item.ui || "CardGrid",
    title: item.title || "",
    description: item.description?.json as Document,
    category: item.entries || "Custom",
    customEntries: (item.customEntriesCollection?.items || [])
      .map((entry) => adaptContentItem(entry))
      .filter(
        (entry): entry is NonNullable<ReturnType<typeof adaptContentItem>> =>
          entry !== null
      ),
  };
}

export type AdaptedContentList = NonNullable<
  ReturnType<typeof adaptContentList>
>;

export function isAdaptedContentList(
  item: unknown
): item is AdaptedContentList {
  return (
    typeof item === "object" &&
    item !== null &&
    "__typename" in item &&
    (item as Record<string, unknown>).__typename === "ContentList"
  );
}
