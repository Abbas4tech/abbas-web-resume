import React from "react";
import { Icon } from "@/components/elements/icon";
import { DockItem } from "./index";
import type { DockProps } from "./types";

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
