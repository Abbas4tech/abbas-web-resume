import React from "react";
import { DropdownMenu, DropdownMenuItem, DropdownToggle } from "./index";
import type { DropdownProps } from "./types";

export const baseMock: DropdownProps = {
  className: "dropdown",
  children: [
    React.createElement(
      DropdownToggle,
      { key: "toggle", className: "btn m-1" },
      "Click Me"
    ),
    React.createElement(
      DropdownMenu,
      {
        key: "menu",
        className:
          "dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52",
      },
      [
        React.createElement(
          DropdownMenuItem,
          { key: "1" },
          React.createElement("a", null, "Item 1")
        ),
        React.createElement(
          DropdownMenuItem,
          { key: "2" },
          React.createElement("a", null, "Item 2")
        ),
      ]
    ),
  ],
};
