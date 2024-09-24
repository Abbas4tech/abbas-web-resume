import React, { memo } from "react";
import ThemeSwitch from "./ThemeSwitch";
import ResumeComponent from "./Resume";
import { FileAsset } from "@utils/contentful";

interface HeaderProps {
  title: string;
  resume: FileAsset;
  themes: string[];
}

const Header = memo(({ title, resume, themes }: HeaderProps) => {
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

          <h1 className="text-lg normal-case lg:text-2xl p-2">{title}</h1>
        </div>

        <div className="navbar-end items-baseline">
          <ResumeComponent resume={resume} />
          <ThemeSwitch themes={themes} />
        </div>
      </nav>
    </header>
  );
});

Header.displayName = "Header";
export default Header;
