import type { ImageFieldsFragment } from "../generated/contentful-sdk.generated";

export function adaptImage(item: ImageFieldsFragment | null | undefined) {
  if (!item?.image) {
    return null;
  }

  return {
    __typename: "Image" as const,
    id: item.sys.id || "",
    internalName: item.internalName || "",
    alternativeText: item.alternativeText || "",
    caption: item.caption || "",
    url: item.image.url || "",
    title: item.image.title || "",
    description: item.image.description || "",
    width: item.image.width || 0,
    height: item.image.height || 0,
  };
}

export type AdaptedImage = NonNullable<ReturnType<typeof adaptImage>>;

export function isAdaptedImage(item: unknown): item is AdaptedImage {
  return (
    typeof item === "object" &&
    item !== null &&
    "__typename" in item &&
    (item as Record<string, unknown>).__typename === "Image"
  );
}
