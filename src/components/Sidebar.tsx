"use client";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

interface SidebarProps {
  pages: string[];
}

const Sidebar = ({ pages }: SidebarProps) => {
  const router = useRouter();
  const currentPath = usePathname().slice(1);

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
        <ul className="bg-base-300 text-base py-4 flex flex-col gap-2 min-h-full w-80">
          {/* Sidebar content here */}
          {pages.map((page: string) => (
            <li
              key={page}
              id={page}
              data-aos="fade-zoom-in"
              onClick={() => changePage(page.toLowerCase())}
              className={`py-1 md:py-2 pr-2 cursor-pointer ${
                page.toLowerCase() === currentPath
                  ? "border-primary border-l-4 bg-base-200 transform duration-200 ease-out"
                  : "hover:bg-base-200"
              }`}
            >
              <a className={`px-4 w-full`}>{page}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
