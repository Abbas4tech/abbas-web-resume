import React from "react";
import type { MenuProps } from "./menu";
import { MenuItem } from "./menu";

export const baseMock: MenuProps = {
  className: "bg-base-200 w-56 rounded-box",
  children: [
    React.createElement(
      MenuItem,
      { key: "1" },
      React.createElement("a", null, "Item 1")
    ),
    React.createElement(
      MenuItem,
      { key: "2" },
      React.createElement("a", { className: "active" }, "Item 2 (Active)")
    ),
    React.createElement(
      MenuItem,
      { key: "3" },
      React.createElement("a", null, "Item 3")
    ),
  ],
};
