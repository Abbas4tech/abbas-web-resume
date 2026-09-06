import type { Metadata } from "next";
import type { AdaptedPage } from "./page";

/**
 * Builds a Next.js Metadata object from an adapted Page, using every field
 * the SeoMetadata content type exposes (title, description, keywords,
 * siteName, publisher, creator, countryName, canonicalUrl, noIndex, noFollow,
 * ogImage, favicon) to maximize what's crawlable/shareable per page, not just
 * the handful of fields a minimal implementation would use.
 *
 * Kept as a pure function (no fetching, no Next.js request context) so it's
 * unit-testable without mocking the Contentful SDK — `generateMetadata` in
 * `[[...slug]]/page.tsx` just calls this with the already-adapted page data.
 */
export function adaptPageMetadata(pageData: AdaptedPage | null): Metadata {
  if (!pageData) {
    return {};
  }

  const { seo } = pageData;
  const title = seo?.title || pageData.title;
  const description = seo?.description || undefined;
  const keywords = seo?.keywords?.length ? seo.keywords : undefined;
  const canonicalUrl = seo?.canonicalUrl || undefined;
  const faviconUrl = seo?.favicon?.url || undefined;
  const ogImage = seo?.ogImage;
  const noIndex = seo?.noIndex ?? false;
  const noFollow = seo?.noFollow ?? false;

  const ogImages = ogImage?.url
    ? [
        {
          url: ogImage.url,
          width: ogImage.width || undefined,
          height: ogImage.height || undefined,
          alt: ogImage.alternativeText || title,
        },
      ]
    : undefined;

  return {
    title,
    description,
    keywords,
    creator: seo?.creator || undefined,
    publisher: seo?.publisher || undefined,
    authors: seo?.creator ? [{ name: seo.creator }] : undefined,
    icons: faviconUrl ? { icon: faviconUrl } : undefined,
    alternates: canonicalUrl ? { canonical: canonicalUrl } : undefined,
    // Not backed by a CMS field: standard SEO best-practice defaults that
    // let Google show the richest possible search result (large image
    // previews, no length cap on snippets/video previews) whenever the
    // page is indexable at all.
    robots: {
      index: !noIndex,
      follow: !noFollow,
      googleBot: {
        index: !noIndex,
        follow: !noFollow,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      title,
      description,
      url: canonicalUrl,
      siteName: seo?.siteName || undefined,
      images: ogImages,
    },
    twitter: {
      card: ogImages ? "summary_large_image" : "summary",
      title,
      description,
      images: ogImages?.map((image) => ({ url: image.url, alt: image.alt })),
    },
    other: seo?.countryName ? { "geo.placename": seo.countryName } : undefined,
  };
}
