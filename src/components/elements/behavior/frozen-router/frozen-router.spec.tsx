import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useContext } from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { FrozenRouter } from "./frozen-router";

function ContextReader() {
  const context = useContext(LayoutRouterContext) as unknown as {
    current: string;
  } | null;
  return <span data-testid="context-value">{context?.current}</span>;
}

describe("FrozenRouter", () => {
  it("renders its children", () => {
    render(
      <FrozenRouter>
        <p>Routed content</p>
      </FrozenRouter>
    );

    expect(screen.getByText("Routed content")).toBeInTheDocument();
  });

  it("freezes the router context at first mount, ignoring later parent updates", () => {
    const parentValue = { current: "first" } as never;

    const { rerender } = render(
      <LayoutRouterContext.Provider value={parentValue}>
        <FrozenRouter>
          <ContextReader />
        </FrozenRouter>
      </LayoutRouterContext.Provider>
    );

    expect(screen.getByTestId("context-value").textContent).toBe("first");

    const updatedValue = { current: "second" } as never;
    rerender(
      <LayoutRouterContext.Provider value={updatedValue}>
        <FrozenRouter>
          <ContextReader />
        </FrozenRouter>
      </LayoutRouterContext.Provider>
    );

    // FrozenRouter captures the context in a ref on first render and always
    // re-provides that frozen snapshot, so a child must keep reading the
    // original value even though the surrounding LayoutRouterContext changed.
    expect(screen.getByTestId("context-value").textContent).toBe("first");
  });
});
