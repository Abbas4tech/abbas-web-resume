import React from "react";
import type { MockupWindowProps } from "./mockup-window";
import { MockupWindowBody } from "./mockup-window";

export const baseMock: MockupWindowProps = {
  className: "border bg-base-300 w-full max-w-md",
  children: React.createElement(
    MockupWindowBody,
    { className: "px-4 py-16 bg-base-200" },
    "Hello world!"
  ),
};
