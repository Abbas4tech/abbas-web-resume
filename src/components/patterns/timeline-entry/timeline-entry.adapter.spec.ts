import { describe, expect, it } from "vitest";
import { adaptTimelineEntry } from "./timeline-entry.adapter";

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
    expect(result.metaRows[0].text).toBe("San Francisco, CA");

    // Duration
    expect(result.metaRows[1].text).toBe("May 2021 - August 2023");

    // Role
    expect(result.metaRows[2].text).toBe("Senior Engineer");

    // Tech Stack
    expect(result.metaRows[3].text).toBe("React, TypeScript, Node.js");
  });

  it("handles currently working state", () => {
    const input = {
      ...baseInput,
      currentlyWorking: true,
      startDate: "2022-01-01T00:00:00Z",
    };

    const result = adaptTimelineEntry(input);
    expect(result.metaRows[1].text).toBe("January 2022 - Present");
  });

  it("appends ' - Remote' to location when workedRemotely is true", () => {
    const input = {
      ...baseInput,
      workedRemotely: true,
    };

    const result = adaptTimelineEntry(input);
    expect(result.metaRows[0].text).toBe("San Francisco, CA - Remote");
  });
});
