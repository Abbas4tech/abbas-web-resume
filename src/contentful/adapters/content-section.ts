import type { ContentSectionFieldsFragment } from "../generated/contentful-sdk.generated";
import { adaptContentItem } from "./content-item";

export function adaptContentSection(
  item: ContentSectionFieldsFragment | null | undefined
) {
  if (!item) {
    return null;
  }

  return {
    __typename: "ContentSection" as const,
    id: item.sys.id || "",
    internalName: item.internalName || "",
    ui: item.ui || "Standard",
    entry: adaptContentItem(item.entry),
  };
}

export type AdaptedContentSection = NonNullable<
  ReturnType<typeof adaptContentSection>
>;

export function isAdaptedContentSection(
  item: unknown
): item is AdaptedContentSection {
  return (
    typeof item === "object" &&
    item !== null &&
    "__typename" in item &&
    (item as Record<string, unknown>).__typename === "ContentSection"
  );
}
