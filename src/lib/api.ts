import { EntrySkeletonType, createClient } from "contentful";
import { convertEntry } from "@/lib/helper";
import { Metadata } from "next";
import { Pages } from "./contentful";

const client = createClient({
  accessToken: process.env.CONTENTFUL_API_KEY!,
  space: process.env.CONTENTFUL_SPACE_ID!,
  environment: process.env.CONTENTFUL_ENVIRONMENT_ID!,
});

export const fetchQuery = async <T extends EntrySkeletonType>(
  id: string
): Promise<T> => convertEntry(await client.getEntry<T>(id, { include: 10 }));

export const fetchPageMetadata = async <T extends Pages>(
  contentfulKey: string
): Promise<Metadata> => {
  try {
    const {
      pageSeo: {
        title,
        description,
        countryName,
        creator,
        images,
        keywords,
        publisher,
        siteName,
        url,
        favicon,
      },
    } = await fetchQuery<T>(contentfulKey);

    const imageAsset = images.map((image) => ({
      url: `https:${image.file.url}`,
      alt: image.title,
      height: image.file.details.image.height,
      width: image.file.details.image.width,
    }));

    return {
      title,
      description,
      creator,
      keywords,
      publisher,
      openGraph: {
        type: "website",
        title,
        countryName,
        images: imageAsset,
        siteName,
        url,
        description,
      },
      twitter: {
        title,
        description,
        images: imageAsset,
        creator,
      },
      icons: [{ rel: "icon", url: favicon.file.url }],
    };
  } catch (error) {
    console.error("Failed to fetch metadata:", error);
    throw new Error("Could not fetch page metadata");
  }
};
