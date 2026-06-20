import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { NavigationAnimation } from "./navigation";

describe("NavigationAnimation", () => {
  it("renders children wrapped in navigation container", () => {
    const { container } = render(
      <NavigationAnimation data-testid="nav-anim" options={{ offset: 100 }}>
        <p>Animated Content</p>
      </NavigationAnimation>
    );

    expect(container.querySelector("p")).toBeInTheDocument();
    // Since AOS and scrollTo are mocked or run via useEffect, we just ensure it mounts safely
    const wrap = screen.getByTestId("nav-anim");
    expect(wrap).toBeInTheDocument();
  });

  it("applies custom class names", () => {
    render(
      <NavigationAnimation
        className="custom-nav"
        data-testid="nav-test"
        options={{}}
      />
    );
    expect(screen.getByTestId("nav-test")).toHaveClass("custom-nav");
  });
});
