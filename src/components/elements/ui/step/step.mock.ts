import React from "react";
import type { StepProps } from "./step";
import { StepBody, StepDescription, StepIndicator, StepTitle } from "./step";

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
