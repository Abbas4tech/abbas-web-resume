import { Asset, Icon } from "./generic";

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
