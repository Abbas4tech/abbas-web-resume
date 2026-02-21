import { Metadata } from "next";

import { SeoDataFragment } from "@/gql/sdk";
import {
  assetAdapter,
  AdaptedAsset,
} from "@/components/contentful/asset/asset.adapter";

export interface SeoDataInput {
  title?: string | null;
  description?: string | null;
  keywords?: (string | null)[] | null;
  url?: string | null;
  siteName?: string | null;
  creator?: string | null;
  publisher?: string | null;
  countryName?: string | null;
  imagesCollection?: {
    items?: Array<AdaptedAsset | null> | null;
  } | null;
  favicon?: AdaptedAsset | null;
}

/**
 * Generates Next.js Metadata from Contentful SEO data
 * @param seoData - SEO data from Contentful
 * @param defaultSiteName - Default site name if not provided in seoData
 * @returns Next.js Metadata object
 */
export const generateMetadataFromSeo = (
  seoData?: SeoDataInput | null,
  defaultSiteName = "Abbas - Web Developer & Designer",
): Metadata => {
  if (!seoData) {
    return {
      title: defaultSiteName,
      description: "Abbas - Web Developer & Designer",
    };
  }

  const title = seoData.title || defaultSiteName;
  const description =
    seoData.description ||
    "Explore my portfolio and experience in web development and design";
  const keywordsArray =
    seoData.keywords
      ?.filter((k): k is NonNullable<typeof k> => !!k)
      .map((k) => k.trim()) ?? [];
  const url = seoData.url;
  const siteName = seoData.siteName || defaultSiteName;

  // Get image for og:image
  const ogImage = seoData.imagesCollection?.items?.[0];

  // Get favicon
  const favicon = seoData.favicon?.url;

  return {
    title,
    description,
    keywords: keywordsArray.length > 0 ? keywordsArray : undefined,
    authors: seoData.creator
      ? [{ name: seoData.creator }]
      : [{ name: "Abbas" }],
    publisher: seoData.publisher || defaultSiteName,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: url ? { canonical: url } : undefined,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: url || "https://abbas-web-resume.vercel.app",
      siteName,
      title,
      description,
      ...(ogImage && {
        images: [
          {
            url: ogImage.url,
            width: ogImage.width,
            height: ogImage.height,
            alt: ogImage.title || title,
          },
        ],
      }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ogImage && {
        images: [ogImage.url],
      }),
    },
    ...(favicon && { icons: { icon: favicon } }),
  };
};

/**
 * Generates metadata for a page using Contentful SEO data
 * @param pageSeo - SEO data fragment from Contentful page query
 * @param pageTitle - Override title if needed
 * @param defaultSiteName - Default site name
 * @returns Next.js Metadata object
 */
export const generatePageMetadata = (
  pageSeo?: SeoDataFragment | null,
  defaultSiteName?: string,
): Metadata => {
  if (!pageSeo) {
    console.error("No SEO data found for page, using defaults");
    return generateMetadataFromSeo(undefined, defaultSiteName);
  }

  const seoInput: SeoDataInput = {
    title: pageSeo.title,
    description: pageSeo.description,
    keywords: pageSeo.keywords,
    url: pageSeo.url,
    siteName: pageSeo.siteName,
    creator: pageSeo.creator,
    publisher: pageSeo.publisher,
    countryName: pageSeo.countryName,
    imagesCollection: pageSeo.imagesCollection
      ? {
          items:
            pageSeo.imagesCollection.items
              ?.filter((item): item is NonNullable<typeof item> => !!item)
              .map((item) => assetAdapter(item)) ?? [],
        }
      : undefined,
    favicon: pageSeo.favicon ? assetAdapter(pageSeo.favicon) : undefined,
  };

  return generateMetadataFromSeo(seoInput, defaultSiteName);
};
