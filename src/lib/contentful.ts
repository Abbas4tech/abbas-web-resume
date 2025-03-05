import { EntryFields, Entry, EntrySkeletonType, Asset } from "contentful";
import { Document } from "@contentful/rich-text-types";

export interface ApplicationData extends EntrySkeletonType {
  title: EntryFields.Text;
  name: EntryFields.Text;
  bannerData: Banner;
  role: EntryFields.Text;
  pages: MetaPage[];
  resume: FileAsset;
  resumeIcon: Icon;
  themeList: EntryFields.Text[];
  themeIcon: Icon;
  defaultTheme: EntryFields.Text;
  pagesInformation: Pages[];
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

export interface SEOData {
  title: EntryFields.Text;
  description: EntryFields.Text;
  keywords: EntryFields.Text[];
  countryName: EntryFields.Text;
  publisher: EntryFields.Text;
  creator: EntryFields.Text;
  images: FileAsset[];
  url: EntryFields.Text;
  siteName: EntryFields.Text;
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

export interface HomePageData extends EntrySkeletonType {
  info: BioCard[];
  description: Document;
}

export interface SkillsPageData extends EntrySkeletonType {
  title: EntryFields.Text;
  skillsSet: SkillSet[];
}

export interface ExperiencePageData extends EntrySkeletonType {
  title: EntryFields.Text;
  experiences: JobExperience[];
}

export interface ProjectsPageData extends EntrySkeletonType {
  title: EntryFields.Text;
  projects: ProjectCard[];
}

export type PageData =
  | ProjectsPageData
  | HomePageData
  | ExperiencePageData
  | SkillsPageData;

export interface Page<T extends PageData = PageData> extends EntrySkeletonType {
  title: EntryFields.Text;
  pageIcon: Icon;
  contentAnimation: EntryFields.Text;
  headingAnimation: EntryFields.Text;
  pageSeo: SEOData;
  pageData: T;
}

export type ExperiencePage = Page<ExperiencePageData>;
export type SkillsPage = Page<SkillsPageData>;
export type ProjectsPage = Page<ProjectsPageData>;
export type HomePage = Page<HomePageData>;
export type Pages = ExperiencePage | SkillsPage | ProjectsPage | HomePage;

export interface ProjectCard extends EntrySkeletonType {
  title: EntryFields.Text;
  deployedLink: EntryFields.Text;
  deployedLinkIcon: Icon;
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
