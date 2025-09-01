import { EntryFields, EntrySkeletonType, Asset } from "contentful";
import { Document } from "@contentful/rich-text-types";

export interface ApplicationData extends EntrySkeletonType {
  title: EntryFields.Text;
  name: EntryFields.Text;
  bannerData: Banner;
  role: EntryFields.Text;
  pages: MetaPage[];
  resume: FileAsset;
  resumeIcon: IconResponse;
  themeList: EntryFields.Text[];
  themeIcon: IconResponse;
  defaultTheme: EntryFields.Text;
  pagesInformation: Pages[];
  layoutSettings: LayoutSettings;
}

export interface IconResponse {
  name: EntryFields.Text;
  iconCode: EntryFields.Text;
  classes?: EntryFields.Text[];
  showTooltip: EntryFields.Boolean;
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
  favicon: FileAsset;
}

export interface LayoutSettings {
  title: EntryFields.Text;
  drawerSide: EntryFields.Text;
  drawerVariant: EntryFields.Text;
  withPageChangeButton: EntryFields.Boolean;
}

export interface FileAsset extends Asset {
  title: EntryFields.Text;
  description: EntryFields.Text;
  file: {
    url: EntryFields.Text;
    details: {
      size: EntryFields.Number;
      image: {
        width: EntryFields.Number;
        height: EntryFields.Number;
      };
    };
    fileName: EntryFields.Text;
    contentType: EntryFields.Text;
  };
}

export interface MetaPage extends EntrySkeletonType {
  title: EntryFields.Text;
  pageIcon: IconResponse;
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
  pageIcon: IconResponse;
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
  deployedLinkIcon: IconResponse;
  thumbnail: FileAsset;
  description: EntryFields.Text;
}

export interface BioCard {
  title: EntryFields.Text;
  value: EntryFields.Text;
  icon: IconResponse;
}

export interface JobExperience extends EntrySkeletonType {
  company: EntryFields.Text;
  companyIcon: IconResponse;
  description: EntryFields.Text;
  position: EntryFields.Text;
  roleIcon: IconResponse;
  workedRemotely: EntryFields.Boolean;
  startDate: EntryFields.Text;
  endDate: EntryFields.Text;
  durationIcon: IconResponse;
  location: EntryFields.Text;
  locationIcon: IconResponse;
  currentlyWorking: EntryFields.Boolean;
  techStack: SkillGroup;
  techStackIcon: IconResponse;
}

export interface SkillGroup extends EntrySkeletonType {
  title: EntryFields.Text;
  skillProgress: EntryFields.Number;
  skillIcons: IconResponse[];
}

export interface SkillSet extends EntrySkeletonType {
  title: EntryFields.Text;
  skillsetIcon: Asset;
  icon: IconResponse;
  skillsArray: SkillGroup[];
}
