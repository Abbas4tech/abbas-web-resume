"use client";
import React, { memo } from "react";
import Link from "next/link";
import { SVGIcon } from "@components";
import { useApplicationData } from "@context";
import { usePage } from "@hooks";

interface SidebarProps {
  changePage: () => void;
}

const Sidebar = memo(({ changePage }: SidebarProps) => {
  const { pages, defaultPage } = useApplicationData();
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
          {pages.map((page: string) => (
            <li
              key={page}
              id={page}
              data-aos="fade-zoom-in"
              className={`py-1 md:py-2 pr-2 cursor-pointer`}
            >
              <Link
                scroll={false}
                onClick={changePage}
                href={`/${[
                  page.toLowerCase() === defaultPage.toLowerCase()
                    ? ""
                    : page.toLowerCase(),
                ]}`}
                className={`px-4 py-2 md:py-3 w-full flex gap-2 items-center ${
                  page === currentPath
                    ? "border-primary border-l-4 bg-base-200 transform font-bold duration-200 ease-out"
                    : ""
                }`}
              >
                <SVGIcon icon={page} />
                {page}
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
