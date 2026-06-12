import { describe, expect, it } from "vitest";
import { adaptSectionHeading } from "./section-heading.adapter";

describe("adaptSectionHeading", () => {
  it("adapts title to children prop", () => {
    expect(adaptSectionHeading({ title: "My Title" })).toEqual({
      children: "My Title",
    });
  });
});
