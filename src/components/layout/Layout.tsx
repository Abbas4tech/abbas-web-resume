"use client";
import React from "react";
import { Header, ProfileCard } from "@components";
import AOS from "aos";
import {
  Drawer,
  DrawerPageContent,
  DrawerProvider,
  DrawerSide,
  DrawerSideItem,
  DrawerSideMenu,
} from "../ui/drawer";
import Container from "../ui/container";
import { Button } from "../ui/button";
import { usePage } from "../ui/page";
import { Icon } from "../ui/icon";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { currentPath, defaultPage, pages } = usePage();

  React.useEffect(() => {
    if (typeof window !== "undefined") AOS.init();
  }, []);

  return (
    <DrawerProvider>
      <Header />
      <Container className="h-[calc(100vh-5.5rem)]">
        <Drawer variant="responsive" side="left">
          <DrawerPageContent className="scrollbar-hide overflow-auto p-4 h-[calc(100vh-4rem)]">
            <ProfileCard />
            {children}
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
                      page.pageUrl === defaultPage.pageUrl ? "/" : page.pageUrl,
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
};

export default Layout;
