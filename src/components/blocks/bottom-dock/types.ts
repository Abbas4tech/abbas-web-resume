import type { ComponentProps } from "react";
import type { Dock } from "@/components/elements/dock";

export interface BottomDockItem {
  isDefaultPage?: boolean;
  pageIcon: {
    iconCode?: string;
    classes?: string[];
    name?: string;
    showTooltip?: boolean;
  };
  pageUrl: string;
  title: string;
}

export type BottomDockProps = ComponentProps<typeof Dock> & {
  items: BottomDockItem[];
};
