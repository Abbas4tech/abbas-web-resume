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
});
