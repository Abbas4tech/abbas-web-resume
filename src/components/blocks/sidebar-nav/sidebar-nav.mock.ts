import type { SidebarNavProps } from "./sidebar-nav";

export const baseMock: SidebarNavProps = {
  pages: [
    {
      title: "Home",
      pageUrl: "/",
      isDefaultPage: true,
      pageIcon: { iconCode: "md/MdHome", name: "Home" },
    },
    {
      title: "About",
      pageUrl: "/about",
      pageIcon: { iconCode: "md/MdPerson", name: "About" },
    },
    {
      title: "Projects",
      pageUrl: "/projects",
      pageIcon: { iconCode: "md/MdWork", name: "Projects" },
    },
    {
      title: "Contact",
      pageUrl: "/contact",
      pageIcon: { iconCode: "md/MdEmail", name: "Contact" },
    },
  ],
};
