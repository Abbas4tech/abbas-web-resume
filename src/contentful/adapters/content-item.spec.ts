import type { Document } from "@contentful/rich-text-types";
import { describe, expect, it } from "vitest";
import type {
  ContentItemFieldsFragment,
  StatItemFieldsFragment,
} from "../generated/contentful-sdk.generated";
import {
  adaptContentItem,
  adaptEntry,
  isAdaptedContentItem,
} from "./content-item";

const emptyDocument: Document = {
  nodeType: "document",
  data: {},
  content: [],
} as Document;

const icon = {
  __typename: "Icon",
  sys: { id: "icon-1" },
  internalName: "React icon",
  name: "FaReact",
  library: "fa",
  title: "React",
  color: "",
  iconCode: "fa/FaReact",
  showTooltip: false,
};

const image = {
  __typename: "Image",
  sys: { id: "img-1" },
  internalName: "Cover Image",
  alternativeText: "Cover",
  caption: "",
  image: {
    url: "/cover.jpg",
    title: "Cover",
    description: "",
    width: 800,
    height: 600,
  },
};

const link = {
  __typename: "Link",
  sys: { id: "link-1" },
  internalName: "GitHub",
  text: "GitHub",
  url: "https://github.com/abbas4tech",
  page: null,
  icon,
};

const fullContentItem = {
  __typename: "ContentItem",
  sys: { id: "job-1" },
  entryField: "experience",
  title: "Senior Frontend Engineer",
  subtitle: "Acme Corp",
  description: "Led the platform rewrite.",
  body: {
    json: emptyDocument,
    links: { entries: { block: [] }, assets: { block: [] } },
  },
  startDate: "2022-01-01",
  endDate: "2024-06-01",
  image,
  coverImage: image,
  icon,
  linksCollection: { items: [link] },
  subItemsCollection: { items: [] as StatItemFieldsFragment[] },
  tags: ["react", null, "typescript"],
} as unknown as ContentItemFieldsFragment;

describe("adaptContentItem", () => {
  it("returns null when the entry is not actually a ContentItem", () => {
    expect(
      adaptContentItem({
        __typename: "StatItem",
      } as unknown as ContentItemFieldsFragment)
    ).toBeNull();
    expect(adaptContentItem(null)).toBeNull();
    expect(adaptContentItem(undefined)).toBeNull();
  });

  it("maps every scalar and nested field for a fully populated entry", () => {
    const result = adaptContentItem(fullContentItem);

    expect(result).toMatchObject({
      __typename: "ContentItem",
      id: "job-1",
      entryField: "experience",
      title: "Senior Frontend Engineer",
      subtitle: "Acme Corp",
      description: "Led the platform rewrite.",
    });
    expect(result?.image).toMatchObject({ url: "/cover.jpg" });
    expect(result?.coverImage).toMatchObject({ url: "/cover.jpg" });
    expect(result?.icon).toMatchObject({ iconCode: "fa/FaReact" });
    expect(result?.links).toHaveLength(1);
    expect(result?.links[0]).toMatchObject({
      href: "https://github.com/abbas4tech",
    });
  });

  it("parses startDate/endDate into real Date objects", () => {
    const result = adaptContentItem(fullContentItem);
    expect(result?.startDate).toBeInstanceOf(Date);
    expect(result?.endDate).toBeInstanceOf(Date);
    expect(result?.startDate?.getUTCFullYear()).toBe(2022);
  });

  it("leaves startDate/endDate null when absent, rather than an Invalid Date", () => {
    const result = adaptContentItem({
      ...fullContentItem,
      startDate: null,
      endDate: null,
    } as unknown as ContentItemFieldsFragment);
    expect(result?.startDate).toBeNull();
    expect(result?.endDate).toBeNull();
  });

  it("filters out null tags rather than passing them through", () => {
    const result = adaptContentItem(fullContentItem);
    expect(result?.tags).toEqual(["react", "typescript"]);
  });

  it("defaults body to null when the rich text field is empty", () => {
    const result = adaptContentItem({
      ...fullContentItem,
      body: null,
    } as unknown as ContentItemFieldsFragment);
    expect(result?.body).toBeNull();
  });

  it("filters out subItems that fail to adapt", () => {
    const result = adaptContentItem({
      ...fullContentItem,
      subItemsCollection: {
        items: [
          null,
          {
            __typename: "StatItem",
            sys: { id: "s1" },
            internalName: "",
            title: "React",
            progress: 80,
            iconsCollection: null,
          },
        ],
      },
    } as unknown as ContentItemFieldsFragment);
    expect(result?.subItems).toHaveLength(1);
    expect(result?.subItems[0]).toMatchObject({ id: "s1" });
  });

  it("defaults links and subItems to empty arrays when the collections are missing", () => {
    const result = adaptContentItem({
      ...fullContentItem,
      linksCollection: null,
      subItemsCollection: null,
    } as unknown as ContentItemFieldsFragment);
    expect(result?.links).toEqual([]);
    expect(result?.subItems).toEqual([]);
  });
});

describe("adaptEntry", () => {
  it("returns null for a missing entry", () => {
    expect(adaptEntry(null)).toBeNull();
    expect(adaptEntry(undefined)).toBeNull();
  });

  it("dispatches a ContentItem entry to adaptContentItem", () => {
    const result = adaptEntry(fullContentItem);
    expect(result).toMatchObject({ __typename: "ContentItem", id: "job-1" });
  });

  it("dispatches a StatItem entry to adaptStatItem", () => {
    const statItem = {
      __typename: "StatItem",
      sys: { id: "stat-1" },
      internalName: "React",
      title: "React",
      progress: 80,
      iconsCollection: null,
    } as unknown as StatItemFieldsFragment;

    const result = adaptEntry(statItem);
    expect(result).toMatchObject({ __typename: "StatItem", id: "stat-1" });
  });

  it("returns null for an unrecognized __typename", () => {
    const result = adaptEntry({
      __typename: "SomethingElse",
    } as unknown as ContentItemFieldsFragment);
    expect(result).toBeNull();
  });
});

describe("isAdaptedContentItem", () => {
  it("recognizes a value produced by adaptContentItem", () => {
    expect(isAdaptedContentItem(adaptContentItem(fullContentItem))).toBe(true);
  });

  it("rejects unrelated values", () => {
    expect(isAdaptedContentItem(null)).toBe(false);
    expect(isAdaptedContentItem({ __typename: "StatItem" })).toBe(false);
  });
});
