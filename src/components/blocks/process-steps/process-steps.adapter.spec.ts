import { describe, expect, it } from "vitest";
import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import {
  adaptProcessSteps,
  adaptProcessStepsWithTimeline,
} from "./process-steps.adapter";

describe("adaptProcessSteps", () => {
  it("adapts ContentList entries into ordered process steps", () => {
    const input: AdaptedContentList = {
      customEntries: [
        {
          title: "Discover",
          description: "Understand the problem.",
          icon: { iconCode: "fa/FaCode" },
        },
        { title: "Ship" },
      ],
    } as unknown as AdaptedContentList;

    const result = adaptProcessSteps(input);

    expect(result.steps).toEqual([
      {
        title: "Discover",
        description: "Understand the problem.",
        icon: { iconCode: "fa/FaCode" },
      },
      { title: "Ship", description: undefined, icon: undefined },
    ]);
  });
});

describe("adaptProcessStepsWithTimeline", () => {
  it("adapts ContentList entries with layout='timeline'", () => {
    const input: AdaptedContentList = {
      customEntries: [{ title: "Discover" }],
    } as unknown as AdaptedContentList;

    const result = adaptProcessStepsWithTimeline(input);

    expect(result.layout).toBe("timeline");
    expect(result.steps).toEqual([
      { title: "Discover", description: undefined, icon: undefined },
    ]);
  });
});
