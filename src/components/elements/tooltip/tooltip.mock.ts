import React from "react";
import type { TooltipProps } from "./types";

export const baseMock: TooltipProps = {
  tip: "Hello World!",
  position: "top",
  children: React.createElement(
    "button",
    { className: "btn", type: "button" },
    "Hover Me"
  ),
};
