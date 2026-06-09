import React from "react";
import { IconProgressRow } from "@/components/patterns/icon-progress-row";
import type { IconProgressGroupProps } from "./types";

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
