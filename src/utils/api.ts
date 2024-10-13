import { EntrySkeletonType, createClient } from "contentful";
import { convertEntry } from "@utils/data";
import { Metadata } from "next";
import { Pages } from "./contentful";

const client = createClient({
  accessToken: "7Xqn0FowV95IGZGEx72dFzslmBHvIFNaYLEyEDMVHB0",
  space: process.env.CONTENTFUL_SPACE_ID!,
  environment: "production",
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
      },
    } = await fetchQuery<T>(contentfulKey);

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
        images: images.map((image) => ({
          url: `https:${image.file.url}`,
          alt: image.title,
          height: image.file.details.image.height,
          width: image.file.details.image.width,
        })),
        siteName,
        url,
        description,
      },
      twitter: {
        title,
        description,
        images: images.map((image) => ({
          url: `https:${image.file.url}`,
          alt: image.file.fileName,
          height: image.file.details.image.height,
          width: image.file.details.image.width,
        })),
        creator,
      },
    };
  } catch (error) {
    console.error("Failed to fetch metadata:", error);
    throw new Error("Could not fetch page metadata");
  }
};
