import dynamic from "next/dynamic";

export const Header = dynamic(() => import("./layout/Header"));
export const Layout = dynamic(() => import("./layout/Layout"));
export const ProfileCard = dynamic(() => import("./cards/ProfileCard"));
export const RichText = dynamic(() => import("./common/RichText"));
