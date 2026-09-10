import type { BottomDockProps } from "./bottom-dock";

export const baseMock: BottomDockProps = {
  items: [
    {
      title: "Home",
      pageUrl: "/",
      isDefaultPage: true,
      pageIcon: { iconCode: "md/MdHome", name: "Home" },
    },
    {
      title: "About",
      pageUrl: "/about",
      pageIcon: { iconCode: "io5/IoPerson", name: "About" },
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
