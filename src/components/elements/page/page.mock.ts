import React from "react";
import { PageHeading } from "./index";
import type { PageContentProps } from "./types";

export const baseMock: PageContentProps = {
  className: "max-w-3xl mx-auto py-10",
  children: [
    React.createElement(PageHeading, { key: "heading" }, "Page Heading"),
    React.createElement(
      "p",
      { key: "p1", className: "mt-4 text-base-content/80" },
      "This is a sample page component used as a wrapper for long-form content."
    ),
  ],
};
