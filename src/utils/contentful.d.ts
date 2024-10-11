import { EntryFields, Entry, EntrySkeletonType, Asset } from "contentful";
import { Document } from "@contentful/rich-text-types";

export interface ApplicationData extends EntrySkeletonType {
  title: EntryFields.Text;
  profilePicture: FileAsset;
  name: EntryFields.Text;
  themeList: EntryFields.Text[];
  role: EntryFields.Text;
  bannerData: Banner;
  resume: FileAsset;
  pages: MetaPage[];
  info: BioCard[];
  technologies: SkillSet[];
  projects: ProjectCard[];
  experiences: JobExperience[];
  pagesInformation: Pages[];
  description: Document;
  defaultTheme: EntryFields.Text;
}

export interface Icon {
  name: EntryFields.Text;
  iconCode: EntryFields.Text;
  classes?: EntryFields.Text[];
  showTooltip: boolean;
}

export interface Banner {
  title: EntryFields.Text;
  profilePicture: FileAsset;
  bannerImage: FileAsset;
  bannerAnimation: EntryFields.Text;
  socialLinks: FileAsset[];
}

export interface FileAsset extends Asset {
  title: EntryFields.Text;
  description: EntryFields.Text;
  file: {
    url: EntryFields.Text;
    details: {
      size: number;
      image: {
        width: number;
        height: number;
      };
    };
    fileName: EntryFields.Text;
    contentType: EntryFields.Text;
  };
}

export interface MetaPage extends EntrySkeletonType {
  title: EntryFields.Text;
  pageIcon: Icon;
  pageUrl: EntryFields.Text;
  isDefaultPage: EntryFields.Boolean;
}

export interface Page<T extends PageData = PageData> extends EntrySkeletonType {
  title: EntryFields.Text;
  pageIcon: Icon;
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
  icon: Icon;
}

export interface JobExperience extends EntrySkeletonType {
  company: EntryFields.Text;
  companyIcon: Icon;
  description: EntryFields.Text;
  position: EntryFields.Text;
  roleIcon: Icon;
  workedRemotely: EntryFields.Boolean;
  startDate: EntryFields.Text;
  endDate: EntryFields.Text;
  durationIcon: Icon;
  location: EntryFields.Text;
  locationIcon: Icon;
  currentlyWorking: EntryFields.Boolean;
  techStack: SkillGroup;
  techStackIcon: Icon;
}

export interface SkillGroup extends EntrySkeletonType {
  title: EntryFields.Text;
  skillProgress: EntryFields.Number;
  skillIcons: Icon[];
}

export interface SkillSet extends EntrySkeletonType {
  title: EntryFields.Text;
  skillsetIcon: Asset;
  icon: Icon;
  skillsArray: SkillGroup[];
}

type UnwrapEntry<T> = T extends Entry<infer U>
  ? UnwrapEntry<U>
  : T extends (infer U)[]
  ? UnwrapEntry<U>[]
  : T;
