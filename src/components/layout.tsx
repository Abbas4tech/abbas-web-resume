"use client";
import React from "react";
import { ApplicationData } from "@lib/contentful";

import {
  Drawer,
  DrawerPageContent,
  DrawerProvider,
  DrawerSide,
  DrawerSideItem,
  DrawerSideMenu,
} from "./ui/drawer";
import Container from "./ui/container";
import { Button } from "./ui/button";
import { usePage } from "./ui/page";
import { Icon } from "./ui/icon";
import { ProfileBanner } from "./banner";
import Header from "./header";

import AOS from "aos";
import NavigationAnimation from "./ui/navigation";

const Layout = React.memo(
  React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement> & {
      data: ApplicationData;
    }
  >(({ className, children, data, ...props }, ref) => {
    const { currentPath, defaultPage, pages } = usePage();
    const {
      resume,
      defaultTheme,
      resumeIcon,
      themeIcon,
      themeList,
      title,
      bannerData,
    } = data;

    React.useEffect(() => {
      if (typeof window !== "undefined") AOS.init();
    }, []);

    return (
      <DrawerProvider {...props} ref={ref}>
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
        <Container className="h-[calc(100vh-5.5rem)]">
          <Drawer variant="responsive" side="left">
            <DrawerPageContent className="">
              <NavigationAnimation
                className="scrollbar-hide overflow-auto p-4 h-[calc(100vh-6rem)]"
                options={{ easing: "ease-in-cubic" }}
              >
                <ProfileBanner bannerData={bannerData} />
                {children}
              </NavigationAnimation>
            </DrawerPageContent>
            <DrawerSide>
              <DrawerSideMenu>
                {pages.map((page) => (
                  <DrawerSideItem
                    key={page.title}
                    id={page.title}
                    data-aos="fade-right"
                  >
                    <Button
                      asLink={true}
                      href={`${[
                        page.pageUrl === defaultPage.pageUrl
                          ? "/"
                          : page.pageUrl,
                      ]}`}
                      className={`px-4 py-2 md:py-3 w-full flex gap-2 items-center ${
                        page.pageUrl === currentPath
                          ? "border-primary border-l-4 bg-base-200 transform font-bold duration-200 ease-out transition-all"
                          : ""
                      }`}
                    >
                      <Icon {...page.pageIcon} />
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
  })
);

export { Layout };
