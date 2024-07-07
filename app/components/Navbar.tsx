import React, { useId } from "react";
import ThemeSwitch from "./ThemeSwitch";
import { Themes } from "../utils/types";

const Navbar = ({ themes }: { themes: Themes }): React.JSX.Element => {
  return (
    <>
      <ul className="menu menu-horizontal">
        {/* Navbar menu content here */}
        {Array.from({ length: 2 }).map(() => (
          <li className="text-primary" key={useId()}>
            <a>Navbar Link 1</a>
          </li>
        ))}
      </ul>
      <ThemeSwitch themes={themes} />
    </>
  );
};

export default Navbar;
