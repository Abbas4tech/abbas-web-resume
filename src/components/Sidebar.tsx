"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { useUserInfo } from "@context/useInfo";
import Link from "next/link";
import SVGIcon from "./SVGIcon";

const Sidebar = () => {
  const { pages } = useUserInfo();
  const currentPath = usePathname().slice(1) || "about";

  return (
    <>
      <div className="drawer-side">
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
                href={`/${[
                  page.toLowerCase() === "about" ? "" : page.toLowerCase(),
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
};

export default Sidebar;
