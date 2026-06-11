import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { Button } from "./button";

describe("Button", () => {
  it("renders native button by default", () => {
    render(<Button>Click me</Button>);
    // biome-ignore lint/performance/useTopLevelRegex: test string matching
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe("BUTTON");
  });

  it("renders link when asLink is true", () => {
    render(
      <Button asLink href="/test">
        Go to test
      </Button>
    );
    // biome-ignore lint/performance/useTopLevelRegex: test string matching
    const link = screen.getByRole("link", { name: /go to test/i });
    expect(link).toBeInTheDocument();
    expect(link.tagName).toBe("A");
    expect(link).toHaveAttribute("href", "/test");
  });

  it("applies custom className", () => {
    render(<Button className="custom-class">Test</Button>);
    expect(screen.getByRole("button")).toHaveClass("custom-class");
  });

  it("passes native attributes properly", () => {
    render(
      <Button data-testid="test-btn" disabled>
        Test
      </Button>
    );
    const button = screen.getByTestId("test-btn");
    expect(button).toBeDisabled();
  });
});
