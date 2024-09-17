import React from "react";
import { FaBootstrap, FaHtml5, FaCode, FaReact } from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiRedux,
  SiReactrouter,
  SiJest,
  SiFramework,
} from "react-icons/si";
import { IoLogoCss3 } from "react-icons/io";
import { DiSass } from "react-icons/di";
import { MdMilitaryTech } from "react-icons/md";

interface SVGIconProps {
  icon: string;
  classes?: string;
}

const iconMap: Record<string, JSX.Element> = {
  Bootstrap: <FaBootstrap />,
  Typescript: <SiTypescript />,
  Javascript: <SiJavascript />,
  HTML5: <FaHtml5 />,
  CSS: <IoLogoCss3 />,
  SCSS: <DiSass />,
  core: <FaCode className="text-warning" />,
  Skills: <MdMilitaryTech />,
  "react-eco-system": <FaReact className="text-info" />,
  React: <FaReact />,
  "Redux Toolkit": <SiRedux />,
  "React Router": <SiReactrouter />,
  Jest: <SiJest />,
  Framework: <SiFramework />,
};

const SVGIcon: React.FC<SVGIconProps> = ({ icon, classes = "" }) => {
  const IconComponent = iconMap[icon] || null; // Fallback to null if icon not found

  return <div className={classes}>{IconComponent}</div>;
};

export default SVGIcon;
