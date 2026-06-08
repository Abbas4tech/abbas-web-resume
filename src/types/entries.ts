import type { Asset, Collection, Icon } from "./common";
import type { Pages } from "./generic";

export interface AppData {
  bannerData: Banner;
  defaultTheme: string;
  layoutSettings: LayoutSettings;
  name: string;
  pagesCollection: Collection<MetaPage>;
  pagesInformation: Pages[];
  resume: Asset;
  resumeIcon: Icon;
  role: string;
  themeIcon?: Icon;
  themeList: string[];
  title: string;
}

export interface Banner {
  bannerAnimation: string;
  bannerImage: Asset;
  profilePicture: Asset;
  socialLinksCollection: Collection<Asset>;
  title: string;
}

export interface LayoutSettings {
  drawerSide: string;
  drawerVariant: string;
  title: string;
}

export interface MetaPage {
  isDefaultPage: boolean;
  pageIcon: Icon;
  pageUrl: string;
  title: string;
}

export interface ProjectCard {
  deployedLink: string;
  deployedLinkIcon: Icon;
  description: string;
  thumbnail: Asset;
  title: string;
}

export interface BioCard {
  icon: Icon;
  title: string;
  value: string;
}

export interface JobExperience {
  company: string;
  companyIcon: Icon;
  currentlyWorking: boolean;
  description: string;
  durationIcon: Icon;
  endDate: string;
  location: string;
  locationIcon: Icon;
  position: string;
  roleIcon: Icon;
  startDate: string;
  techStack: SkillGroup;
  techStackIcon: Icon;
  workedRemotely: boolean;
}

export interface SkillGroup {
  skillIconsCollection: Collection<Icon>;
  skillProgress: number;
  title: string;
}

export interface SkillSet {
  icon: Icon;
  skillsArrayCollection: Collection<SkillGroup>;
  skillsetIcon: Asset;
  title: string;
}

export interface HeaderGraphqlResult {
  userInfo: {
    title: string;
    resume: Asset;
    resumeIcon: Icon;
    themeList: string[];
    themeIcon: Icon;
    defaultTheme: string;
  };
}
