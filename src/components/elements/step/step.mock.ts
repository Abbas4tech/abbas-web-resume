import React from "react";
import { StepBody, StepDescription, StepIndicator, StepTitle } from "./index";
import type { StepProps } from "./types";

export const baseMock: StepProps = {
  className: "step-primary",
  children: [
    React.createElement(StepIndicator, { key: "ind" }, "1"),
    React.createElement(StepBody, { key: "body" }, [
      React.createElement(StepTitle, { key: "title" }, "Registration"),
      React.createElement(
        StepDescription,
        { key: "desc" },
        "Create an account"
      ),
    ]),
  ],
};
