"use client";
import { usePathname } from "next/navigation";
import React, { memo } from "react";
import Link from "next/link";
import { SVGIcon } from "@components";
import { useApplicationData } from "@context/useApplication";

const Sidebar = memo(() => {
  const { pages, defaultPage } = useApplicationData();
  const currentPath = usePathname().slice(1) || defaultPage.toLowerCase();

  return (
    <>
      <div className="drawer-side top-16 lg:top-0">
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
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                href={`/${[
                  page.toLowerCase() === defaultPage.toLowerCase()
                    ? ""
                    : page.toLowerCase(),
                ]}`}
                className={`px-4 py-2 md:py-3 w-full flex gap-2 items-center ${
                  page.toLowerCase() === currentPath
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
