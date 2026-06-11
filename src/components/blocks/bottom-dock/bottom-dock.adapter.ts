import type { AdaptedLayout } from "@/contentful/adapters/layout";
import { extractNavPages } from "@/contentful/adapters/nav-mapper";
import type { BottomDockProps } from "./bottom-dock";

export function adaptBottomDock(layout: AdaptedLayout): BottomDockProps {
  return { items: extractNavPages(layout) };
}
