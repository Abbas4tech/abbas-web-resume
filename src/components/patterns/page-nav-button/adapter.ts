import type { PageNavButtonProps } from "./types";

/** Passthrough — pages array is passed as-is from the Block */
export function adaptPageNavButton(
  pages: PageNavButtonProps["pages"]
): PageNavButtonProps {
  return { pages };
}
