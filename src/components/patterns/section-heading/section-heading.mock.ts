import React from "react";
import { Icon } from "@/components/elements/icon";
import type { SectionHeadingProps } from "./types";

export const baseMock: SectionHeadingProps = {
  children: "Experience",
  icon: React.createElement(Icon, {
    iconCode: "md/MdWork",
    name: "Experience",
    showTooltip: false,
  }),
};
