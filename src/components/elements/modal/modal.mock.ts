import React from "react";
import { ModalBox } from "./index";
import type { ModalProps } from "./types";

export const baseMock: ModalProps = {
  open: true,
  children: React.createElement(ModalBox, null, [
    React.createElement(
      "h3",
      { key: "title", className: "font-bold text-lg" },
      "Hello!"
    ),
    React.createElement(
      "p",
      { key: "desc", className: "py-4" },
      "Press ESC key or click outside to close"
    ),
  ]),
};
