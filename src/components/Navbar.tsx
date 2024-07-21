import React, { useId } from "react";
import ThemeSwitch from "./ThemeSwitch";
import ResumeComponent from "./Resume";
import { Themes, Resume } from "@utils/types";
interface NavbarProps {
  themes: Themes;
  resume: Resume;
}

const Navbar = (): React.JSX.Element => {
  return (
    <>
      <ResumeComponent  />
      <ThemeSwitch />
    </>
  );
};

export default Navbar;
