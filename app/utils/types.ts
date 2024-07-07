export type Themes = string[];

export type ContentFulInfo = {
  accessToken: string;
  space: string;
};

export type CommonData = {
  title: string;
  profilePic: {
    width: number;
    height: number;
    src: string;
  };
  themes: Themes;
  role: string;
};
