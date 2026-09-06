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

  it("bolds the label when active, matching the previous SidebarMenu behavior (ADR-0020 regression guard)", () => {
    // The refactor from SidebarMenu -> SidebarNav/NavItem dropped the active
    // page's font-bold weight entirely: `isActive` was accepted as a prop but
    // never read. The active state ended up indicated only by a background
    // highlight box, with no font-weight distinction on the text itself. See
    // docs/adr/0020-font-loading-and-typography-continuity-audit.md, Finding 8b.
    render(<NavItem {...mockProps} isActive={true} />);
    const link = screen.getByRole("link", { name: ABOUT_ME_REGEX });
    expect(link).toHaveClass("font-bold");
  });

  it("does not bold the label when inactive", () => {
    render(<NavItem {...mockProps} isActive={false} />);
    const link = screen.getByRole("link", { name: ABOUT_ME_REGEX });
    expect(link).not.toHaveClass("font-bold");
  });
});
