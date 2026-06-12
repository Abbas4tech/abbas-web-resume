import { describe, expect, it } from "vitest";
import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import { adaptPanelShowcase } from "./panel-showcase.adapter";

describe("adaptPanelShowcase", () => {
  it("adapts ContentList into PanelShowcaseProps", () => {
    const input: AdaptedContentList = {
      customEntries: [
        {
          title: "Frontend Skills",
          icon: { iconCode: "fa/FaReact" },
          subItems: [
            { progress: 90, icon: { iconCode: "fa/FaJs" } },
            { progress: 80, icon: { iconCode: "fa/FaCss3" } },
          ],
        },
      ],
    } as unknown as AdaptedContentList;

    const result = adaptPanelShowcase(input);

    expect(result.animation).toBeUndefined();
    expect(result.panels).toHaveLength(1);
    expect(result.panels[0].title).toBe("Frontend Skills");
    expect(result.panels[0].headingIcon).toEqual({ iconCode: "fa/FaReact" });

    expect(result.panels[0].rows).toHaveLength(2);
    expect(result.panels[0].rows[0].progress).toBe(90);
    expect(result.panels[0].rows[0].icons).toEqual([{ iconCode: "fa/FaJs" }]);
  });
});
