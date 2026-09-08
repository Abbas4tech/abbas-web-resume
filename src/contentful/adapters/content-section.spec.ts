import { describe, expect, it } from "vitest";
import type { ContentSectionFieldsFragment } from "../generated/contentful-sdk.generated";
import {
  adaptContentSection,
  isAdaptedContentSection,
} from "./content-section";

const contentItemEntry = {
  __typename: "ContentItem",
  sys: { id: "hero-1" },
  entryField: "hero",
  title: "Abbas Shaikh",
  subtitle: "Frontend Engineer",
  description: "",
  body: null,
  startDate: null,
  endDate: null,
  image: null,
  coverImage: null,
  icon: null,
  linksCollection: null,
  subItemsCollection: null,
  tags: [],
};

const statItemEntry = {
  __typename: "StatItem",
  sys: { id: "stat-1" },
  internalName: "React",
  title: "React",
  progress: 90,
  iconsCollection: null,
};

const fullContentSection = {
  __typename: "ContentSection",
  sys: { id: "section-1" },
  internalName: "Hero section",
  ui: "HeroBanner",
  entry: contentItemEntry,
} as unknown as ContentSectionFieldsFragment;

describe("adaptContentSection", () => {
  it("returns null for a missing entry", () => {
    expect(adaptContentSection(null)).toBeNull();
    expect(adaptContentSection(undefined)).toBeNull();
  });

  it("returns null when there is no linked entry", () => {
    const result = adaptContentSection({
      ...fullContentSection,
      entry: null,
    } as unknown as ContentSectionFieldsFragment);
    expect(result).toBeNull();
  });

  it("returns null when the linked entry fails to adapt", () => {
    const result = adaptContentSection({
      ...fullContentSection,
      entry: { __typename: "SomethingElse" },
    } as unknown as ContentSectionFieldsFragment);
    expect(result).toBeNull();
  });

  it("maps a ContentItem entry", () => {
    const result = adaptContentSection(fullContentSection);
    expect(result).toMatchObject({
      __typename: "ContentSection",
      id: "section-1",
      internalName: "Hero section",
      ui: "HeroBanner",
    });
    expect(result?.entry).toMatchObject({
      __typename: "ContentItem",
      id: "hero-1",
    });
  });

  it("maps a StatItem entry", () => {
    const result = adaptContentSection({
      ...fullContentSection,
      entry: statItemEntry,
    } as unknown as ContentSectionFieldsFragment);
    expect(result?.entry).toMatchObject({
      __typename: "StatItem",
      id: "stat-1",
    });
  });

  it("defaults ui to 'HeroBanner' when the CMS field is empty", () => {
    const result = adaptContentSection({
      ...fullContentSection,
      ui: null,
    } as unknown as ContentSectionFieldsFragment);
    expect(result?.ui).toBe("HeroBanner");
  });
});

describe("isAdaptedContentSection", () => {
  it("recognizes a value produced by adaptContentSection", () => {
    expect(
      isAdaptedContentSection(adaptContentSection(fullContentSection))
    ).toBe(true);
  });

  it("rejects unrelated values", () => {
    expect(isAdaptedContentSection(null)).toBe(false);
    expect(isAdaptedContentSection({ __typename: "ContentList" })).toBe(false);
  });
});
