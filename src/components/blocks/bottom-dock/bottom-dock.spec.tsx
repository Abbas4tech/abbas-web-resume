import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@/test/utils";
import { BottomDock } from "./bottom-dock";

// Mock the drawer hook to force the dock to render
vi.mock("@/components/elements/ui/drawer/drawer", async (importOriginal) => {
  const actual =
    await importOriginal<
      typeof import("@/components/elements/ui/drawer/drawer")
    >();
  return {
    ...actual,
    useDrawer: vi.fn().mockReturnValue({
      variant: "dock-on-mobile",
      isMobile: true,
      toggleDrawer: vi.fn(),
      closeDrawer: vi.fn(),
    }),
  };
});

const homeLinkRegex = /Home/;
const aboutLinkRegex = /About/;

describe("BottomDock", () => {
  const mockItems = [
    {
      title: "Home",
      pageUrl: "/",
      pageIcon: { iconCode: "fa/FaHome", name: "Home Icon" },
    },
    {
      title: "About",
      pageUrl: "/about",
      pageIcon: { iconCode: "fa/FaUser", name: "User Icon" },
    },
  ];

  it("renders dock and items on mobile with dock-on-mobile variant", async () => {
    render(<BottomDock data-testid="bottom-dock" items={mockItems} />);

    // Check Dock wrapper
    const dock = screen.getByTestId("bottom-dock");
    expect(dock).toBeInTheDocument();
    expect(dock).toHaveClass("bg-base-300");

    // Check items
    const homeLink = screen.getByRole("link", { name: homeLinkRegex });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");

    const aboutLink = screen.getByRole("link", { name: aboutLinkRegex });
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute("href", "/about");

    // Icons
    const homeIcon = await screen.findByRole("img", { name: "Home Icon" });
    expect(homeIcon).toBeInTheDocument();
  });
});
