import React from "react";
import { AccordionItem } from "./index";
import type { AccordionProps } from "./types";

export const baseMock: AccordionProps = {
  children: [
    React.createElement(
      AccordionItem,
      {
        key: "1",
        name: "my-accordion",
        title: "What is your main tech stack?",
      },
      "I primarily use React, Next.js, and TypeScript, along with TailwindCSS."
    ),
    React.createElement(
      AccordionItem,
      {
        key: "2",
        name: "my-accordion",
        title: "How long have you been coding?",
      },
      "I have been writing code professionally for over 5 years."
    ),
    React.createElement(
      AccordionItem,
      { key: "3", name: "my-accordion", title: "Are you open to freelance?" },
      "Yes, depending on the project scope and my current availability."
    ),
  ],
};
