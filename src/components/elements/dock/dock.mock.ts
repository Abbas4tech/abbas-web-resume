import React from "react";
import { Icon } from "@/components/elements/icon/icon";
import type { DockProps } from "./dock";
import { DockItem } from "./dock";

export const baseMock: DockProps = {
  children: [
    React.createElement(
      DockItem,
      {
        key: "home",
        href: "/",
        icon: React.createElement(Icon, { iconCode: "md/MdHome" }),
      },
      "Home"
    ),
    React.createElement(
      DockItem,
      {
        key: "projects",
        href: "/projects",
        icon: React.createElement(Icon, { iconCode: "md/MdWork" }),
      },
      "Projects"
    ),
    React.createElement(
      DockItem,
      {
        key: "contact",
        href: "/contact",
        icon: React.createElement(Icon, { iconCode: "md/MdEmail" }),
      },
      "Contact"
    ),
  ],
};
