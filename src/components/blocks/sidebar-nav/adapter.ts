import type { SidebarNavProps } from "./types";

/** Passthrough — pages array is passed as-is from layout */
export function adaptSidebarNav(
  pages: SidebarNavProps["pages"]
): SidebarNavProps {
  return { pages };
}
