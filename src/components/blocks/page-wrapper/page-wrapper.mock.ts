import React from "react";
import type { PageWrapperProps } from "./page-wrapper";

export const baseMock: PageWrapperProps = {
  children: React.createElement(
    "div",
    {
      className:
        "p-8 text-center text-xl border-4 border-dashed border-base-300 rounded-xl",
    },
    "This is the dynamic page content rendered within the wrapper."
  ),
  pages: [
    { title: "Home", pageUrl: "/", isDefaultPage: true },
    { title: "About", pageUrl: "/about" },
    { title: "Projects", pageUrl: "/projects" },
  ],
};
