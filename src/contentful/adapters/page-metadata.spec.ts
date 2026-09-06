import type { Document } from "@contentful/rich-text-types";
import { describe, expect, it } from "vitest";
import type { AdaptedPage } from "./page";
import { adaptPageMetadata } from "./page-metadata";

const emptyDocument: Document = {
  nodeType: "document",
  data: {},
  content: [],
} as Document;

function buildPage(overrides: Partial<AdaptedPage> = {}): AdaptedPage {
  return {
    __typename: "Page",
    id: "page-1",
    internalName: "Home Page",
    title: "Abbas Shaikh",
    path: "/about",
    icon: undefined,
    description: emptyDocument,
    seo: null,
    topContentArea: [],
    bottomContentArea: [],
    ...overrides,
  };
}

const fullSeo: NonNullable<AdaptedPage["seo"]> = {
  __typename: "SeoMetadata",
  id: "seo-1",
  internalName: "SEO — home",
  title: "Abbas Shaikh | Frontend Developer",
  description: "Frontend Tech Lead portfolio",
  keywords: ["frontend", "react", "next.js"],
  siteName: "Abbas CV",
  publisher: "Abbas Shaikh",
  creator: "Abbas Shaikh",
  countryName: "India",
  canonicalUrl: "https://abbas-web-resume.vercel.app/about",
  noIndex: false,
  noFollow: false,
  ogImage: {
    __typename: "Image",
    id: "img-1",
    internalName: "OG Image",
    alternativeText: "Abbas Shaikh",
    caption: "",
    url: "https://images.ctfassets.net/space/og.png",
    title: "OG",
    description: "",
    width: 1200,
    height: 630,
  },
  favicon: {
    url: "https://images.ctfassets.net/space/favicon.png",
    title: "Favicon",
  },
};

describe("adaptPageMetadata", () => {
  it("returns empty metadata for a missing page (404)", () => {
    expect(adaptPageMetadata(null)).toEqual({});
  });

  it("falls back to the page title when there is no SEO entry at all", () => {
    const result = adaptPageMetadata(buildPage({ seo: null }));
    expect(result.title).toBe("Abbas Shaikh");
    expect(result.description).toBeUndefined();
    expect(result.icons).toBeUndefined();
    expect(result.alternates).toBeUndefined();
  });

  it("defaults robots to fully indexable/followable when there is no SEO entry", () => {
    // Absence of SEO data must never silently deindex a page.
    const result = adaptPageMetadata(buildPage({ seo: null }));
    expect(result.robots).toMatchObject({
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    });
  });

  it("uses every SeoMetadata field when fully populated, for maximum crawlability", () => {
    const result = adaptPageMetadata(buildPage({ seo: fullSeo }));

    expect(result.title).toBe("Abbas Shaikh | Frontend Developer");
    expect(result.description).toBe("Frontend Tech Lead portfolio");
    expect(result.keywords).toEqual(["frontend", "react", "next.js"]);
    expect(result.creator).toBe("Abbas Shaikh");
    expect(result.publisher).toBe("Abbas Shaikh");
    expect(result.authors).toEqual([{ name: "Abbas Shaikh" }]);
    expect(result.icons).toEqual({
      icon: "https://images.ctfassets.net/space/favicon.png",
    });
    expect(result.alternates).toEqual({
      canonical: "https://abbas-web-resume.vercel.app/about",
    });
    expect(result.other).toEqual({ "geo.placename": "India" });

    expect(result.openGraph).toMatchObject({
      type: "website",
      title: "Abbas Shaikh | Frontend Developer",
      description: "Frontend Tech Lead portfolio",
      url: "https://abbas-web-resume.vercel.app/about",
      siteName: "Abbas CV",
    });
    expect(result.openGraph?.images).toEqual([
      {
        url: "https://images.ctfassets.net/space/og.png",
        width: 1200,
        height: 630,
        alt: "Abbas Shaikh",
      },
    ]);

    expect(result.twitter).toMatchObject({
      card: "summary_large_image",
      title: "Abbas Shaikh | Frontend Developer",
      description: "Frontend Tech Lead portfolio",
    });
    expect(result.twitter?.images).toEqual([
      { url: "https://images.ctfassets.net/space/og.png", alt: "Abbas Shaikh" },
    ]);
  });

  it("respects noIndex/noFollow when set, including for Googlebot specifically", () => {
    const result = adaptPageMetadata(
      buildPage({ seo: { ...fullSeo, noIndex: true, noFollow: true } })
    );
    expect(result.robots).toMatchObject({
      index: false,
      follow: false,
      googleBot: { index: false, follow: false },
    });
  });

  it("falls back to a plain summary Twitter card when there is no OG image", () => {
    const result = adaptPageMetadata(
      buildPage({ seo: { ...fullSeo, ogImage: null } })
    );
    expect(result.twitter).toMatchObject({ card: "summary" });
    expect(result.twitter?.images).toBeUndefined();
    expect(result.openGraph?.images).toBeUndefined();
  });

  it("omits geo.placename when countryName isn't set", () => {
    const result = adaptPageMetadata(
      buildPage({ seo: { ...fullSeo, countryName: "" } })
    );
    expect(result.other).toBeUndefined();
  });

  it("omits keywords entirely rather than emitting an empty list", () => {
    const result = adaptPageMetadata(
      buildPage({ seo: { ...fullSeo, keywords: [] } })
    );
    expect(result.keywords).toBeUndefined();
  });
});
