import { useApplicationData } from "@context/useApplication";
import React from "react";
import { TbColorSwatch } from "react-icons/tb";

const ThemeSwitch = (): React.JSX.Element => {
  const { themeList } = useApplicationData();

  const changeTheme = (theme: string): void => {
    document.documentElement.setAttribute("data-theme", theme.toLowerCase());
  };

  return (
    <div className="dropdown dropdown-bottom dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="px-4 py-2 lg:tooltip tooltip-bottom"
        data-tip="Theme"
      >
        <TbColorSwatch className="" size={25} />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-base-100 rounded-md z-50 w-36 p-2 shadow"
      >
        {themeList.map((theme) => (
          <li className="" key={theme} onClick={() => changeTheme(theme)}>
            <a>{theme}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSwitch;
