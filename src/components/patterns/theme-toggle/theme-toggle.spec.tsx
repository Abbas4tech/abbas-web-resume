import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { ThemeToggle } from "./theme-toggle";

describe("ThemeToggle", () => {
  it("renders default theme correctly", () => {
    render(
      <ThemeToggle
        defaultTheme="cupcake"
        themes={["light", "dark", "cupcake"]}
      />
    );

    // Check if the trigger renders
    const toggleButton = screen.getByRole("button");
    expect(toggleButton).toBeInTheDocument();
  });

  it("renders theme list items correctly", () => {
    render(<ThemeToggle defaultTheme="light" themes={["light", "dark"]} />);

    // DaisyUI Dropdown menu items are rendered
    expect(screen.getByText("light")).toBeInTheDocument();
    expect(screen.getByText("dark")).toBeInTheDocument();
  });
});
