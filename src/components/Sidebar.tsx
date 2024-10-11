"use client";
import React, { memo } from "react";
import Link from "next/link";
import { useApplicationData } from "@context";
import { usePage } from "@hooks";
import DynamicIcons from "./DynamicIcon";
interface SidebarProps {
  changePage: () => void;
}

const Sidebar = memo(({ changePage }: SidebarProps) => {
  const { pages } = useApplicationData();
  const defaultPage = pages.find((page) => page.isDefaultPage)?.pageUrl || "/";
  const { currentPath } = usePage({});

  return (
    <>
      <div className="drawer-side lg:top-0 top-20">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="bg-base-300 py-4 flex flex-col min-h-full w-[80%] lg:w-80">
          {/* Sidebar content here */}
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
                href={`${[page.pageUrl === defaultPage ? "/" : page.pageUrl]}`}
                className={`px-4 py-2 md:py-3 w-full flex gap-2 items-center ${
                  page.pageUrl === currentPath
                    ? "border-primary border-l-4 bg-base-200 transform font-bold duration-200 ease-out"
                    : ""
                }`}
              >
                <DynamicIcons {...page.pageIcon} />
                {page.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
});
Sidebar.displayName = "Sidebar";
export default Sidebar;
