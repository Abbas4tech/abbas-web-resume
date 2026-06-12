import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { PageWrapper } from "./page-wrapper";

const NextPageRegex = /Next Page/i;

describe("PageWrapper", () => {
  const mockPages = [
    { title: "Home", slug: "/", pageUrl: "/", sys: { id: "1" } },
    { title: "Next Page", slug: "next", pageUrl: "/next", sys: { id: "2" } },
  ];

  it("renders children and page nav button inside a main tag", () => {
    render(
      <PageWrapper data-testid="main-wrapper" pages={mockPages}>
        <div data-testid="child-content">Child Content Here</div>
      </PageWrapper>
    );

    const main = screen.getByTestId("main-wrapper");
    expect(main.tagName).toBe("MAIN");
    expect(main).toHaveClass("flex", "flex-col");

    expect(screen.getByTestId("child-content")).toBeInTheDocument();

    // Check that PageNavButton is rendered (it should show the next page title)
    expect(
      screen.getByRole("button", { name: NextPageRegex })
    ).toBeInTheDocument();
  });
});
