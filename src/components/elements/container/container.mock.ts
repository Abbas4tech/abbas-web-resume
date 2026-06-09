import React from "react";
import type { ContainerProps } from "./types";

export const baseMock: ContainerProps = {
  className: "bg-base-200 p-8 rounded-xl shadow-inner",
  children: React.createElement(
    "p",
    { className: "text-center" },
    "This is responsive container content."
  ),
};
