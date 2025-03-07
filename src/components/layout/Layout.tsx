"use client";
import React, { useEffect, PropsWithChildren, useRef } from "react";
import { Header, ProfileCard, DynamicIcon } from "@components";
import { usePage } from "@hooks";
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
import { useApplicationData } from "@context";
import Link from "next/link";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const layoutRef = useRef<HTMLDivElement>(null);
  const { nextPageText, changePage, currentPath, defaultPage } = usePage({
    ref: layoutRef,
  });
  const { pages } = useApplicationData();

  useEffect(() => {
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
                  data-aos="fade-zoom-in"
                >
                  <Link
                    scroll={false}
                    onClick={() => {
                      changePage();
                    }}
                    href={`${[
                      page.pageUrl === defaultPage.pageUrl ? "/" : page.pageUrl,
                    ]}`}
                    className={`px-4 py-2 md:py-3 w-full flex gap-2 items-center ${
                      page.pageUrl === currentPath
                        ? "border-primary border-l-4 bg-base-200 transform font-bold duration-200 ease-out"
                        : ""
                    }`}
                  >
                    <DynamicIcon {...page.pageIcon} />
                    {page.title}
                  </Link>
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
