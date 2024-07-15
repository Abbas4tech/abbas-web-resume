"use client";
import { useRouter, usePathname, redirect } from "next/navigation";
import React from "react";

interface SidebarProps {
  pages: string[];
}

const Sidebar = ({ pages }: SidebarProps) => {
  const router = useRouter();
  console.log(usePathname());

  const changePage = (page: string): void => {
    router.push(`/${[page]}`);
  };

  return (
    <>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <ul className="bg-base-300 gap-2 min-h-full w-80">
          {/* Sidebar content here */}
          {pages.map((page: string) => (
            <li
              id={page}
              onClick={() => changePage(page.toLowerCase())}
              className={`py-1 md:py-2 pr-2 cursor-pointer`}
            >
              <a
                className={`${
                  `/${page.toLowerCase()}` === usePathname()
                    ? "border-primary border-l-4 bg-primary-content"
                    : ""
                } px-4 py-2 md:py-3 w-full`}
              >
                {page}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
