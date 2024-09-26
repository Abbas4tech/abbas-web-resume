import { createClient, EntrySkeletonType } from "contentful";
import { convertEntry } from "@utils/data";
import { ApplicationData } from "@utils/contentful";

const client = createClient({
  accessToken: process.env.CONTENTFUL_API_KEY!,
  space: process.env.CONTENTFUL_SPACE_ID!,
  environment: process.env.CONTENTFUL_ENVIRONMENT_ID!,
});

export const fetchQuery = async <T extends EntrySkeletonType>(
  id: string
): Promise<T> => convertEntry(await client.getEntry<T>(id, { include: 10 }));

export const fetchApplicationData = async (): Promise<ApplicationData> =>
  await fetchQuery<ApplicationData>(
    process.env.CONTENTFUL_APPLICATION_DATA_ID!
  );
