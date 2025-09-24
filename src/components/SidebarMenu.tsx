"use client";
import { usePage } from "@/hooks";
import { IconResponse } from "@/lib/contentful";
import React from "react";
import { Button } from "./ui/button";
import { DrawerSideMenu, DrawerSideItem } from "./ui/drawer";
import { Icon } from "./ui/icon";

const SidebarMenu = () => {
  const { currentPageData, defaultPage, pages } = usePage({
    pages: [
      {
        title: "About",
        pageUrl: "/",
        isDefaultPage: true,
      },
      {
        title: "Projects",
        pageUrl: "/projects",
        isDefaultPage: false,
      },
      {
        title: "Skills",
        pageUrl: "/skills",
        isDefaultPage: false,
      },
      {
        title: "Experience",
        pageUrl: "/experience",
        isDefaultPage: false,
      },
    ],
  });
  return (
    <DrawerSideMenu>
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
            <Icon {...({} as IconResponse)} />
            {page.title}
          </Button>
        </DrawerSideItem>
      ))}
    </DrawerSideMenu>
  );
};

export default SidebarMenu;
