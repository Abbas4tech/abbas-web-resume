import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { PageNavButton } from "./page-nav-button";

const ABOUT_REGEX = /About/i;

describe("PageNavButton", () => {
  const mockPages = [
    { title: "Home", slug: "/", pageUrl: "/", sys: { id: "1" } },
    { title: "About", slug: "about", pageUrl: "/about", sys: { id: "2" } },
  ];

  it("renders the next page title and an icon", async () => {
    // Because AppRouterContextProvider provides '/' by default, next page is 'About'
    render(<PageNavButton pages={mockPages} />);

    const button = screen.getByRole("button", { name: ABOUT_REGEX });
    expect(button).toBeInTheDocument();

    const icon = await screen.findByRole("img", { name: "Next Page" });
    expect(icon).toBeInTheDocument();
  });

  it("applies custom class names", () => {
    render(<PageNavButton className="custom-nav-btn" pages={mockPages} />);

    // We get the button by role
    const button = screen.getByRole("button", { name: ABOUT_REGEX });
    expect(button).toHaveClass("custom-nav-btn");
  });
});
