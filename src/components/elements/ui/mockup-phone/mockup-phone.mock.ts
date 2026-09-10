import React from "react";
import type { MockupPhoneProps } from "./mockup-phone";
import { MockupPhoneCamera, MockupPhoneDisplay } from "./mockup-phone";

export const baseMock: MockupPhoneProps = {
  className: "border-primary",
  children: [
    React.createElement(MockupPhoneCamera, { key: "camera" }),
    React.createElement(
      MockupPhoneDisplay,
      { key: "display", className: "bg-base-200" },
      React.createElement(
        "div",
        { className: "flex h-full items-center justify-center" },
        "Hi."
      )
    ),
  ],
};
