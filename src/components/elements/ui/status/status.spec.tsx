import { describe, expect, it } from "vitest";
import { render } from "@/test/utils";
import { Status } from "./status";

describe("Status", () => {
  it("applies color and size classes", () => {
    const { container } = render(<Status color="success" size="lg" />);
    const status = container.querySelector(".status");
    expect(status).toHaveClass("status-success", "status-lg");
  });

  it("applies custom classes", () => {
    const { container } = render(<Status className="custom-status" />);
    expect(container.querySelector(".status")).toHaveClass("custom-status");
  });
});
