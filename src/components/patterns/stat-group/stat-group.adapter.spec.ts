import { describe, expect, it } from "vitest";
import { adaptStatGroup } from "./stat-group.adapter";

describe("adaptStatGroup", () => {
  it("adapts Contentful Info type correctly", () => {
    const input = {
      title: "Years of Experience",
      value: "5+",
      icon: {
        iconCode: "fa/FaClock",
        name: "Clock",
      },
    };

    const expected = {
      label: "Years of Experience",
      value: "5+",
      icon: {
        iconCode: "fa/FaClock",
        classes: undefined,
        showTooltip: undefined,
        name: "Clock",
      },
    };

    expect(adaptStatGroup(input)).toEqual(expected);
  });
});
