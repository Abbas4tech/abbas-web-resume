import React from "react";
import { Tab } from "./index";
import type { TabsProps } from "./types";

export const baseMock: TabsProps = {
  variant: "boxed",
  children: [
    React.createElement(Tab, { key: "1", active: true }, "React"),
    React.createElement(Tab, { key: "2", active: false }, "Vue"),
    React.createElement(Tab, { key: "3", active: false }, "Angular"),
  ],
};
