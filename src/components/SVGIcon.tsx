import React, { ComponentType } from "react";
import { FaBootstrap, FaHtml5, FaCode, FaReact, FaPhoneAlt } from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiRedux,
  SiReactrouter,
  SiJest,
  SiFramework,
  SiGmail
} from "react-icons/si";
import { IoLogoCss3 } from "react-icons/io";
import { DiSass } from "react-icons/di";
import { MdMilitaryTech } from "react-icons/md";

interface SVGIconProps {
  icon: string;
  classes?: string;
}

const iconMap: Record<string, ComponentType<{ className?: string }>> = {
  Bootstrap: FaBootstrap,
  Typescript: SiTypescript,
  Javascript: SiJavascript,
  HTML5: FaHtml5,
  CSS: IoLogoCss3,
  SCSS: DiSass,
  core: () => <FaCode className="text-warning" />,
  Skills: MdMilitaryTech,
  "react-eco-system": () => <FaReact className="text-info" />,
  React: FaReact,
  "Redux Toolkit": SiRedux,
  "React Router": SiReactrouter,
  Jest: SiJest,
  Framework: SiFramework,
  phone: FaPhoneAlt,
  gmail: SiGmail
};

const SVGIcon: React.FC<SVGIconProps> = ({ icon, classes = "" }) => {
  const IconComponent = iconMap[icon] || (() => <></>);

  return <IconComponent className={classes} />;
};

export default SVGIcon;