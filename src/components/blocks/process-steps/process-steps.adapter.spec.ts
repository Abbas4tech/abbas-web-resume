import { describe, expect, it } from "vitest";
import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import { adaptProcessSteps } from "./process-steps.adapter";

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
