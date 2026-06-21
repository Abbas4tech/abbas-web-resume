import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { PageContent, PageHeading } from "./page";

describe("Page Components", () => {
  it("renders PageContent correctly", () => {
    render(
      <PageContent className="custom-content" data-testid="page-test">
        Content
      </PageContent>
    );
    expect(screen.getByText("Content")).toBeInTheDocument();
    expect(screen.getByTestId("page-test")).toHaveClass("custom-content");
  });

  it("renders PageHeading correctly", () => {
    render(<PageHeading className="custom-heading">Heading</PageHeading>);
    const heading = screen.getByRole("heading", { name: "Heading" });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("flex", "items-center", "custom-heading");
  });
});
