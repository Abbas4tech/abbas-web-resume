import React from "react";
import { Icon } from "@/components/elements/ui/icon/icon";
import type { IconClusterProps } from "./icon-cluster";

export const baseMock: IconClusterProps = {
  children: [
    React.createElement(Icon, {
      key: "react",
      iconCode: "si/SiReact",
      name: "React",
    }),
    React.createElement(Icon, {
      key: "node",
      iconCode: "si/SiNodedotjs",
      name: "Node.js",
    }),
    React.createElement(Icon, {
      key: "ts",
      iconCode: "si/SiTypescript",
      name: "TypeScript",
    }),
  ],
};
