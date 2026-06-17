import { BLOCKS } from "@contentful/rich-text-types";
import { describe, expect, it } from "vitest";
import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import { adaptTimelineSection } from "./timeline-section.adapter";

describe("adaptTimelineSection", () => {
  it("adapts ContentList into TimelineSectionProps", () => {
    const input: AdaptedContentList = {
      customEntries: [
        {
          title: "Job Title",
          startDate: new Date("2020-01-01T00:00:00Z"),
          endDate: new Date("2021-01-01T00:00:00Z"),
          subtitle: "Company",
          icon: { iconCode: "fa/FaBriefcase" },
          body: {
            nodeType: BLOCKS.DOCUMENT,
            data: {},
            content: [],
          },
        },
      ],
    } as unknown as AdaptedContentList;

    const result = adaptTimelineSection(input);

    expect(result.animation).toBeUndefined();
    expect(result.entries).toHaveLength(1);

    const entry = result.entries[0];
    expect(entry.title).toBe("Job Title");
    expect(entry.indicatorIcon).toEqual({ iconCode: "fa/FaBriefcase" });
    expect(entry.description.document.nodeType).toBe(BLOCKS.DOCUMENT);

    // Meta rows: one for dates, one for subtitle
    expect(entry.metaRows).toHaveLength(2);
    expect(entry.metaRows[0]).toEqual({
      icon: { iconCode: "md/MdDateRange", name: "Duration", size: "18" },
      text: "January 2020 - January 2021",
    });
    expect(entry.metaRows[1]).toEqual({
      icon: { iconCode: "io5/IoPerson", name: "Role", size: "18" },
      text: "Company",
    });
  });

  it("handles missing dates gracefully", () => {
    const input: AdaptedContentList = {
      customEntries: [
        {
          title: "Current Job",
          startDate: new Date("2022-01-01T00:00:00Z"),
        },
      ],
    } as unknown as AdaptedContentList;

    const result = adaptTimelineSection(input);
    const metaRows = result.entries[0].metaRows;

    expect(metaRows).toHaveLength(1);
    expect(metaRows[0].text).toBe("January 2022 - Present");
  });
});
