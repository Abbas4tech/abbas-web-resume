"use client";

import { Button } from "@abbas-web-resume/ui/components/button";
import { DrawerSideItem, DrawerSideMenu, useDrawer } from "@abbas-web-resume/ui/components/drawer";
import { Icon } from "@abbas-web-resume/ui/components/icon";
import type React from "react";
import type { ComponentProps } from "react";
import { usePage, type usePageProps } from "@/hooks";

const SidebarMenu = ({
  pages,
  ...props
}: ComponentProps<typeof DrawerSideMenu> & usePageProps): React.JSX.Element => {
  const { currentPageData, defaultPage } = usePage({ pages });
  const { toggleSidebar } = useDrawer();
  return (
    <DrawerSideMenu {...props}>
      {pages.map((page) => (
        <DrawerSideItem id={page.title} key={page.title}>
          <Button
            asLink={true}
            className={`flex w-full items-center gap-2 px-4 py-2 md:py-3 ${
              page.pageUrl === currentPageData.pageUrl
                ? "transform border-primary bg-base-200 font-bold transition-all duration-200 ease-out group-data-[side='right']:border-r-4 group-data-[side='left']:border-l-4"
                : ""
            }`}
            href={`${[page.pageUrl === defaultPage.pageUrl ? "/" : page.pageUrl]}`}
            onClick={toggleSidebar}
          >
            <Icon {...page.pageIcon} />
            {page.title}
          </Button>
        </DrawerSideItem>
      ))}
    </DrawerSideMenu>
  );
};

export default SidebarMenu;
