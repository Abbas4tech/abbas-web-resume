import { createClient, EntrySkeletonType } from "contentful";
import { contentful, convertEntry } from "@utils/data";
import { ExperiencePage, ProjectsPage, SkillsPage, User } from "@utils/contentful";
import { UserId } from "src/config/contentful";

const client = createClient({
  accessToken: contentful.accessToken,
  space: contentful.space,
});

export const fetchQuery = async <T extends EntrySkeletonType>(
  id: string
): Promise<T> => convertEntry(await client.getEntry<T>(id, { include: 3 }));

export const fetchUserInfo = async (): Promise<User> =>
  await fetchQuery<User>(UserId);

export const fetchExperiencePage = async (): Promise<ExperiencePage> =>
  await fetchQuery<ExperiencePage>("21NOujzoOqanJaogJDA0ns");

export const fetchSkillsPage = async (): Promise<SkillsPage> =>
  await fetchQuery<SkillsPage>("74LSr3oqqKDQ5p1z5zrwJo");

export const fetchProjectsPage = async (): Promise<ProjectsPage> =>
  await fetchQuery<ProjectsPage>("4WOd5ATjoTggB8M2bOFVmR");

