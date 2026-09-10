import React from "react";
import type { MockupBrowserProps } from "./mockup-browser";

export const baseMock: MockupBrowserProps = {
  className: "border bg-base-300 w-full max-w-md",
  children: React.createElement(
    "div",
    { className: "flex justify-center px-4 py-16 bg-base-200" },
    "Hello world!"
  ),
};
