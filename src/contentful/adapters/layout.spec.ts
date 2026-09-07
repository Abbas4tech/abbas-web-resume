import { describe, expect, it } from "vitest";
import type { LayoutFieldsFragment } from "../generated/contentful-sdk.generated";
import { adaptLayout, isAdaptedLayout } from "./layout";

const icon = {
  __typename: "Icon",
  sys: { id: "icon-1" },
  internalName: "Resume icon",
  name: "FaFileAlt",
  library: "fa",
  title: "Resume",
  color: "",
  iconCode: "fa/FaFileAlt",
  showTooltip: false,
};

const image = {
  __typename: "Image",
  sys: { id: "logo-1" },
  internalName: "Site Logo",
  alternativeText: "Logo",
  caption: "",
  image: {
    url: "/logo.png",
    title: "Logo",
    description: "",
    width: 100,
    height: 100,
  },
};

const seo = {
  __typename: "SeoMetadata",
  sys: { id: "seo-1" },
  internalName: "Global SEO",
  title: "Abbas Shaikh",
  description: "Portfolio",
  keywords: [],
  siteName: "Abbas CV",
  publisher: "",
  creator: "",
  countryName: "",
  canonicalUrl: "",
  noIndex: false,
  noFollow: false,
  ogImage: null,
  favicon: null,
};

const navLink = {
  __typename: "Link",
  sys: { id: "nav-1" },
  internalName: "Home",
  text: "Home",
  url: "/",
  page: null,
  icon,
};

const fullLayout = {
  __typename: "Layout",
  sys: { id: "layout-1" },
  internalName: "Default Layout",
  title: "Abbas Web Resume",
  role: "Software Engineer",
  resume: { url: "/resume.pdf", title: "Download Resume" },
  globalSeo: seo,
  defaultTheme: "light",
  themeList: ["light", "dark", null],
  siteLogo: image,
  email: "abbas@example.com",
  footerText: "© 2026 Abbas",
  resumeIcon: icon,
  themeIcon: icon,
  drawerVariant: "permanent",
  drawerSide: "left",
  navigationLinksCollection: { items: [navLink] },
} as unknown as LayoutFieldsFragment;

describe("adaptLayout", () => {
  it("returns null for a missing entry", () => {
    expect(adaptLayout(null)).toBeNull();
    expect(adaptLayout(undefined)).toBeNull();
  });

  it("maps every field for a fully populated entry", () => {
    const result = adaptLayout(fullLayout);

    expect(result).toMatchObject({
      __typename: "Layout",
      id: "layout-1",
      title: "Abbas Web Resume",
      role: "Software Engineer",
      defaultTheme: "light",
      email: "abbas@example.com",
      footerText: "© 2026 Abbas",
      drawerVariant: "permanent",
      drawerSide: "left",
    });
    expect(result?.resume).toEqual({
      url: "/resume.pdf",
      title: "Download Resume",
    });
    expect(result?.globalSeo).toMatchObject({ title: "Abbas Shaikh" });
    expect(result?.siteLogo).toMatchObject({ url: "/logo.png" });
    expect(result?.resumeIcon).toMatchObject({ iconCode: "fa/FaFileAlt" });
    expect(result?.themeIcon).toMatchObject({ iconCode: "fa/FaFileAlt" });
    expect(result?.navigationLinks).toHaveLength(1);
    expect(result?.navigationLinks[0]).toMatchObject({ href: "/" });
  });

  it("returns a null resume when the CMS field is empty", () => {
    const result = adaptLayout({
      ...fullLayout,
      resume: null,
    } as unknown as LayoutFieldsFragment);
    expect(result?.resume).toBeNull();
  });

  it("filters out non-string theme list entries", () => {
    const result = adaptLayout(fullLayout);
    expect(result?.themeList).toEqual(["light", "dark"]);
  });

  it("defaults themeList to an empty array when the field is missing", () => {
    const result = adaptLayout({
      ...fullLayout,
      themeList: null,
    } as unknown as LayoutFieldsFragment);
    expect(result?.themeList).toEqual([]);
  });

  it("defaults navigationLinks to an empty array when the collection is missing", () => {
    const result = adaptLayout({
      ...fullLayout,
      navigationLinksCollection: null,
    } as unknown as LayoutFieldsFragment);
    expect(result?.navigationLinks).toEqual([]);
  });
});

it("defaults every optional text field to an empty string when the CMS leaves it blank", () => {
  const result = adaptLayout({
    ...fullLayout,
    internalName: null,
    title: null,
    role: null,
    defaultTheme: null,
    email: null,
    footerText: null,
    drawerVariant: null,
    drawerSide: null,
  } as unknown as LayoutFieldsFragment);

  expect(result).toMatchObject({
    internalName: "",
    title: "",
    role: "",
    defaultTheme: "",
    email: "",
    footerText: "",
    drawerVariant: "",
    drawerSide: "",
  });
});

describe("isAdaptedLayout", () => {
  it("recognizes a value produced by adaptLayout", () => {
    expect(isAdaptedLayout(adaptLayout(fullLayout))).toBe(true);
  });

  it("rejects unrelated values", () => {
    expect(isAdaptedLayout(null)).toBe(false);
    expect(isAdaptedLayout({ __typename: "Page" })).toBe(false);
  });
});
