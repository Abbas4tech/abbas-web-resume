import React from "react";
import { Icon } from "@/components/elements/icon";
import type { SwapProps } from "./types";

export const baseMock: SwapProps = {
  active: false,
  rotate: true,
  onContent: React.createElement(Icon, {
    iconCode: "md/MdLightMode",
    className: "w-8 h-8",
  }),
  offContent: React.createElement(Icon, {
    iconCode: "md/MdDarkMode",
    className: "w-8 h-8",
  }),
};
