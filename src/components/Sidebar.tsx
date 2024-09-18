"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { useUserInfo } from "@context/useInfo";
import Link from "next/link";

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
        <ul className="bg-base-300 text-base py-4 flex flex-col gap-2 min-h-full w-[80%] lg:w-80">
          {/* Sidebar content here */}
          {pages.map((page: string) => (
            <li
              key={page}
              id={page}
              data-aos="fade-zoom-in"
              className={`py-1 md:py-2 pr-2 cursor-pointer ${
                page.toLowerCase() === currentPath
                  ? "border-primary border-l-4 bg-base-200 transform duration-200 ease-out"
                  : "hover:bg-base-200"
              }`}
            >
              <Link href={`/${[page.toLowerCase() === "about" ? "" : page.toLowerCase()]}`} className={`px-4 w-full`}>{page}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
