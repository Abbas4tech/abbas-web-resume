import type { ContentSectionFieldsFragment } from "../generated/contentful-sdk.generated";
import { adaptEntry } from "./content-item";

export function adaptContentSection(
  item: ContentSectionFieldsFragment | null | undefined
) {
  if (!item?.entry) {
    return null;
  }

  const entry = adaptEntry(item.entry);
  if (!entry) {
    return null;
  }

  return {
    __typename: "ContentSection" as const,
    id: item.sys.id || "",
    internalName: item.internalName || "",
    // Falls back to an actually-registered SECTION_BLOCK_REGISTRY key
    // ("Standard" and "Grid" were never registered, so an entry left blank
    // in Contentful used to render nothing in production — see ADR 0024).
    ui: item.ui || "HeroBanner",
    entry,
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
