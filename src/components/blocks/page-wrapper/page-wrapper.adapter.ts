import type { AdaptedLayout } from "@/contentful/adapters/layout";
import { extractNavPages } from "@/contentful/adapters/nav-mapper";
import type { PageWrapperProps } from "./page-wrapper";

export function adaptPageWrapper(
  layout: AdaptedLayout,
  children: React.ReactNode
): PageWrapperProps {
  return {
    pages: extractNavPages(layout),
    children,
  };
}
