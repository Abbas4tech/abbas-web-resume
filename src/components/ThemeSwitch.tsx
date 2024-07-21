"use client";
import React, { useId } from "react";
import { TbColorSwatch } from "react-icons/tb";
import { useUserInfo } from "@context/useInfo";

const ThemeSwitch = (): React.JSX.Element => {
  const { themes } = useUserInfo();

  const changeTheme = (theme: string): void => {
    document.documentElement.setAttribute("data-theme", theme.toLowerCase());
  };

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="px-4 py-2 tooltip tooltip-bottom"
        data-tip="Theme"
      >
        <TbColorSwatch className="" size={25} />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-md z-[1] w-36 p-2 shadow"
      >
        {themes.map((theme) => (
          <li className="" key={useId()} onClick={() => changeTheme(theme)}>
            <a>{theme}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSwitch;
