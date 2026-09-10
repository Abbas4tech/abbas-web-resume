import { describe, expect, it } from "vitest";
import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import {
  adaptPanelShowcase,
  adaptPanelShowcaseWithRadialProgress,
  adaptSkillsMatrix,
} from "./panel-showcase.adapter";

describe("adaptPanelShowcase", () => {
  it("adapts ContentList into PanelShowcaseProps", () => {
    const input: AdaptedContentList = {
      customEntries: [
        {
          title: "Frontend Skills",
          icon: { iconCode: "fa/FaReact" },
          subItems: [
            {
              id: "item1",
              internalName: "JavaScript",
              title: "JavaScript",
              progress: 90,
              icons: [
                {
                  iconCode: "fa/FaJs",
                },
              ],
            },
            { progress: 80, icons: [{ iconCode: "fa/FaCss3" }] },
          ],
        },
      ],
    } as unknown as AdaptedContentList;

    const result = adaptPanelShowcase(input);

    expect(result.panels).toHaveLength(1);
    expect(result.panels[0].title).toBe("Frontend Skills");
    expect(result.panels[0].headingIcon).toEqual({ iconCode: "fa/FaReact" });

    expect(result.panels[0].rows).toHaveLength(2);
    expect(result.panels[0].rows[0].progress).toBe(90);
    expect(result.panels[0].rows[0].icons).toEqual([{ iconCode: "fa/FaJs" }]);
    expect(result.panels[0].rows[0].variant).toBe("linear");
  });
});

describe("adaptPanelShowcaseWithRadialProgress", () => {
  it("adapts ContentList into PanelShowcaseProps with radial rows", () => {
    const input: AdaptedContentList = {
      customEntries: [
        {
          title: "Frontend Skills",
          icon: { iconCode: "fa/FaReact" },
          subItems: [
            {
              id: "item1",
              internalName: "JavaScript",
              title: "JavaScript",
              progress: 90,
              icons: [{ iconCode: "fa/FaJs" }],
            },
          ],
        },
      ],
    } as unknown as AdaptedContentList;

    const result = adaptPanelShowcaseWithRadialProgress(input);

    expect(result.panels[0].rows).toHaveLength(1);
    expect(result.panels[0].rows[0].variant).toBe("radial");
    expect(result.panels[0].rows[0].progress).toBe(90);
  });
});

describe("adaptSkillsMatrix", () => {
  it("adapts ContentList into a table-layout PanelShowcaseProps", () => {
    const input: AdaptedContentList = {
      customEntries: [
        {
          title: "Frontend Skills",
          icon: { iconCode: "fa/FaReact" },
          subItems: [
            {
              id: "item1",
              internalName: "JavaScript",
              title: "JavaScript",
              progress: 90,
              icons: [{ iconCode: "fa/FaJs" }],
            },
          ],
        },
      ],
    } as unknown as AdaptedContentList;

    const result = adaptSkillsMatrix(input);

    expect(result.layout).toBe("table");
    expect(result.panels[0].rows[0].variant).toBe("linear");
    expect(result.panels[0].rows[0].progress).toBe(90);
  });
});
