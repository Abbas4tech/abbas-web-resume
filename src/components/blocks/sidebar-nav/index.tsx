"use client";
import type React from "react";
import { DrawerSideItem, DrawerSideMenu } from "@/components/elements/drawer";
import { NavItem } from "@/components/patterns/nav-item";
import { adaptNavItem } from "@/components/patterns/nav-item/adapter";
import usePage from "@/hooks/use-page";
import type { SidebarNavProps } from "./types";

const SidebarNav = ({
  pages,
  ...props
}: SidebarNavProps): React.JSX.Element => {
  const { currentPageData, defaultPage } = usePage({ pages });
  return (
    <DrawerSideMenu {...props}>
      {pages.map((page) => {
        const navItemProps = adaptNavItem(
          {
            pageUrl: page.pageUrl === defaultPage.pageUrl ? "/" : page.pageUrl,
            title: page.title,
            pageIcon: page.pageIcon,
          },
          currentPageData.pageUrl
        );
        return (
          <DrawerSideItem id={page.title} key={page.title}>
            <NavItem
              {...navItemProps}
              href={page.pageUrl === defaultPage.pageUrl ? "/" : page.pageUrl}
            />
          </DrawerSideItem>
        );
      })}
    </DrawerSideMenu>
  );
};
SidebarNav.displayName = "SidebarNav";

export { SidebarNav };
