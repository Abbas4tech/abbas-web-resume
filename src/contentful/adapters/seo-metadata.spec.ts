import { describe, expect, it } from "vitest";
import type { SeoMetadataFieldsFragment } from "../generated/contentful-sdk.generated";
import { adaptSeoMetadata } from "./seo-metadata";

const fullSeoMetadata: SeoMetadataFieldsFragment = {
  __typename: "SeoMetadata",
  sys: { id: "seo-1" },
  internalName: "SEO — home",
  title: "Abbas Shaikh | Frontend Developer",
  description: "Frontend Tech Lead portfolio",
  keywords: ["frontend", "react", null, "next.js"],
  siteName: "Abbas CV",
  publisher: "Abbas Shaikh",
  creator: "Abbas Shaikh",
  countryName: "India",
  canonicalUrl: "https://abbas-web-resume.vercel.app/about",
  noIndex: false,
  noFollow: false,
  ogImage: {
    __typename: "Image",
    sys: { id: "img-1" },
    internalName: "OG Image",
    alternativeText: "Abbas Shaikh",
    caption: "",
    image: {
      url: "https://images.ctfassets.net/space/og.png",
      title: "OG",
      description: "",
      width: 1200,
      height: 630,
    },
  },
  favicon: {
    url: "https://images.ctfassets.net/space/favicon.png",
    title: "Favicon",
  },
};

describe("adaptSeoMetadata", () => {
  it("maps every SeoMetadata field, including the ones added for maximum SEO coverage", () => {
    const result = adaptSeoMetadata(fullSeoMetadata);

    expect(result).toMatchObject({
      __typename: "SeoMetadata",
      id: "seo-1",
      title: "Abbas Shaikh | Frontend Developer",
      description: "Frontend Tech Lead portfolio",
      siteName: "Abbas CV",
      publisher: "Abbas Shaikh",
      creator: "Abbas Shaikh",
      countryName: "India",
      canonicalUrl: "https://abbas-web-resume.vercel.app/about",
      noIndex: false,
      noFollow: false,
    });
    // A null keyword must be filtered out, not passed through as null.
    expect(result?.keywords).toEqual(["frontend", "react", "next.js"]);
    expect(result?.ogImage?.url).toBe(
      "https://images.ctfassets.net/space/og.png"
    );
    expect(result?.favicon).toEqual({
      url: "https://images.ctfassets.net/space/favicon.png",
      title: "Favicon",
    });
  });

  it("defaults every new field to a safe empty value when absent", () => {
    const result = adaptSeoMetadata({
      ...fullSeoMetadata,
      siteName: null,
      publisher: null,
      creator: null,
      countryName: null,
      favicon: null,
    });

    expect(result).toMatchObject({
      siteName: "",
      publisher: "",
      creator: "",
      countryName: "",
    });
    expect(result?.favicon).toBeNull();
  });

  it("returns null for a missing entry", () => {
    expect(adaptSeoMetadata(null)).toBeNull();
    expect(adaptSeoMetadata(undefined)).toBeNull();
  });
});
