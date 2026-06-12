import { describe, expect, it } from "vitest";
import { adaptIconProgressRow } from "./icon-progress-row.adapter";

describe("adaptIconProgressRow", () => {
  it("adapts Contentful structure to IconProgressRow props", () => {
    const input = {
      skillProgress: 88,
    };

    expect(adaptIconProgressRow(input)).toEqual({ progress: 88 });
  });
});
