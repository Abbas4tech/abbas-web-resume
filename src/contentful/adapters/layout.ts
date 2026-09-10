import type { LayoutFieldsFragment } from "../generated/contentful-sdk.generated";
import { adaptIcon } from "./icon";
import { adaptImage } from "./image";
import { adaptLink } from "./link";
import { adaptSeoMetadata } from "./seo-metadata";

export function adaptLayout(item: LayoutFieldsFragment | null | undefined) {
  if (!item) {
    return null;
  }

  return {
    __typename: "Layout" as const,
    id: item.sys.id || "",
    internalName: item.internalName || "",
    title: item.title || "",
    role: item.role || "",
    resume: item.resume
      ? {
          url: item.resume.url || "",
          title: item.resume.title || "",
        }
      : null,
    globalSeo: adaptSeoMetadata(item.globalSeo),
    defaultTheme: item.defaultTheme || "",
    themeList:
      item.themeList?.filter((t): t is string => typeof t === "string") || [],
    email: item.email || "",
    footerText: item.footerText || "",
    siteLogo: adaptImage(item.siteLogo),
    resumeIcon: adaptIcon(item.resumeIcon),
    themeIcon: adaptIcon(item.themeIcon),
    drawerVariant: item.drawerVariant || "",
    drawerSide: item.drawerSide || "",
    navigationLinks:
      item.navigationLinksCollection?.items
        .map(adaptLink)
        .filter((link): link is NonNullable<typeof link> => link !== null) ||
      [],
  };
}

export type AdaptedLayout = NonNullable<ReturnType<typeof adaptLayout>>;

export function isAdaptedLayout(item: unknown): item is AdaptedLayout {
  return (
    typeof item === "object" &&
    item !== null &&
    "__typename" in item &&
    (item as Record<string, unknown>).__typename === "Layout"
  );
}
