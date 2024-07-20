import React, { useId } from "react";
import ThemeSwitch from "./ThemeSwitch";
import ResumeComponent from "./Resume"
import { Themes, Resume } from "@utils/types";
interface NavbarProps {
  themes: Themes;
  resume : Resume
}

const Navbar = ({ themes,resume }: NavbarProps): React.JSX.Element => {
  const navlinks = (
    <ul className="menu menu-horizontal">
      {/* Navbar menu content here */}
      {Array.from({ length: 2 }).map(() => (
        <li className="text-primary" key={useId()}>
          <a>Navbar Link 1</a>
        </li>
      ))}
    </ul>
  );
  return (
    <>
    <ResumeComponent data={resume}/>
      <ThemeSwitch themes={themes} />
    </>
  );
};

export default Navbar;
