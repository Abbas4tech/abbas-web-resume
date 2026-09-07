import { afterEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@/test/utils";
import { ThemeToggle } from "./theme-toggle";

describe("ThemeToggle", () => {
  afterEach(() => {
    document.documentElement.removeAttribute("data-theme");
  });

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

  it("marks the currently selected theme as active", () => {
    render(<ThemeToggle defaultTheme="light" themes={["light", "dark"]} />);

    const lightItem = screen.getByText("light").closest("span");
    const darkItem = screen.getByText("dark").closest("span");
    expect(lightItem).toHaveClass("text-transparent");
    expect(darkItem).not.toHaveClass("text-transparent");
  });

  it("switches the active theme and updates the document's data-theme attribute on click", () => {
    render(<ThemeToggle defaultTheme="light" themes={["light", "dark"]} />);

    fireEvent.click(screen.getByText("dark"));

    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
    expect(screen.getByText("dark").closest("span")).toHaveClass(
      "text-transparent"
    );
    expect(screen.getByText("light").closest("span")).not.toHaveClass(
      "text-transparent"
    );
  });

  it("wraps the theme change in a view transition when the browser supports it", () => {
    const docWithViewTransition = document as unknown as {
      startViewTransition?: (callback: () => void) => void;
    };
    const startViewTransition = vi.fn((callback: () => void) => callback());
    docWithViewTransition.startViewTransition = startViewTransition;

    render(<ThemeToggle defaultTheme="light" themes={["light", "dark"]} />);
    fireEvent.click(screen.getByText("dark"));

    expect(startViewTransition).toHaveBeenCalledTimes(1);
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");

    docWithViewTransition.startViewTransition = undefined;
  });

  it("renders a custom themeIcon instead of the default palette swatch", () => {
    render(
      <ThemeToggle
        defaultTheme="light"
        themeIcon={{ iconCode: "fa/FaPalette", name: "Theme" }}
        themes={["light", "dark"]}
      />
    );

    expect(screen.getByRole("button").querySelector("svg")).not.toBeNull();
  });
});
