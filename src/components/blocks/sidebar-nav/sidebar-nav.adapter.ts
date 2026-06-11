import type { SidebarNavProps } from "./sidebar-nav";

/** Passthrough — pages array is passed as-is from layout */
export function adaptSidebarNav(
  pages: SidebarNavProps["pages"]
): SidebarNavProps {
  return { pages };
}
