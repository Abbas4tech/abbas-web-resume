import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import {
  Step,
  StepBody,
  StepContent,
  StepDescription,
  StepIndicator,
  StepSeparator,
  StepTitle,
} from "./step";

describe("Step Components", () => {
  it("renders full step structure", () => {
    render(
      <Step data-testid="step-item">
        <StepSeparator data-testid="step-sep" />
        <StepIndicator>1</StepIndicator>
        <StepBody>
          <StepTitle>Step One</StepTitle>
          <StepDescription>This is the first step.</StepDescription>
          <StepContent>Inner Content</StepContent>
        </StepBody>
      </Step>
    );

    expect(screen.getByTestId("step-item")).toHaveClass("relative", "flex");
    expect(screen.getByTestId("step-sep")).toHaveClass("border-gray-600");
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Step One")).toHaveClass("font-extrabold");
    expect(screen.getByText("This is the first step.")).toBeInTheDocument();
    expect(screen.getByText("Inner Content")).toBeInTheDocument();
  });
});
