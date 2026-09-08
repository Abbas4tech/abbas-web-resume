import { describe, expect, it } from "vitest";
import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import { adaptMetricsStrip } from "./metrics-strip.adapter";

describe("adaptMetricsStrip", () => {
  it("adapts ContentList entries into StatGroup props", () => {
    const input: AdaptedContentList = {
      customEntries: [
        {
          title: "Years of experience",
          subtitle: "5+",
          icon: { iconCode: "md/MdWork" },
        },
      ],
    } as unknown as AdaptedContentList;

    const result = adaptMetricsStrip(input);

    expect(result.stats).toEqual([
      {
        label: "Years of experience",
        value: "5+",
        icon: { iconCode: "md/MdWork" },
      },
    ]);
  });

  it("defaults value to an empty string when subtitle is missing", () => {
    const input: AdaptedContentList = {
      customEntries: [{ title: "Coffee consumed" }],
    } as unknown as AdaptedContentList;

    const result = adaptMetricsStrip(input);

    expect(result.stats[0].value).toBe("");
  });
});
