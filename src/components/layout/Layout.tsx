"use client";
import React, { useEffect, PropsWithChildren, useRef } from "react";
import { Header, ProfileCard, DynamicIcon } from "@components";
import { usePage } from "@hooks";
import AOS from "aos";
import { Drawer, DrawerPageContent, DrawerSide } from "../ui/drawer";
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
    <>
      <Header />
      <Container>
        <Drawer variant="responsive" side="left">
          <DrawerPageContent className="scrollbar-hide overflow-auto p-4 h-[calc(100vh-4rem)]">
            <ProfileCard />
            {children}
            <div className="flex justify-end pb-12">
              <button
                onClick={changePage}
                className="gap-2 text-sm capitalize text-base-content bg-base-300 md:text-base btn-sm md:btn-md btn"
              >
                {nextPageText}
                <DynamicIcon
                  classes={[]}
                  showTooltip={false}
                  name="Next Page"
                  iconCode="fa/FaArrowRight"
                />
              </button>
            </div>
          </DrawerPageContent>
          <DrawerSide>
            <ul className="">
              {pages.map((page) => (
                <li
                  key={page.title}
                  id={page.title}
                  data-aos="fade-zoom-in"
                  className={`py-1 md:py-2 pr-2 cursor-pointer`}
                >
                  <Link
                    scroll={false}
                    onClick={changePage}
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
                </li>
              ))}
            </ul>
          </DrawerSide>
        </Drawer>
      </Container>
    </>
  );
};

export default Layout;
