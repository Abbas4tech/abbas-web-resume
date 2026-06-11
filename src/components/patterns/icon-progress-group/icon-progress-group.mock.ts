import React from "react";
import { IconProgressRow } from "@/components/patterns/icon-progress-row/icon-progress-row";
import type { IconProgressGroupProps } from "./icon-progress-group";

export const baseMock: IconProgressGroupProps = {
  children: [
    React.createElement(
      IconProgressRow,
      {
        key: "frontend",
        progress: 90,
      },
      "Frontend Skills"
    ),
    React.createElement(
      IconProgressRow,
      {
        key: "backend",
        progress: 80,
      },
      "Backend Skills"
    ),
  ],
};
