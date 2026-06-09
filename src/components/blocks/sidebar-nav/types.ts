import type { ComponentProps } from "react";
import type { DrawerSideMenu } from "@/components/elements/drawer";
import type { PageLike, usePageProps } from "@/hooks/use-page";

export type SidebarNavItem = PageLike & {
  title: string;
  pageIcon: {
    iconCode?: string;
    classes?: string[];
    name?: string;
    showTooltip?: boolean;
  };
};

export type SidebarNavProps = ComponentProps<typeof DrawerSideMenu> &
  usePageProps<SidebarNavItem>;
