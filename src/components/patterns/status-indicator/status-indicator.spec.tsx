import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { StatusIndicator } from "./status-indicator";

describe("StatusIndicator", () => {
  it("renders the label and a decorative status dot", () => {
    const { container } = render(
      <StatusIndicator color="success" label="Open to new roles" />
    );

    expect(screen.getByText("Open to new roles")).toBeInTheDocument();

    const dot = container.querySelector(".status");
    expect(dot).toHaveClass("status-success");
    expect(dot).toHaveAttribute("aria-hidden", "true");
  });
});
