import type { IconFieldsFragment } from "../generated/contentful-sdk.generated";

export function adaptIcon(item: IconFieldsFragment | null | undefined) {
  if (!item) {
    return null;
  }

  return {
    __typename: "Icon" as const,
    id: item.sys.id || "",
    internalName: item.internalName || "",
    name: item.name || "",
    library: item.library || "",
    title: item.title || "",
    color: item.color || "",
    iconCode: item.iconCode || "",
    showTooltip: item.showTooltip ?? false,
  };
}

export type AdaptedIcon = NonNullable<ReturnType<typeof adaptIcon>>;

export function isAdaptedIcon(item: unknown): item is AdaptedIcon {
  return (
    typeof item === "object" &&
    item !== null &&
    "__typename" in item &&
    (item as Record<string, unknown>).__typename === "Icon"
  );
}
