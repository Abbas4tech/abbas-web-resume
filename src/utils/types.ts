export type Themes = string[];

export type ContentFulInfo = {
  accessToken: string;
  space: string;
};

export type ExperiencePage = {
  title: string;
  experiences: Experience[];
};

export interface Experience {
  company: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  currentlyWorking: boolean;
  position: string;
  workedRemotely: boolean;
}

export type Resume = {
  title: string;
  src: string;
  description: string;
};

export type UserInfo = {
  title: string;
  profilePic: {
    width: number;
    height: number;
    src: string;
  };
  themes: Themes;
  role: string;
  resume: Resume;
  pages: string[];
  info: any[];
};
