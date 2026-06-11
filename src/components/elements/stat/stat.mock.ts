import React from "react";
import type { StatsProps } from "./stat";
import { Stat, StatDescription, StatFigure, StatTitle } from "./stat";

export const baseMock: StatsProps = {
  className: "shadow",
  children: React.createElement(Stat, null, [
    React.createElement(StatTitle, { key: "title" }, "Total Page Views"),
    React.createElement(StatFigure, { key: "fig" }, "89,400"),
    React.createElement(
      StatDescription,
      { key: "desc" },
      "21% more than last month"
    ),
  ]),
};
