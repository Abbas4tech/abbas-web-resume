import { describe, expect, it } from "vitest";
import type { AdaptedContentSection } from "@/contentful/adapters/content-section";
import { adaptAvailabilityBanner } from "./availability-banner.adapter";

describe("adaptAvailabilityBanner", () => {
  it("adapts the entry's description, tag-derived status color, and days until startDate", () => {
    const startDate = new Date(Date.now() + 10 * 24 * 60 * 60 * 1000);
    const input: AdaptedContentSection = {
      __typename: "ContentSection",
      id: "section-1",
      internalName: "Availability",
      ui: "AvailabilityBanner",
      entry: {
        __typename: "ContentItem",
        title: "Fallback title",
        description: "Available from Q1 next year.",
        tags: ["warning"],
        startDate,
      },
    } as unknown as AdaptedContentSection;

    const result = adaptAvailabilityBanner(input);

    expect(result.message).toBe("Available from Q1 next year.");
    expect(result.statusColor).toBe("warning");
    expect(result.daysUntil).toBe(10);
  });

  it("falls back to the entry title and 'success' color, with no countdown, when tags/startDate are missing", () => {
    const input: AdaptedContentSection = {
      __typename: "ContentSection",
      id: "section-2",
      internalName: "Availability",
      ui: "AvailabilityBanner",
      entry: {
        __typename: "ContentItem",
        title: "Open to new roles",
      },
    } as unknown as AdaptedContentSection;

    const result = adaptAvailabilityBanner(input);

    expect(result.message).toBe("Open to new roles");
    expect(result.statusColor).toBe("success");
    expect(result.daysUntil).toBeUndefined();
  });

  it("omits the countdown once startDate has already passed", () => {
    const input: AdaptedContentSection = {
      __typename: "ContentSection",
      id: "section-3",
      internalName: "Availability",
      ui: "AvailabilityBanner",
      entry: {
        __typename: "ContentItem",
        title: "Already available",
        startDate: new Date(Date.now() - 1000),
      },
    } as unknown as AdaptedContentSection;

    expect(adaptAvailabilityBanner(input).daysUntil).toBeUndefined();
  });
});
