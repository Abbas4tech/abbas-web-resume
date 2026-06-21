"use client";
import { m } from "motion/react";
import type React from "react";
import type { ComponentProps } from "react";
import {
  DrawerSideItem,
  DrawerSideMenu,
} from "@/components/elements/drawer/drawer";
import { NavItem } from "@/components/patterns/nav-item/nav-item";
import { adaptNavItem } from "@/components/patterns/nav-item/nav-item.adapter";
import type { PageLike, usePageProps } from "@/hooks/use-page";
import usePage from "@/hooks/use-page";

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

const SidebarNav = ({
  pages,
  ...props
}: SidebarNavProps): React.JSX.Element => {
  const { currentPageData } = usePage({ pages });
  return (
    <DrawerSideMenu {...props}>
      {pages.map((page) => {
        const navItemProps = adaptNavItem(
          {
            pageUrl: page.pageUrl,
            title: page.title,
            pageIcon: page.pageIcon,
          },
          currentPageData.pageUrl
        );
        const isActive = navItemProps.isActive;
        return (
          <DrawerSideItem className="relative" id={page.title} key={page.title}>
            {isActive && (
              <m.div
                className="absolute inset-0 border-primary border-l-4 bg-primary/10"
                layoutId="activeSidebarNav"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <NavItem {...navItemProps} href={page.pageUrl} />
          </DrawerSideItem>
        );
      })}
    </DrawerSideMenu>
  );
};
SidebarNav.displayName = "SidebarNav";

export { SidebarNav };
