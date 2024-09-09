import React from "react";
import { FaBootstrap, FaHtml5, FaCode } from "react-icons/fa";
import { SiJavascript, SiTypescript } from "react-icons/si";
import { IoLogoCss3 } from "react-icons/io";
import { DiSass } from "react-icons/di";
import { MdMilitaryTech } from "react-icons/md";

interface SVGIconProps {
  icon: string;
  classes: string;
}

const SVGIcon = ({ icon, classes }: SVGIconProps) => {
  const IconComponent = () => {
    if (icon === "Bootstrap") {
      return <FaBootstrap />;
    } else if (icon === "Typescript") {
      return <SiTypescript />;
    } else if (icon === "Javascript") {
      return <SiJavascript />;
    } else if (icon === "HTML5") {
      return <FaHtml5 />;
    } else if (icon === "CSS") {
      return <IoLogoCss3 />;
    } else if (icon === "SCSS") {
      return <DiSass />;
    } else if (icon === "Core Technologies") {
      return <FaCode className={classes} />;
    } else if (icon === "Skills") {
      return <MdMilitaryTech />;
    }
  };

  return <IconComponent />;
};

export default SVGIcon;
