import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { AvailabilityBanner } from "./availability-banner";

const DAYS_LABEL_PATTERN = /Days/;

describe("AvailabilityBanner", () => {
  it("renders the status message without a countdown by default", () => {
    render(<AvailabilityBanner message="Open to new roles" />);

    expect(screen.getByText("Open to new roles")).toBeInTheDocument();
    expect(screen.queryByLabelText(DAYS_LABEL_PATTERN)).not.toBeInTheDocument();
  });

  it("renders a countdown when daysUntil is provided", () => {
    render(<AvailabilityBanner daysUntil={15} message="Available from" />);

    expect(screen.getByText("15")).toBeInTheDocument();
    expect(screen.getByLabelText("15 Days")).toBeInTheDocument();
  });
});
