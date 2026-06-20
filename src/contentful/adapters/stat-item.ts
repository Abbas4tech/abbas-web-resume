import type { StatItemFieldsFragment } from "../generated/contentful-sdk.generated";
import { adaptIcon } from "./icon";

export function adaptStatItem(item: StatItemFieldsFragment | null | undefined) {
  if (!item) {
    return null;
  }

  return {
    __typename: "StatItem" as const,
    id: item.sys.id || "",
    internalName: item.internalName || "",
    title: item.title || "",
    progress: item.progress || 0,
    icons: (item.iconsCollection?.items || [])
      .map(adaptIcon)
      .filter(
        (icon): icon is NonNullable<ReturnType<typeof adaptIcon>> =>
          icon !== null
      ),
  };
}

export type AdaptedStatItem = NonNullable<ReturnType<typeof adaptStatItem>>;

export function isAdaptedStatItem(item: unknown): item is AdaptedStatItem {
  return (
    typeof item === "object" &&
    item !== null &&
    "__typename" in item &&
    (item as Record<string, unknown>).__typename === "StatItem"
  );
}
