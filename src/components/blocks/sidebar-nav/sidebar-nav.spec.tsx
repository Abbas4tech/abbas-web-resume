import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { SidebarNav } from "./sidebar-nav";

const HomeRegex = /Home/i;
const ContactRegex = /Contact/i;

describe("SidebarNav", () => {
  const mockPages = [
    {
      title: "Home",
      slug: "/",
      pageUrl: "/",
      pageIcon: { iconCode: "fa/FaHome", name: "Home Icon" },
      isDefaultPage: true,
    },
    {
      title: "Contact",
      slug: "contact",
      pageUrl: "/contact",
      pageIcon: { iconCode: "fa/FaPhone", name: "Phone Icon" },
      isDefaultPage: false,
    },
  ];

  it("renders side menu with navigation links", async () => {
    render(<SidebarNav data-testid="sidebar" pages={mockPages} />);

    const sidebar = screen.getByTestId("sidebar");
    expect(sidebar).toBeInTheDocument();

    // Links
    const homeLink = screen.getByRole("link", { name: HomeRegex });
    expect(homeLink).toHaveAttribute("href", "/");

    const contactLink = screen.getByRole("link", { name: ContactRegex });
    expect(contactLink).toHaveAttribute("href", "/contact");

    // Icons
    expect(
      await screen.findByRole("img", { name: "Home Icon" })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("img", { name: "Phone Icon" })
    ).toBeInTheDocument();
  });
});
