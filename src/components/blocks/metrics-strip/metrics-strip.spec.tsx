import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { MetricsStrip } from "./metrics-strip";

describe("MetricsStrip", () => {
  const mockProps = {
    stats: [
      { label: "Years of experience", value: "5+" },
      { label: "Projects shipped", value: "30+" },
    ],
  };

  it("renders every stat's label and value", () => {
    render(<MetricsStrip {...mockProps} />);

    expect(screen.getByText("Years of experience")).toBeInTheDocument();
    expect(screen.getByText("5+")).toBeInTheDocument();
    expect(screen.getByText("Projects shipped")).toBeInTheDocument();
    expect(screen.getByText("30+")).toBeInTheDocument();
  });
});
