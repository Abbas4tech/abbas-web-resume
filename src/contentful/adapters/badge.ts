import type { BadgeFieldsFragment } from "../generated/contentful-sdk.generated";
import { adaptIcon } from "./icon";

export function adaptBadge(item: BadgeFieldsFragment | null | undefined) {
  if (!item) {
    return null;
  }

  return {
    __typename: "Badge" as const,
    id: item.sys.id || "",
    internalName: item.internalName || "",
    title: item.title || "",
    progress: item.progress || 0,
    icon: adaptIcon(item.icon),
  };
}

export type AdaptedBadge = NonNullable<ReturnType<typeof adaptBadge>>;

export function isAdaptedBadge(item: unknown): item is AdaptedBadge {
  return (
    typeof item === "object" &&
    item !== null &&
    "__typename" in item &&
    (item as Record<string, unknown>).__typename === "Badge"
  );
}
