import type { PageNavButtonProps } from "./page-nav-button";

/** Passthrough — pages array is passed as-is from the Block */
export function adaptPageNavButton(
  pages: PageNavButtonProps["pages"]
): PageNavButtonProps {
  return { pages };
}
