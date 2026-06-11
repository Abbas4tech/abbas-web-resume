import type { AdaptedLayout } from "@/contentful/adapters/layout";
import { extractNavPages } from "@/contentful/adapters/nav-mapper";
import type { SidebarNavProps } from "./sidebar-nav";

export function adaptSidebarNav(layout: AdaptedLayout): SidebarNavProps {
  return { pages: extractNavPages(layout) };
}
