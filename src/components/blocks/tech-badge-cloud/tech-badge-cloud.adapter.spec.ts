import { describe, expect, it } from "vitest";
import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import { adaptTechBadgeCloud } from "./tech-badge-cloud.adapter";

describe("adaptTechBadgeCloud", () => {
  it("adapts ContentList entries into label/icon badge items", () => {
    const input: AdaptedContentList = {
      customEntries: [
        { title: "React", icon: { iconCode: "si/SiReact" } },
        { title: "TypeScript" },
      ],
    } as unknown as AdaptedContentList;

    const result = adaptTechBadgeCloud(input);

    expect(result.items).toEqual([
      { label: "React", icon: { iconCode: "si/SiReact" } },
      { label: "TypeScript", icon: undefined },
    ]);
  });
});
