import { useApplicationData } from "@context";
import React from "react";
import { TbColorSwatch } from "react-icons/tb";

const ThemeSwitch = (): React.JSX.Element => {
  const { themeList } = useApplicationData();

  return (
    <>
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn m-1">
          <TbColorSwatch className="w-4 h-4 lg:w-6 lg:h-6" />
          <svg
            width="12px"
            height="12px"
            className="inline-block h-2 w-2 fill-current opacity-60"
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
            <li>
              <input
                type="radio"
                name="theme-dropdown"
                className="theme-controller btn btn-sm btn-block btn-ghost justify-start px-4"
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
