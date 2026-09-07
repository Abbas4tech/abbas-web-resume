import { fireEvent } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Drawer } from "@/components/elements/ui/drawer/drawer";
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

  it("closes the drawer when a nav link is clicked", () => {
    // Closing on click used to be DrawerSideItem's own job (a <button>
    // wrapping the link), which nested two interactive controls — an axe
    // "nested-interactive" violation. It's now wired directly onto the
    // link itself via NavItem's onClick, exercised here through a real
    // Drawer so the resulting state change is observable.
    const { container } = render(
      <Drawer>
        <SidebarNav pages={mockPages} />
      </Drawer>
    );

    const drawer = container.querySelector(".drawer");
    expect(drawer).toHaveAttribute("data-state", "expanded");

    fireEvent.click(screen.getByRole("link", { name: HomeRegex }));

    expect(drawer).toHaveAttribute("data-state", "collapsed");
  });
});
