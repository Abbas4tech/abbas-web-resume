export interface Page<T> {
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
  classes?: string[];
  iconCode: string;
  name: string;
  showTooltip: boolean;
}

export interface Asset {
  description: string;
  fileName: string;
  height: number;
  title: string;
  url: string;
  width: number;
}

export interface SEO {
  countryName: string;
  creator: string;
  description: string;
  favicon: Asset;
  imagesCollection: Collection<Asset>;
  keywords: string[];
  publisher: string;
  siteName: string;
  title: string;
  url: string;
}
