import { describe, expect, it } from "vitest";
import type { AdaptedLink } from "@/contentful/adapters/link";
import { render, screen } from "@/test/utils";
import { Link } from "./link";

describe("Contentful Link", () => {
  it("renders internal link without target blank", () => {
    const mockData = {
      __typename: "Link",
      id: "1",
      href: "/about",
      text: "Internal Link",
    };

    render(<Link data={mockData as unknown as AdaptedLink} />);
    const link = screen.getByRole("link", { name: "Internal Link" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/about");
    expect(link).not.toHaveAttribute("target");
  });

  it("renders external link with target blank", () => {
    const mockData = {
      __typename: "Link",
      id: "2",
      href: "https://example.com",
      text: "External Link",
    };

    render(<Link data={mockData as unknown as AdaptedLink} />);
    const link = screen.getByRole("link", { name: "External Link" });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders children if provided instead of text", () => {
    const mockData = {
      __typename: "Link",
      id: "3",
      href: "/about",
      text: "Original Text",
    };

    render(
      <Link data={mockData as unknown as AdaptedLink}>
        <span>Custom Child</span>
      </Link>
    );
    expect(screen.getByText("Custom Child")).toBeInTheDocument();
    expect(screen.queryByText("Original Text")).not.toBeInTheDocument();
  });
});
