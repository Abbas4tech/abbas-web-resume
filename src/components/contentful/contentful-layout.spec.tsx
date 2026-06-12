import { describe, expect, it } from "vitest";
import type { AdaptedLayout } from "@/contentful/adapters/layout";
import { render, screen } from "@/test/utils";
import { ContentfulLayout } from "./contentful-layout";

describe("ContentfulLayout", () => {
  it("renders layout with children", () => {
    const mockLayout = {
      __typename: "Layout",
      id: "l1",
      title: "My Layout",
      internalName: "Main",
      drawerSide: "left",
      drawerVariant: "default",
      resume: null,
      resumeIcon: null,
      themeList: ["light", "dark"],
      defaultTheme: "light",
      navigation: {
        customEntries: [
          { title: "Index", entryField: "", links: [{ href: "/" }] },
          { title: "Home", entryField: "home", links: [{ href: "/home" }] },
          {
            title: "Next Page",
            entryField: "next",
            links: [{ href: "/next" }],
          },
        ],
      },
    };

    render(
      <ContentfulLayout data={mockLayout as unknown as AdaptedLayout}>
        <div data-testid="layout-child">Child Content</div>
      </ContentfulLayout>
    );

    // AppHeader
    expect(screen.getByRole("link", { name: "My Layout" })).toBeInTheDocument();

    // Child
    expect(screen.getByTestId("layout-child")).toBeInTheDocument();
  });
});
