import React from "react";
import { FaBootstrap, FaHtml5, FaCode, FaReact } from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiRedux,
  SiReactrouter,
} from "react-icons/si";
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
      return <FaCode className={"text-warning"} />;
    } else if (icon === "Skills") {
      return <MdMilitaryTech />;
    } else if (icon === "React Eco System") {
      return <FaReact className={"text-info"}/>
    } 
    else if (icon === "React") {
      return <FaReact />;
    } else if (icon === "Redux Toolkit") {
      return <SiRedux />;
    } else if (icon === "React Router") {
      return <SiReactrouter />;
    }
  };

  return <IconComponent />;
};

export default SVGIcon;
