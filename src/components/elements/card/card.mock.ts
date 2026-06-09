import React from "react";
import { CardContent, CardDescription, CardTitle } from "./index";
import type { CardProps } from "./types";

export const baseMock: CardProps = {
  className: "w-96 shadow-xl",
  children: React.createElement(CardContent, null, [
    React.createElement(CardTitle, { key: "title" }, "Project Title"),
    React.createElement(
      CardDescription,
      { key: "desc" },
      "A brief description of this awesome project. It highlights key features and technologies used."
    ),
  ]),
};
