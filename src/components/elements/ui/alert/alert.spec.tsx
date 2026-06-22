import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { Alert } from "./alert";

describe("Alert", () => {
  it("renders alert message", () => {
    render(<Alert variant="info">Info Message</Alert>);
    expect(screen.getByText("Info Message")).toBeInTheDocument();
  });

  it("applies variant-specific classes", () => {
    const { container } = render(<Alert variant="success">Success!</Alert>);
    expect(container.querySelector(".alert")).toHaveClass(
      "alert",
      "alert-success"
    );
  });
});
