import { createClient, EntrySkeletonType } from "contentful";
import { contentful, convertEntry } from "@utils/data";
import { ApplicationData } from "@utils/contentful";
import { UserId } from "src/config/contentful";

const client = createClient({
  accessToken: contentful.accessToken,
  space: contentful.space,
});

export const fetchQuery = async <T extends EntrySkeletonType>(
  id: string
): Promise<T> => convertEntry(await client.getEntry<T>(id, { include: 10 }));

export const fetchApplicationData = async (): Promise<ApplicationData> =>
  await fetchQuery<ApplicationData>(UserId);
