import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { IconLink } from "./icon-link";

describe("IconLink", () => {
  const mockProps = {
    href: "https://twitter.com/test",
    iconHeight: 32,
    iconSrc: "/twitter-icon.png",
    iconWidth: 32,
    label: "Twitter Profile",
  };

  it("renders social link with correct tooltip and link attributes", () => {
    render(<IconLink {...mockProps} />);

    // Tooltip wrapper
    const tooltip = screen.getByRole("tooltip", { name: "Twitter Profile" });
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toHaveClass("tooltip", "tooltip-bottom");
    expect(tooltip).toHaveAttribute("data-tip", "Twitter Profile");

    // Link
    const link = screen.getByRole("link", { name: "Visit Twitter Profile" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://twitter.com/test");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");

    // Icon Image
    const img = screen.getByRole("img", { name: "Twitter Profile icon" });
    expect(img).toBeInTheDocument();
  });

  it("applies custom class names", () => {
    render(
      <IconLink {...mockProps} className="custom-social" data-testid="social" />
    );
    expect(screen.getByTestId("social")).toHaveClass("custom-social");
  });
});
