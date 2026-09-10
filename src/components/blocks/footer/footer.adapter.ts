import type { AdaptedLayout } from "@/contentful/adapters/layout";
import { extractNavPages } from "@/contentful/adapters/nav-mapper";
import type { FooterProps } from "./footer";

export function adaptFooter(layout: AdaptedLayout): FooterProps {
  return {
    footerText: layout.footerText,
    email: layout.email || undefined,
    links: extractNavPages(layout),
  };
}
