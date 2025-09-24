import { Asset, Collection, Icon } from "./common";
import { Pages } from "./generic";

export interface AppData {
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
