"use client";
import React, { useId } from "react";
import { TbColorSwatch } from "react-icons/tb";
import { Themes } from "../utils/types";

const ThemeSwitch = ({ themes }: { themes: Themes }): React.JSX.Element => {
  const changeTheme = (theme: string): void => {
    document.documentElement.setAttribute("data-theme", theme.toLowerCase());
  };

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="px-4 py-2 tooltip tooltip-left"
        data-tip="Theme"
      >
        <TbColorSwatch className="text-primary" size={25} />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-md z-[1] w-36 p-2 shadow"
      >
        {themes.map((theme) => (
          <li
            className="text-secondary"
            key={useId()}
            onClick={() => changeTheme(theme)}
          >
            <a>{theme}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSwitch;