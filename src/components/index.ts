import dynamic from "next/dynamic";

export const BioCard = dynamic(() => import("./cards/BioCard"));
export const ExperienceCard = dynamic(() => import("./cards/ExperienceCard"));
export const Header = dynamic(() => import("./layout/Header"));
export const Layout = dynamic(() => import("./layout/Layout"));
export const ProfileCard = dynamic(() => import("./cards/ProfileCard"));
export const ProjectCardItem = dynamic(() => import("./cards/ProjectCard"));
export const Resume = dynamic(() => import("./common/Resume"));
export const Sidebar = dynamic(() => import("./layout/Sidebar"));
export const SkillGroup = dynamic(() => import("./skills/SkillGroup"));
export const SkillSetItem = dynamic(() => import("./skills/SkillSet"));
export const ThemeSwitch = dynamic(() => import("./common/ThemeSwitch"));
export const RichText = dynamic(() => import("./common/RichText"));
export const DynamicIcon = dynamic(() => import("./dynamic-icons/DynamicIcon"));
