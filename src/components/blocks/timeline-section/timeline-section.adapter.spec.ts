import { BLOCKS } from "@contentful/rich-text-types";
import { describe, expect, it } from "vitest";
import type { AdaptedContentList } from "@/contentful/adapters/content-list";
import {
  adaptTimelineSection,
  adaptTimelineSectionWithBadges,
} from "./timeline-section.adapter";

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
    expect(metaRows[0]).toMatchObject({ text: "January 2022 - Present" });
  });

  it("renders subItems as a comma-joined text row, not badges", () => {
    const input: AdaptedContentList = {
      customEntries: [
        {
          title: "Job Title",
          subItems: [
            { title: "React", icons: [{ iconCode: "si/SiReact" }] },
            { title: "TypeScript", icons: [{ iconCode: "si/SiTypescript" }] },
          ],
        },
      ],
    } as unknown as AdaptedContentList;

    const result = adaptTimelineSection(input);
    const metaRows = result.entries[0].metaRows;

    expect(metaRows.some((row) => row.type === "badges")).toBe(false);
    expect(metaRows).toContainEqual({
      icon: { iconCode: "fa/FaStackOverflow", name: "Tech Stack", size: "18" },
      text: "React, TypeScript",
    });
  });

  it("renders no tech-stack row when subItems is empty", () => {
    const input: AdaptedContentList = {
      customEntries: [{ title: "Job Title" }],
    } as unknown as AdaptedContentList;

    const result = adaptTimelineSection(input);

    expect(result.entries[0].metaRows).toHaveLength(0);
  });
});

describe("adaptTimelineSectionWithBadges", () => {
  it("renders the same subItems as a badges meta row instead of text", () => {
    const input: AdaptedContentList = {
      customEntries: [
        {
          title: "Job Title",
          subItems: [
            { title: "React", icons: [{ iconCode: "si/SiReact" }] },
            { title: "TypeScript", icons: [{ iconCode: "si/SiTypescript" }] },
          ],
        },
      ],
    } as unknown as AdaptedContentList;

    const result = adaptTimelineSectionWithBadges(input);
    const badgesRow = result.entries[0].metaRows.find(
      (row) => row.type === "badges"
    );

    expect(badgesRow).toEqual({
      type: "badges",
      items: [
        { label: "React", icon: { iconCode: "si/SiReact" } },
        { label: "TypeScript", icon: { iconCode: "si/SiTypescript" } },
      ],
    });
  });

  it("renders no tech-stack row when subItems is empty", () => {
    const input: AdaptedContentList = {
      customEntries: [{ title: "Job Title" }],
    } as unknown as AdaptedContentList;

    const result = adaptTimelineSectionWithBadges(input);

    expect(result.entries[0].metaRows).toHaveLength(0);
  });
});
