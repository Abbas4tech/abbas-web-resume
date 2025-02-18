"use client";
import { DynamicIcon } from "@components";
import { useApplicationData } from "@context";
import React, { useState } from "react";

const ThemeSwitch = (): React.JSX.Element => {
  const { themeList, themeIcon, defaultTheme } = useApplicationData();
  const [currentTheme, setCurrentTheme] = useState(defaultTheme.toLowerCase());

  const themeChangeHandler = (theme: string = defaultTheme.toLowerCase()) => {
    setCurrentTheme(theme);
    document.documentElement.setAttribute("data-theme", theme);
  };
  return (
    <>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="md:btn md:m-1 mx-2">
          <DynamicIcon {...themeIcon} />
          <svg
            width="12px"
            height="12px"
            className="md:inline-block hidden h-2 w-2 fill-current opacity-60"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 2048 2048"
          >
            <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content bg-base-300 rounded-box w-36 z-[1] p-2 shadow-2xl"
        >
          {themeList.map((theme) => (
            <li key={theme}>
              <input
                type="radio"
                onClick={() => themeChangeHandler(theme.toLowerCase())}
                checked={currentTheme === theme.toLowerCase()}
                name="theme-dropdown"
                className="btn btn-sm btn-block btn-ghost justify-start px-4"
                aria-label={theme.charAt(0).toUpperCase() + theme.slice(1)}
                value={theme.toLowerCase()}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ThemeSwitch;
