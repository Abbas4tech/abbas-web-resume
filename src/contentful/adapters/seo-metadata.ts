import type {
  ImageFieldsFragment,
  SeoMetadataFieldsFragment,
} from "../generated/contentful-sdk.generated";
import { adaptImage } from "./image";

export function adaptSeoMetadata(
  item: SeoMetadataFieldsFragment | null | undefined
) {
  if (!item) {
    return null;
  }

  return {
    __typename: "SeoMetadata" as const,
    id: item.sys.id || "",
    internalName: item.internalName || "",
    title: item.title || "",
    description: item.description || "",
    keywords: (item.keywords || []).filter((k): k is string => k !== null),
    canonicalUrl: item.canonicalUrl || "",
    noIndex: item.noIndex ?? false,
    noFollow: item.noFollow ?? false,
    ogImage: adaptImage(item.ogImage as ImageFieldsFragment),
  };
}

export type AdaptedSeoMetadata = NonNullable<
  ReturnType<typeof adaptSeoMetadata>
>;

export function isAdaptedSeoMetadata(
  item: unknown
): item is AdaptedSeoMetadata {
  return (
    typeof item === "object" &&
    item !== null &&
    "__typename" in item &&
    (item as Record<string, unknown>).__typename === "SeoMetadata"
  );
}
