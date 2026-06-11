import type { Document } from "@contentful/rich-text-types";
import type { ContentItemFieldsFragment } from "../generated/contentful-sdk.generated";
import { adaptBadge } from "./badge";
import { adaptIcon } from "./icon";
import { adaptImage } from "./image";
import { adaptLink } from "./link";

export function adaptContentItem(
  item: ContentItemFieldsFragment | null | undefined
) {
  if (!item) {
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
    progress: item.progress || 0,
    body: (item.body?.json as Document) || null,
    image: adaptImage(item.image),
    icon: adaptIcon(item.icon),
    links: (item.linksCollection?.items || [])
      .map((link) => adaptLink(link))
      .filter(
        (link): link is NonNullable<ReturnType<typeof adaptLink>> =>
          link !== null
      ),
    subItems: (item.subItemsCollection?.items || [])
      .map((badge) => adaptBadge(badge))
      .filter(
        (badge): badge is NonNullable<ReturnType<typeof adaptBadge>> =>
          badge !== null
      ),
  };
}

export type AdaptedContentItem = NonNullable<
  ReturnType<typeof adaptContentItem>
>;

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
