import { CommonData } from "@/src/utils/types";
import React from "react";

const Sidebar = ({ pages }: { pages: string[] }) => {
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
            <li key={page} className="">
              <a>{page}</a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
