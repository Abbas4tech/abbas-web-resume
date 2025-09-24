"use client";
import React, { ComponentProps } from "react";

import { usePage, usePageProps } from "@/hooks";

import { Button } from "./ui/button";
import { DrawerSideMenu, DrawerSideItem } from "./ui/drawer";
import { Icon } from "./ui/icon";

const SidebarMenu = ({
  pages,
  ...props
}: ComponentProps<typeof DrawerSideMenu> & usePageProps): React.JSX.Element => {
  const { currentPageData, defaultPage } = usePage({ pages });
  return (
    <DrawerSideMenu {...props}>
      {pages.map((page) => (
        <DrawerSideItem key={page.title} id={page.title}>
          <Button
            asLink={true}
            href={`${[
              page.pageUrl === defaultPage.pageUrl ? "/" : page.pageUrl,
            ]}`}
            className={`px-4 py-2 md:py-3 w-full flex gap-2 items-center ${
              page.pageUrl === currentPageData.pageUrl
                ? "border-primary group-data-[side='left']:border-l-4 group-data-[side='right']:border-r-4 bg-base-200 transform font-bold duration-200 ease-out transition-all"
                : ""
            }`}
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
