import { adaptPageNavButton } from "@/components/patterns/page-nav-button/adapter";
import type { MetaPage } from "@/types/entries";
import type { PageWrapperProps } from "./types";

/**
 * Adapter extracts the pages array for the PageNavButton pattern.
 */
export function adaptPageWrapper(input: {
  pagesCollection: { items: MetaPage[] };
  children: React.ReactNode;
}): PageWrapperProps {
  return {
    pages: adaptPageNavButton(input.pagesCollection.items).pages,
    children: input.children,
  };
}
