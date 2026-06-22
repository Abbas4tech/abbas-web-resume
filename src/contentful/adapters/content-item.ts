import type { Document } from "@contentful/rich-text-types";
import type {
  ContentItemFieldsFragment,
  StatItemFieldsFragment,
} from "../generated/contentful-sdk.generated";
import { adaptIcon } from "./icon";
import { adaptImage } from "./image";
import { adaptLink } from "./link";
import { type AdaptedStatItem, adaptStatItem } from "./stat-item";

export function adaptContentItem(
  item: ContentItemFieldsFragment | null | undefined
) {
  if (item?.__typename !== "ContentItem") {
    return null;
  }

  return {
    __typename: "ContentItem" as const,
    id: item.sys.id || "",
    entryField: item.entryField || "",
    title: item.title || "",
    subtitle: item.subtitle || "",
    description: item.description || "",
    startDate: item.startDate ? new Date(item.startDate as string) : null,
    endDate: item.endDate ? new Date(item.endDate as string) : null,
    tags: (item.tags || []).filter((tag): tag is string => tag !== null),
    body: (item.body?.json as Document) || null,
    image: adaptImage(item.image),
    coverImage: adaptImage(item.coverImage),
    icon: adaptIcon(item.icon),
    links: (item.linksCollection?.items || [])
      .map((link) => adaptLink(link))
      .filter(
        (link): link is NonNullable<ReturnType<typeof adaptLink>> =>
          link !== null
      ),
    subItems: (item.subItemsCollection?.items || [])
      .map((statItem) => adaptStatItem(statItem))
      .filter(
        (statItem): statItem is NonNullable<ReturnType<typeof adaptStatItem>> =>
          statItem !== null
      ),
  };
}

export type AdaptedContentItem = NonNullable<
  ReturnType<typeof adaptContentItem>
>;

export type AdaptedEntry = AdaptedContentItem | AdaptedStatItem;

export function adaptEntry(
  item: ContentItemFieldsFragment | StatItemFieldsFragment | null | undefined
): AdaptedEntry | null {
  if (!item) {
    return null;
  }
  if (item.__typename === "ContentItem") {
    return adaptContentItem(item);
  }
  if (item.__typename === "StatItem") {
    return adaptStatItem(item);
  }
  return null;
}

export function isAdaptedContentItem(
  item: unknown
): item is AdaptedContentItem {
  return (
    typeof item === "object" &&
    item !== null &&
    "__typename" in item &&
    (item as Record<string, unknown>).__typename === "ContentItem"
  );
}
