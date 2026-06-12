import { describe, expect, it } from "vitest";
import { adaptInfoStatRow } from "./info-stat-row.adapter";

describe("adaptInfoStatRow", () => {
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

    expect(adaptInfoStatRow(input)).toEqual(expected);
  });
});
