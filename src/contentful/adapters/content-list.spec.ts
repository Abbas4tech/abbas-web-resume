import type { Document } from "@contentful/rich-text-types";
import { describe, expect, it } from "vitest";
import type { ContentListFieldsFragment } from "../generated/contentful-sdk.generated";
import { adaptContentList, isAdaptedContentList } from "./content-list";

const emptyDocument: Document = {
  nodeType: "document",
  data: {},
  content: [],
} as Document;

const contentItem = {
  __typename: "ContentItem",
  sys: { id: "job-1" },
  entryField: "experience",
  title: "Senior Frontend Engineer",
  subtitle: "Acme Corp",
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

const fullContentList = {
  __typename: "ContentList",
  sys: { id: "list-1" },
  internalName: "Experience timeline",
  ui: "TimelineSection",
  title: "Experience",
  description: { json: emptyDocument },
  entries: "Job",
  customEntriesCollection: { items: [contentItem] },
} as unknown as ContentListFieldsFragment;

describe("adaptContentList", () => {
  it("returns null for a missing entry", () => {
    expect(adaptContentList(null)).toBeNull();
    expect(adaptContentList(undefined)).toBeNull();
  });

  it("maps every field for a fully populated entry", () => {
    const result = adaptContentList(fullContentList);

    expect(result).toMatchObject({
      __typename: "ContentList",
      id: "list-1",
      internalName: "Experience timeline",
      ui: "TimelineSection",
      title: "Experience",
      category: "Job",
    });
    expect(result?.customEntries).toHaveLength(1);
    expect(result?.customEntries[0]).toMatchObject({ id: "job-1" });
  });

  it("defaults ui to 'Grid' when the CMS field is empty", () => {
    const result = adaptContentList({
      ...fullContentList,
      ui: null,
    } as unknown as ContentListFieldsFragment);
    expect(result?.ui).toBe("Grid");
  });

  it("defaults category to 'Custom' when the entries field is empty", () => {
    const result = adaptContentList({
      ...fullContentList,
      entries: null,
    } as unknown as ContentListFieldsFragment);
    expect(result?.category).toBe("Custom");
  });

  it("defaults customEntries to an empty array when the collection is missing", () => {
    const result = adaptContentList({
      ...fullContentList,
      customEntriesCollection: null,
    } as unknown as ContentListFieldsFragment);
    expect(result?.customEntries).toEqual([]);
  });

  it("filters out entries that fail to adapt (e.g. an unrecognized __typename)", () => {
    const result = adaptContentList({
      ...fullContentList,
      customEntriesCollection: {
        items: [contentItem, { __typename: "SomethingElse" }],
      },
    } as unknown as ContentListFieldsFragment);
    expect(result?.customEntries).toHaveLength(1);
  });
});

describe("isAdaptedContentList", () => {
  it("recognizes a value produced by adaptContentList", () => {
    expect(isAdaptedContentList(adaptContentList(fullContentList))).toBe(true);
  });

  it("rejects unrelated values", () => {
    expect(isAdaptedContentList(null)).toBe(false);
    expect(isAdaptedContentList({ __typename: "ContentSection" })).toBe(false);
  });
});
