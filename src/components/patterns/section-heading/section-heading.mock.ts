import React from "react";
import { Icon } from "@/components/elements/ui/icon/icon";
import type { SectionHeadingProps } from "./section-heading";

export const baseMock: SectionHeadingProps = {
  children: "Experience",
  icon: React.createElement(Icon, {
    iconCode: "md/MdWork",
    name: "Experience",
    showTooltip: false,
  }),
};
