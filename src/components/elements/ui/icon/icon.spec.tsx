import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { Icon } from "./icon";
// `?raw` reads source text rather than importing the module, so this test can
// assert on what the file *contains*, not just what it currently does at runtime.
import iconSource from "./icon.tsx?raw";

const invalidRegex = /invalid/i;
const nextDynamicImportRegex = /\bnext\/dynamic\b/;
const dynamicCallRegex = /\bdynamic\(/;
const bareImportCallRegex = /\bimport\(/;

describe("Icon", () => {
  it("renders a dynamic icon correctly", () => {
    // Dynamic import takes a moment, but testing-library handles it
    // or we can test the fallback state if it renders sync.
    const { container } = render(
      <Icon iconCode="fa/FaHome" name="Home Icon" />
    );

    // Check if the wrapper renders and tooltip applies
    const wrapper = container.querySelector(".tooltip");
    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toHaveAttribute("data-tip", "Home Icon");
  });

  it("handles missing icons gracefully with a fallback", () => {
    render(<Icon iconCode="invalid/InvalidIcon" name="Invalid" />);
    // Falls back to MdError which has role="img"
    const fallback = screen.getByRole("img", { name: invalidRegex });
    expect(fallback).toBeInTheDocument();
  });

  it("applies color and size styling", async () => {
    render(
      <Icon
        color="#ff0000"
        iconCode="fa/FaHome"
        name="Styled Icon"
        size="2rem"
      />
    );
    const icon = await screen.findByRole("img", { name: "Styled Icon" });
    expect(icon).toHaveStyle({ color: "rgb(255, 0, 0)" });
  });

  it("disables tooltip when showTooltip is false", () => {
    const { container } = render(
      <Icon iconCode="fa/FaHome" showTooltip={false} />
    );
    expect(container.querySelector(".tooltip")).not.toBeInTheDocument();
  });

  it("never re-introduces next/dynamic icon loading (ADR-0016 regression guard)", () => {
    // The curated static registry (ICON_REGISTRY / icon-map.ts) replaced dynamic()
    // imports specifically because creating dynamic() components inside render
    // caused React to unmount/remount icons on every state update (layout thrashing),
    // and eager-loading whole react-icons submodules to avoid that pushed first-load
    // JS to 575 kB. See docs/adr/0016-curated-static-icon-registry.md. If `dynamic(`
    // or a bare `import(` reappears here, that trade-off has been silently reverted.
    expect(iconSource).not.toMatch(nextDynamicImportRegex);
    expect(iconSource).not.toMatch(dynamicCallRegex);
    expect(iconSource).not.toMatch(bareImportCallRegex);
  });
});
