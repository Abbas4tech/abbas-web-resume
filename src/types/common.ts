import type { AdaptedIcon } from "@/contentful/adapters/icon";

export interface MetaPage {
  isDefaultPage: boolean;
  pageIcon: AdaptedIcon;
  pageUrl: string;
  title: string;
}
