import React from "react";
import type { ModalProps } from "./modal";
import { ModalBox } from "./modal";

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
