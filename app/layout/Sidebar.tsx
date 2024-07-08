"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Sidebar = ({ pages }: { pages: string[] }) => {
  const router = useRouter();
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
        <ul className="menu bg-base-300 gap-2 min-h-full w-80 p-4">
          {/* Sidebar content here */}
          {pages.map((page: string) => (
            <li
              key={page}
              onClick={() => changePage(page.toLowerCase())}
              className=""
            >
              <a>{page}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
