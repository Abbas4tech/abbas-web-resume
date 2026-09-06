import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NotFoundBlock } from "./not-found";

describe("NotFoundBlock", () => {
  it("renders with default props", () => {
    render(<NotFoundBlock />);

    expect(screen.getByText("404 - Page Not Found")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Oops! The page you are looking for doesn't exist or has been moved."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Go back home")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
  });

  it("renders with custom props", () => {
    render(
      <NotFoundBlock
        actionHref="/projects"
        actionLabel="Go to Projects"
        message="Custom message"
        title="Custom Title"
      />
    );

    expect(screen.getByText("Custom Title")).toBeInTheDocument();
    expect(screen.getByText("Custom message")).toBeInTheDocument();
    expect(screen.getByText("Go to Projects")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/projects");
  });
});
