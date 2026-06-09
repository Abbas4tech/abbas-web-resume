import React from "react";
import type { NavigationAnimationProps } from "./types";

export const baseMock: NavigationAnimationProps = {
  options: {
    duration: 500,
    easing: "ease-in-out",
  },
  children: React.createElement(
    "div",
    { className: "p-4 bg-primary text-primary-content rounded-box shadow-xl" },
    "Animated Content"
  ),
};
