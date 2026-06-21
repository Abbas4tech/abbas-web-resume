import { describe, expect, it } from "vitest";
import { render, screen } from "@/test/utils";
import { Kbd } from "./kbd";

describe("Kbd", () => {
  it("renders standard kbd element", () => {
    render(<Kbd>Ctrl</Kbd>);
    const el = screen.getByText("Ctrl");
    expect(el.tagName).toBe("KBD");
    expect(el).toHaveClass("kbd");
  });

  it("applies custom classes", () => {
    render(<Kbd className="kbd-lg">Shift</Kbd>);
    expect(screen.getByText("Shift")).toHaveClass("kbd-lg");
  });
});
