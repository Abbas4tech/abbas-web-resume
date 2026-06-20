import type { LinkFieldsFragment } from "../generated/contentful-sdk.generated";
import { adaptIcon } from "./icon";

export function adaptLink(item: LinkFieldsFragment | null | undefined) {
  if (!item) {
    return null;
  }

  const href = item.url || item.page?.path || "#";

  return {
    __typename: "Link" as const,
    id: item.sys.id || "",
    internalName: item.internalName || "",
    text: item.text || "",
    href,
    icon: adaptIcon(item.icon),
  };
}

export type AdaptedLink = NonNullable<ReturnType<typeof adaptLink>>;

export function isAdaptedLink(item: unknown): item is AdaptedLink {
  return (
    typeof item === "object" &&
    item !== null &&
    "__typename" in item &&
    (item as Record<string, unknown>).__typename === "Link"
  );
}
