import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { CountdownUnit } from "./countdown-unit";

describe("CountdownUnit", () => {
  it("renders the value and its unit label", () => {
    render(<CountdownUnit label="Days" value={15} />);

    expect(screen.getByText("15")).toBeInTheDocument();
    expect(screen.getByText("Days")).toBeInTheDocument();
    expect(screen.getByLabelText("15 Days")).toBeInTheDocument();
  });
});
