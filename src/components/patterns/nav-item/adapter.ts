import type { NavItemProps } from "./types";

/**
 * Future: replace input type with Contentful SDK auto-generated MetaPage type.
 */
export function adaptNavItem(
  input: {
    pageUrl: string;
    title: string;
    pageIcon: { iconCode?: string; classes?: string[]; name?: string };
  },
  currentPageUrl: string
): NavItemProps {
  return {
    href: input.pageUrl,
    label: input.title,
    iconCode: input.pageIcon.iconCode ?? "",
    iconClasses: input.pageIcon.classes,
    iconName: input.pageIcon.name,
    isActive: input.pageUrl === currentPageUrl,
  };
}
