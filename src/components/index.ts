import dynamic from "next/dynamic";

export const ExperienceCard = dynamic(() => import("./cards/ExperienceCard"));
export const Header = dynamic(() => import("./layout/Header"));
export const Layout = dynamic(() => import("./layout/Layout"));
export const ProfileCard = dynamic(() => import("./cards/ProfileCard"));
export const RichText = dynamic(() => import("./common/RichText"));
