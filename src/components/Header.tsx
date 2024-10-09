"use client";
import React, { memo } from "react";
import { ThemeSwitch, Resume as ResumeComponent } from "@components";
import { useApplicationData } from "@context";

const Header = memo(() => {
  const { title, defaultPage } = useApplicationData();

  return (
    <header className="container mx-auto bg-base-100 shadow-lg shadow-base-300 text-base-content sticky top-0 z-30 flex w-full justify-center p-2">
      <nav className="navbar bg-base-100">
        <div className="navbar-start gap-2">
          <label
            tabIndex={0}
            className={"btn btn-ghost btn-circle drawer-button lg:hidden"}
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

          <button className="text-lg normal-case lg:text-2xl p-2 btn btn-ghost">
            {title}
          </button>
        </div>

        <div className="navbar-end items-center">
          <ResumeComponent />
          <ThemeSwitch />
        </div>
      </nav>
    </header>
  );
});

Header.displayName = "Header";
export default Header;
