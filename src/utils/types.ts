export type Themes = string[];

export type ContentFulInfo = {
  accessToken: string;
  space: string;
};

export type Resume = {
    title: string;
    src: string;
    description: string;
}

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
};
