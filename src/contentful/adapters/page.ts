import type { Document } from "@contentful/rich-text-types";
import type {
  ContentListFieldsFragment,
  ContentSectionFieldsFragment,
  PageFieldsFragment,
} from "../generated/contentful-sdk.generated";
import { adaptContentList } from "./content-list";
import { adaptContentSection } from "./content-section";
import { adaptSeoMetadata } from "./seo-metadata";

type ContentBlock =
  | NonNullable<ReturnType<typeof adaptContentList>>
  | NonNullable<ReturnType<typeof adaptContentSection>>;

type RawContentBlock = NonNullable<
  PageFieldsFragment["topContentAreaCollection"]
>["items"][number];

function isContentList(
  item: RawContentBlock
): item is RawContentBlock & ContentListFieldsFragment {
  return (
    item != null &&
    ("customEntriesCollection" in item ||
      "entries" in item ||
      (item as Record<string, unknown>).__typename === "ContentList")
  );
}

function isContentSection(
  item: RawContentBlock
): item is RawContentBlock & ContentSectionFieldsFragment {
  return (
    item != null &&
    ("entry" in item ||
      (item as Record<string, unknown>).__typename === "ContentSection")
  );
}

function adaptContentBlock(item: RawContentBlock): ContentBlock | null {
  if (!item) {
    return null;
  }

  if (isContentList(item)) {
    return adaptContentList(item);
  }

  if (isContentSection(item)) {
    return adaptContentSection(item);
  }

  return null;
}

export function adaptPage(item: PageFieldsFragment | null | undefined) {
  if (!item) {
    return null;
  }

  return {
    __typename: "Page" as const,
    id: item.sys.id || "",
    internalName: item.internalName || "",
    title: item.title || "",
    path: item.path || "",
    description: (item.description?.json as Document) || null,
    seo: adaptSeoMetadata(item.seo),
    topContentArea: (item.topContentAreaCollection?.items || [])
      .map(adaptContentBlock)
      .filter((block): block is ContentBlock => block !== null),
    bottomContentArea: (item.bottomContentAreaCollection?.items || [])
      .map(adaptContentBlock)
      .filter((block): block is ContentBlock => block !== null),
  };
}

export type AdaptedPage = NonNullable<ReturnType<typeof adaptPage>>;

export function isAdaptedPage(item: unknown): item is AdaptedPage {
  return (
    typeof item === "object" &&
    item !== null &&
    "__typename" in item &&
    (item as Record<string, unknown>).__typename === "Page"
  );
}
