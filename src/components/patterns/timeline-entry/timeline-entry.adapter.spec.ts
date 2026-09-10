import { describe, expect, it } from "vitest";
import type { TimelineEntryMetaRow } from "./timeline-entry";
import { adaptTimelineEntry } from "./timeline-entry.adapter";

/** Every row this adapter produces today is the plain icon+text variant. */
function textOf(row: TimelineEntryMetaRow): string {
  return row.type === "badges" ? "" : row.text;
}

describe("adaptTimelineEntry", () => {
  const baseInput = {
    company: "Acme Corp",
    position: "Senior Engineer",
    location: "San Francisco, CA",
    startDate: "2021-05-01T00:00:00Z",
    endDate: "2023-08-01T00:00:00Z",
    workedRemotely: false,
    currentlyWorking: false,
    companyIcon: { iconCode: "fa/FaBuilding" },
    locationIcon: { iconCode: "fa/FaMapMarker" },
    durationIcon: { iconCode: "fa/FaCalendar" },
    roleIcon: { iconCode: "fa/FaUser" },
    techStackIcon: { iconCode: "fa/FaCode" },
    techStack: {
      skillIconsCollection: {
        items: [{ name: "React" }, { name: "TypeScript" }, { name: "Node.js" }],
      },
    },
    body: "Did a lot of coding.",
  };

  it("adapts standard entry with end date", () => {
    const result = adaptTimelineEntry(baseInput);

    expect(result.title).toBe("Acme Corp");
    expect(result.indicatorIcon).toEqual({ iconCode: "fa/FaBuilding" });

    // Check meta rows
    expect(result.metaRows).toHaveLength(4);

    // Location
    expect(textOf(result.metaRows[0])).toBe("San Francisco, CA");

    // Duration
    expect(textOf(result.metaRows[1])).toBe("May 2021 - August 2023");

    // Role
    expect(textOf(result.metaRows[2])).toBe("Senior Engineer");

    // Tech Stack
    expect(textOf(result.metaRows[3])).toBe("React, TypeScript, Node.js");
  });

  it("handles currently working state", () => {
    const input = {
      ...baseInput,
      currentlyWorking: true,
      startDate: "2022-01-01T00:00:00Z",
    };

    const result = adaptTimelineEntry(input);
    expect(textOf(result.metaRows[1])).toBe("January 2022 - Present");
  });

  it("appends ' - Remote' to location when workedRemotely is true", () => {
    const input = {
      ...baseInput,
      workedRemotely: true,
    };

    const result = adaptTimelineEntry(input);
    expect(textOf(result.metaRows[0])).toBe("San Francisco, CA - Remote");
  });
});
