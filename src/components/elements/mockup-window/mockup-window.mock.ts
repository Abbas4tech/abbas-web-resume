import React from "react";
import { MockupWindowBody } from "./index";
import type { MockupWindowProps } from "./types";

export const baseMock: MockupWindowProps = {
  className: "border bg-base-300 w-full max-w-md",
  children: React.createElement(
    MockupWindowBody,
    { className: "px-4 py-16 bg-base-200" },
    "Hello world!"
  ),
};
