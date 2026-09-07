import type { Document } from "@contentful/rich-text-types";
import { describe, expect, it } from "vitest";
import type { PageFieldsFragment } from "../generated/contentful-sdk.generated";
import { adaptPage, isAdaptedPage } from "./page";

const emptyDocument: Document = {
  nodeType: "document",
  data: {},
  content: [],
} as Document;

const icon = {
  __typename: "Icon",
  sys: { id: "icon-1" },
  internalName: "Page icon",
  name: "FaHome",
  library: "fa",
  title: "Home",
  color: "",
  iconCode: "fa/FaHome",
  showTooltip: false,
};

const seo = {
  __typename: "SeoMetadata",
  sys: { id: "seo-1" },
  internalName: "Home SEO",
  title: "Home",
  description: "Home page",
  keywords: [],
  siteName: "",
  publisher: "",
  creator: "",
  countryName: "",
  canonicalUrl: "",
  noIndex: false,
  noFollow: false,
  ogImage: null,
  favicon: null,
};

const contentSectionBlock = {
  __typename: "ContentSection",
  sys: { id: "section-1" },
  internalName: "Hero",
  ui: "HeroBanner",
  entry: {
    __typename: "ContentItem",
    sys: { id: "hero-entry-1" },
    entryField: "hero",
    title: "Abbas Shaikh",
    subtitle: "",
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
  },
};

// A ContentList block that relies on structural detection (no __typename on
// the wire) — `isContentList` must still recognize it via its distinctive
// fields (`customEntriesCollection` / `entries`), since Contentful's
// interface-fragment responses don't always surface `__typename` for every
// union member the query didn't explicitly request it on.
const structuralContentListBlock = {
  sys: { id: "list-1" },
  internalName: "Experience",
  ui: "TimelineSection",
  title: "Experience",
  description: null,
  entries: "Job",
  customEntriesCollection: { items: [] },
};

const fullPage = {
  __typename: "Page",
  sys: { id: "page-1" },
  internalName: "Home Page",
  path: "/",
  title: "Home",
  icon,
  description: {
    json: emptyDocument,
    links: { entries: { block: [] }, assets: { block: [] } },
  },
  seo,
  topContentAreaCollection: {
    items: [contentSectionBlock, structuralContentListBlock],
  },
  bottomContentAreaCollection: { items: [] },
} as unknown as PageFieldsFragment;

describe("adaptPage", () => {
  it("returns null for a missing entry", () => {
    expect(adaptPage(null)).toBeNull();
    expect(adaptPage(undefined)).toBeNull();
  });

  it("maps top-level scalar fields and nested icon/seo", () => {
    const result = adaptPage(fullPage);

    expect(result).toMatchObject({
      __typename: "Page",
      id: "page-1",
      internalName: "Home Page",
      path: "/",
      title: "Home",
    });
    expect(result?.icon).toMatchObject({ iconCode: "fa/FaHome" });
    expect(result?.seo).toMatchObject({ title: "Home" });
  });

  it("adapts a ContentSection block identified by __typename", () => {
    const result = adaptPage(fullPage);
    const section = result?.topContentArea.find(
      (block) => block.__typename === "ContentSection"
    );
    expect(section).toMatchObject({ ui: "HeroBanner" });
  });

  it("adapts a ContentList block identified structurally, without a __typename", () => {
    const result = adaptPage(fullPage);
    const list = result?.topContentArea.find(
      (block) => block.__typename === "ContentList"
    );
    expect(list).toMatchObject({ ui: "TimelineSection", category: "Job" });
  });

  it("drops blocks that match neither shape, rather than throwing", () => {
    const result = adaptPage({
      ...fullPage,
      topContentAreaCollection: {
        items: [contentSectionBlock, { sys: { id: "unknown-1" } }],
      },
    } as unknown as PageFieldsFragment);
    expect(result?.topContentArea).toHaveLength(1);
  });

  it("defaults description to null when the rich text field is empty", () => {
    const result = adaptPage({
      ...fullPage,
      description: null,
    } as unknown as PageFieldsFragment);
    expect(result?.description).toBeNull();
  });

  it("defaults topContentArea/bottomContentArea to empty arrays when the collections are missing", () => {
    const result = adaptPage({
      ...fullPage,
      topContentAreaCollection: null,
      bottomContentAreaCollection: null,
    } as unknown as PageFieldsFragment);
    expect(result?.topContentArea).toEqual([]);
    expect(result?.bottomContentArea).toEqual([]);
  });
});

describe("isAdaptedPage", () => {
  it("recognizes a value produced by adaptPage", () => {
    expect(isAdaptedPage(adaptPage(fullPage))).toBe(true);
  });

  it("rejects unrelated values", () => {
    expect(isAdaptedPage(null)).toBe(false);
    expect(isAdaptedPage({ __typename: "Layout" })).toBe(false);
  });
});
