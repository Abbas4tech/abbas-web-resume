import React, { ComponentType, memo } from "react";
import {
  FaBootstrap,
  FaHtml5,
  FaCode,
  FaReact,
  FaPhoneAlt,
  FaCalendarTimes,
  FaVuejs,
  FaAngular,
  FaGitAlt,
  FaGithub,
  FaTools,
} from "react-icons/fa";
import { FaLocationCrosshairs, FaPeopleGroup } from "react-icons/fa6";
import {
  SiJavascript,
  SiTypescript,
  SiRedux,
  SiReactrouter,
  SiJest,
  SiFramework,
  SiGmail,
  SiNgrx,
  SiContentful,
  SiStrapi,
  SiDaisyui,
  SiTailwindcss,
  SiVercel,
  SiWebpack,
  SiAzuredevops,
  SiNotion,
  SiJira,
  SiAxios,
  SiStorybook,
} from "react-icons/si";
import { IoLogoCss3 } from "react-icons/io";
import { DiSass } from "react-icons/di";
import { MdMilitaryTech } from "react-icons/md";
import { IoLogoFirebase } from "react-icons/io5";
import { RiNextjsFill } from "react-icons/ri";

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
  Core: () => <FaCode className="text-warning" />,
  Skills: MdMilitaryTech,
  Firebase: IoLogoFirebase,
  Vue: FaVuejs,
  NgRx: SiNgrx,
  Angular: FaAngular,
  Strapi: SiStrapi,
  Contentful: SiContentful,
  DaisyUI: SiDaisyui,
  Tailwind: SiTailwindcss,
  Vercel: SiVercel,
  Webpack: SiWebpack,
  Git: FaGitAlt,
  GitHub: FaGithub,
  Notion: SiNotion,
  Jira: SiJira,
  AzureDevops: SiAzuredevops,
  Axios: SiAxios,
  NextJs: RiNextjsFill,
  StoryBook: SiStorybook,
  Toolkit: FaTools,
  "react-eco-system": () => <FaReact className="text-info" />,
  React: FaReact,
  "Redux Toolkit": SiRedux,
  "React Router": SiReactrouter,
  Jest: SiJest,
  Framework: () => <SiFramework className="text-success" />,
  phone: FaPhoneAlt,
  gmail: SiGmail,
  date: FaCalendarTimes,
  location: FaLocationCrosshairs,
  about: FaPeopleGroup,
};

const SVGIcon: React.FC<SVGIconProps> = memo(({ icon, classes = "" }) => {
  SVGIcon.displayName = "SVGIcon";
  const IconComponent = iconMap[icon] || (() => <></>);

  return <IconComponent className={classes} />;
});

export default SVGIcon;
