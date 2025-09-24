import { Collection, Icon, Asset, Page } from "@/types/generic";
import { Document } from "@contentful/rich-text-types";

export interface ApplicationData {
  title: string;
  name: string;
  bannerData: Banner;
  role: string;
  pages: MetaPage[];
  resume: Asset;
  resumeIcon: Icon;
  themeList: string[];
  themeIcon: Icon;
  defaultTheme: string;
  pagesInformation: Pages[];
  layoutSettings: LayoutSettings;
}

export interface Banner {
  title: string;
  profilePicture: Asset;
  bannerImage: Asset;
  bannerAnimation: string;
  socialLinks: Asset[];
}

export interface LayoutSettings {
  title: string;
  drawerSide: string;
  drawerVariant: string;
}

export interface MetaPage {
  title: string;
  pageIcon: Icon;
  pageUrl: string;
  isDefaultPage: boolean;
}

export interface HomePageData {
  infoCollection: Collection<BioCard>;
  description: {
    json: Document;
  };
}

export interface SkillsPageData {
  title: string;
  skillsSetCollection: Collection<Omit<SkillSet, "skillsetIcon">>;
}

export interface ExperiencePageData {
  title: string;
  experiencesCollection: Collection<JobExperience>;
}

export interface ProjectsPageData {
  title: string;
  projectsCollection: Collection<ProjectCard>;
}

export type PageData =
  | ProjectsPageData
  | HomePageData
  | ExperiencePageData
  | SkillsPageData;

export type ExperiencePage = Page<ExperiencePageData>;
export type SkillsPage = Page<SkillsPageData>;
export type ProjectsPage = Page<ProjectsPageData>;
export type HomePage = Page<HomePageData>;
export type Pages = ExperiencePage | SkillsPage | ProjectsPage | HomePage;

export interface ProjectCard {
  title: string;
  deployedLink: string;
  deployedLinkIcon: Icon;
  thumbnail: Asset;
  description: string;
}

export interface BioCard {
  title: string;
  value: string;
  icon: Icon;
}

export interface JobExperience {
  company: string;
  companyIcon: Icon;
  description: string;
  position: string;
  roleIcon: Icon;
  workedRemotely: boolean;
  startDate: string;
  endDate: string;
  durationIcon: Icon;
  location: string;
  locationIcon: Icon;
  currentlyWorking: boolean;
  techStack: {
    title: string;
    skillProgress: number;
    skillIconsCollection: Collection<Pick<Icon, "name">>;
  };
  techStackIcon: Icon;
}

export interface SkillGroup {
  title: string;
  skillProgress: number;
  skillIconsCollection: Collection<Icon>;
}

export interface SkillSet {
  title: string;
  skillsetIcon: Asset;
  icon: Icon;
  skillsArrayCollection: Collection<SkillGroup>;
}
