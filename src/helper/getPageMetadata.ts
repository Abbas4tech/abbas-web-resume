import { Metadata } from "next";
import { fetchGql } from "@/lib/apollo/client";
import { GET_METADATA } from "@/queries/getMetadataQuery";
import { SEO } from "@/types/generic";

export const getPageMetadata = async (id: string): Promise<Metadata> => {
  const {
    page: { pageSeo },
  } = await fetchGql<{ page: { pageSeo: SEO } }>(GET_METADATA, {
    id,
  });

  const images = pageSeo.imagesCollection.items.map((i) => ({
    url: i.url,
    width: i.width,
    height: i.height,
    alt: i.title,
  }));

  return {
    title: pageSeo.title,
    description: pageSeo.description,
    keywords: pageSeo.keywords,
    creator: pageSeo.creator,
    publisher: pageSeo.publisher,
    openGraph: {
      type: "website",
      title: pageSeo.title,
      countryName: pageSeo.countryName,
      images,
      siteName: pageSeo.siteName,
      url: pageSeo.url,
      description: pageSeo.description,
    },
    twitter: {
      title: pageSeo.title,
      description: pageSeo.description,
      images,
      creator: pageSeo.creator,
    },
    icons: {
      icon: pageSeo.favicon.url,
      shortcut: pageSeo.favicon.url,
      apple: pageSeo.favicon.url,
    },
  };
};
