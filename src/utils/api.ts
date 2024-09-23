import { createClient } from "contentful";
import { contentful, convertEntry } from "@utils/data";
import { User } from "@utils/contentful";
import { UserId } from "src/config/contentful";

const client = createClient({
  accessToken: contentful.accessToken,
  space: contentful.space,
});

export const fetchUserInfo = async (): Promise<User> => {
  const res = await client.getEntry<User>(UserId, { include: 3 });
  return convertEntry(res);
};