import { createClient } from "contentful";
import { convertEntry } from "@utils/data";
import { User } from "@utils/contentful";

const client = createClient({
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN!,
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID!,
});

export const fetchUserInfo = async (): Promise<User> => {
  const res = await client.getEntry<User>(process.env.NEXT_PUBLIC_USER_CONTENT_ID!, { include: 3 });
  return convertEntry(res);
};
