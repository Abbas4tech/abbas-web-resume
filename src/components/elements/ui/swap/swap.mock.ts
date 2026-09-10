import React from "react";
import { Icon } from "@/components/elements/ui/icon/icon";
import type { SwapProps } from "./swap";

export const baseMock: SwapProps = {
  active: false,
  rotate: true,
  onContent: React.createElement(Icon, {
    iconCode: "md/MdLightMode",
    name: "Light mode",
    className: "w-8 h-8",
  }),
  offContent: React.createElement(Icon, {
    iconCode: "md/MdDarkMode",
    name: "Dark mode",
    className: "w-8 h-8",
  }),
};
