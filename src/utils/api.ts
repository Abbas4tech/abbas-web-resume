import { createClient, EntrySkeletonType } from "contentful";
import { convertEntry } from "@utils/data";
import { ApplicationData } from "@utils/contentful";
import { contentfulConfig, UserId } from "src/config/contentful";

const client = createClient({
  accessToken: contentfulConfig.accessToken,
  space: contentfulConfig.space,
});

export const fetchQuery = async <T extends EntrySkeletonType>(
  id: string
): Promise<T> => convertEntry(await client.getEntry<T>(id, { include: 10 }));

export const fetchApplicationData = async (): Promise<ApplicationData> =>
  await fetchQuery<ApplicationData>(UserId);
