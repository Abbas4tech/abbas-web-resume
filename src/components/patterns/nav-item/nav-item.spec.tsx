import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { NavItem } from "./nav-item";

const ABOUT_ME_REGEX = /about me/i;

describe("NavItem", () => {
  const mockProps = {
    href: "/about",
    iconCode: "fa/FaUser",
    iconName: "User Icon",
    label: "About Me",
  };

  it("renders a link with icon and text", async () => {
    render(<NavItem data-testid="nav-wrapper" {...mockProps} />);

    expect(screen.getByTestId("nav-wrapper")).toBeInTheDocument();

    const link = screen.getByRole("link", { name: ABOUT_ME_REGEX });
    expect(link).toHaveAttribute("href", "/about");

    const icon = await screen.findByRole("img", { name: "User Icon" });
    expect(icon).toBeInTheDocument();
  });

  it("applies active styles when isActive is true", () => {
    render(<NavItem {...mockProps} isActive={true} />);

    const link = screen.getByRole("link", { name: ABOUT_ME_REGEX });
    expect(link).toHaveClass("border-primary", "bg-base-200", "font-bold");
  });

  it("does not apply active styles when isActive is false", () => {
    render(<NavItem {...mockProps} isActive={false} />);

    const link = screen.getByRole("link", { name: ABOUT_ME_REGEX });
    expect(link).not.toHaveClass("border-primary", "bg-base-200", "font-bold");
  });
});
