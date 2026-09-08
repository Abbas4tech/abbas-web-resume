import { createElement } from "react";
import type { PageWrapperProps } from "./page-wrapper";

export const baseMock: PageWrapperProps = {
  pages: [
    { title: "Home", pageUrl: "/", isDefaultPage: true },
    { title: "Projects", pageUrl: "/projects" },
    { title: "Contact", pageUrl: "/contact" },
  ],
  children: createElement(
    "div",
    { className: "prose max-w-none p-6" },
    createElement("h1", null, "Page Content"),
    createElement(
      "p",
      null,
      "PageWrapper establishes the scrollable main shell and appends the next/previous page nav button below whatever is passed as children."
    )
  ),
};
