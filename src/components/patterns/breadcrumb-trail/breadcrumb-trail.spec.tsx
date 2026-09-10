import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { BreadcrumbTrail } from "./breadcrumb-trail";

describe("BreadcrumbTrail", () => {
  const items = [
    { href: "/", label: "Home" },
    { href: "/projects", label: "Projects" },
    { href: "/projects/fixture-dashboard", label: "Fixture Dashboard" },
  ];

  it("links every item except the last", () => {
    render(<BreadcrumbTrail items={items} />);

    const homeLink = screen.getByRole("link", { name: "Home" });
    expect(homeLink).toHaveAttribute("href", "/");

    const projectsLink = screen.getByRole("link", { name: "Projects" });
    expect(projectsLink).toHaveAttribute("href", "/projects");

    expect(
      screen.queryByRole("link", { name: "Fixture Dashboard" })
    ).not.toBeInTheDocument();
  });

  it("marks the last item as the current page", () => {
    render(<BreadcrumbTrail items={items} />);

    const current = screen.getByText("Fixture Dashboard");
    expect(current).toHaveAttribute("aria-current", "page");
  });
});
