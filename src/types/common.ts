import { PageData } from "./generic";

export interface Page<T extends unknown = unknown> {
  page: {
    title: string;
    pageIcon: Icon;
    contentAnimation: string;
    headingAnimation: string;
    pageData: T;
  };
}

export interface Collection<T> {
  items: T[];
}

export interface Icon {
  name: string;
  iconCode: string;
  classes?: string[];
  showTooltip: boolean;
}

export interface Asset {
  url: string;
  width: number;
  height: number;
  fileName: string;
  title: string;
  description: string;
}

export interface SEO {
  title: string;
  description: string;
  keywords: string[];
  countryName: string;
  publisher: string;
  creator: string;
  imagesCollection: Collection<Asset>;
  url: string;
  siteName: string;
  favicon: Asset;
}
