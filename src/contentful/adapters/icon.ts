import type { IconFieldsFragment } from "../generated/contentful-sdk.generated";

export function adaptIcon(item: IconFieldsFragment | undefined | null) {
  if (!item) {
    return;
  }

  // Prefer iconCode, fallback to name.
  const rawCode = item.iconCode || item.name || "";

  // Only prefix if we have a library and the code isn't already prefixed
  const iconCode =
    item.library && rawCode && !rawCode.includes("/")
      ? `${item.library}/${rawCode}`
      : rawCode;

  return {
    __typename: "Icon" as const,
    id: item.sys.id || "",
    internalName: item.internalName || "",
    name: item.name || "",
    library: item.library || "",
    title: item.title || "",
    color: item.color || "",
    iconCode,
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
