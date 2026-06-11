import React from "react";
import type { TabsProps } from "./tabs";
import { Tab } from "./tabs";

export const baseMock: TabsProps = {
  variant: "boxed",
  children: [
    React.createElement(Tab, { key: "1", active: true }, "React"),
    React.createElement(Tab, { key: "2", active: false }, "Vue"),
    React.createElement(Tab, { key: "3", active: false }, "Angular"),
  ],
};
