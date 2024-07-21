import { CommonData } from "@utils/types";
import React from "react";
import Navbar from "./Navbar";

interface HeaderProps {
  commonData: CommonData;
}

const Header = ({ commonData }: HeaderProps) => {
  return (
    <header className="shadow-lg shadow-base-200">
      <nav className="navbar bg-base-100 h-10 md:h-20">
        <div className="navbar-start">
          <label
            tabIndex={0}
            className="btn btn-ghost btn-circle drawer-button lg:hidden"
            htmlFor="my-drawer-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>

          <h1 className="text-lg normal-case lg:text-2xl p-2">
            {commonData.title}
          </h1>
        </div>

        <div className="navbar-end items-baseline">
          <Navbar resume={commonData.resume} themes={commonData.themes} />
        </div>
      </nav>
    </header>
  );
};

export default Header;
