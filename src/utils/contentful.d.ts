import { EntryFields, Entry, EntrySkeletonType, Asset } from "contentful";

export interface ApplicationData extends EntrySkeletonType {
  title: EntryFields.Text;
  profilePicture: FileAsset;
  name: EntryFields.Text;
  themeList: EntryFields.Text[];
  role: EntryFields.Text;
  defaultPage: string;
  resume: FileAsset;
  pages: string[];
  info: BioCard[];
  technologies: SkillSet[];
  projects: ProjectCard[];
  experiences: JobExperience[];
  pagesInformation: Pages[];
}

export interface FileAsset extends Asset {
  title: EntryFields.Text;
  description: EntryFields.Text;
  file: {
    url: string;
    details: {
      size: number;
      image: {
        width: number;
        height: number;
      };
    };
    fileName: string;
    contentType: string;
  };
}

export interface Page<T extends PageData = PageData> extends EntrySkeletonType {
  title: EntryFields.Text;
  identifier: EntryFields.Text;
  contentAnimation: EntryFields.Text;
  headingAnimation: EntryFields.Text;
  pageData: T;
}

export type ExperiencePage = Page<JobExperience[]>;
export type SkillsPage = Page<SkillSet[]>;
export type ProjectsPage = Page<ProjectCard[]>;
export type Pages = ExperiencePage | SkillsPage | ProjectsPage;

export interface ProjectCard extends EntrySkeletonType {
  title: EntryFields.Text;
  deployedLink: EntryFields.Text;
  thumbnail: FileAsset;
  description: EntryFields.Text;
}

export interface BioCard {
  title: EntryFields.Text;
  value: EntryFields.Text;
  identifier: EntryFields.Text;
}

export interface JobExperience extends EntrySkeletonType {
  company: EntryFields.Text;
  description: EntryFields.Text;
  position: EntryFields.Text;
  workedRemotely: EntryFields.Boolean;
  startDate: EntryFields.Text;
  endDate: EntryFields.Text;
  location: EntryFields.Text;
  currentlyWorking: EntryFields.Boolean;
}

export interface SkillGroup extends EntrySkeletonType {
  title: EntryFields.Text;
  skillProgress: EntryFields.Number;
  skills: EntryFields.Text[];
}

export interface SkillSet extends EntrySkeletonType {
  title: EntryFields.Text;
  skillsetIcon: Asset;
  identifier: EntryFields.Text;
  skillsArray: SkillGroup[];
}

type UnwrapEntry<T> = T extends Entry<infer U>
  ? UnwrapEntry<U>
  : T extends (infer U)[]
  ? UnwrapEntry<U>[]
  : T;
