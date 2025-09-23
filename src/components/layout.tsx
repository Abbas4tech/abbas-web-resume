"use client";
import React from "react";
import { ApplicationData, IconResponse } from "@/lib/contentful";

import {
  Drawer,
  DRAWER_SIDES,
  DRAWER_VARIANTS,
  DrawerPageContent,
  DrawerProvider,
  DrawerSide,
  DrawerSideItem,
  DrawerSideMenu,
} from "./ui/drawer";
import { Container } from "./ui/container";
import { Button } from "./ui/button";
import { Icon } from "./ui/icon";
import { ProfileBanner } from "./banner";
import { Header } from "./header";
import { NavigationAnimation } from "./ui/navigation";
import { usePage } from "@/hooks";

const Layout: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    data: ApplicationData;
  }
> = React.memo(({ className, children, data, ...props }) => {
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
  const {
    resume,
    defaultTheme,
    resumeIcon,
    themeIcon,
    themeList,
    title,
    bannerData,
    layoutSettings,
  } = data;

  const variant = layoutSettings.drawerVariant
    .split(" ")
    .map((i) => i.toLowerCase())
    .join("-") as DRAWER_VARIANTS;

  return (
    <DrawerProvider
      variant={variant}
      side={layoutSettings.drawerSide.toLowerCase() as DRAWER_SIDES}
      {...props}
    >
      <Header
        data={{
          themeIcon,
          defaultTheme,
          resume,
          resumeIcon,
          themeList,
          title,
        }}
      />
      <Container className="h-[calc(100vh-5rem)]">
        <Drawer>
          <DrawerPageContent>
            <NavigationAnimation
              className="scrollbar-hide overflow-auto p-4 h-[calc(100vh-5rem)]"
              options={{ easing: "ease-in-cubic" }}
            >
              <ProfileBanner bannerData={bannerData} />
              {children}
            </NavigationAnimation>
          </DrawerPageContent>
          <DrawerSide>
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
          </DrawerSide>
        </Drawer>
      </Container>
    </DrawerProvider>
  );
});

Layout.displayName = "Layout";

export { Layout };
