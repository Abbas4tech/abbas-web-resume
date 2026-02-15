/* eslint-disable */
import { GraphQLClient } from "graphql-request";
import * as Dom from "graphql-request/dist/types.dom";
import { print } from "graphql";
import gql from "graphql-tag";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
  Dimension: { input: any; output: any };
  HexColor: { input: any; output: any };
  JSON: { input: any; output: any };
  Quality: { input: any; output: any };
};

/** Represents a binary file in a space. An asset can be any file type. */
export type Asset = {
  __typename?: "Asset";
  contentType?: Maybe<Scalars["String"]["output"]>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars["String"]["output"]>;
  fileName?: Maybe<Scalars["String"]["output"]>;
  height?: Maybe<Scalars["Int"]["output"]>;
  linkedFrom?: Maybe<AssetLinkingCollections>;
  size?: Maybe<Scalars["Int"]["output"]>;
  sys: Sys;
  title?: Maybe<Scalars["String"]["output"]>;
  url?: Maybe<Scalars["String"]["output"]>;
  width?: Maybe<Scalars["Int"]["output"]>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetContentTypeArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetDescriptionArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetFileNameArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetHeightArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetSizeArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetTitleArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetUrlArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  transform?: InputMaybe<ImageTransformOptions>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** Represents a binary file in a space. An asset can be any file type. */
export type AssetWidthArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type AssetCollection = {
  __typename?: "AssetCollection";
  items: Array<Maybe<Asset>>;
  limit: Scalars["Int"]["output"];
  skip: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type AssetFilter = {
  AND?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  contentType?: InputMaybe<Scalars["String"]["input"]>;
  contentType_contains?: InputMaybe<Scalars["String"]["input"]>;
  contentType_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  contentType_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  contentType_not?: InputMaybe<Scalars["String"]["input"]>;
  contentType_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  contentType_not_in?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  description_contains?: InputMaybe<Scalars["String"]["input"]>;
  description_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  description_not?: InputMaybe<Scalars["String"]["input"]>;
  description_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  description_not_in?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  fileName?: InputMaybe<Scalars["String"]["input"]>;
  fileName_contains?: InputMaybe<Scalars["String"]["input"]>;
  fileName_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  fileName_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  fileName_not?: InputMaybe<Scalars["String"]["input"]>;
  fileName_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  fileName_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  height?: InputMaybe<Scalars["Int"]["input"]>;
  height_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  height_gt?: InputMaybe<Scalars["Int"]["input"]>;
  height_gte?: InputMaybe<Scalars["Int"]["input"]>;
  height_in?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  height_lt?: InputMaybe<Scalars["Int"]["input"]>;
  height_lte?: InputMaybe<Scalars["Int"]["input"]>;
  height_not?: InputMaybe<Scalars["Int"]["input"]>;
  height_not_in?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  size?: InputMaybe<Scalars["Int"]["input"]>;
  size_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  size_gt?: InputMaybe<Scalars["Int"]["input"]>;
  size_gte?: InputMaybe<Scalars["Int"]["input"]>;
  size_in?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  size_lt?: InputMaybe<Scalars["Int"]["input"]>;
  size_lte?: InputMaybe<Scalars["Int"]["input"]>;
  size_not?: InputMaybe<Scalars["Int"]["input"]>;
  size_not_in?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  title_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  title_not?: InputMaybe<Scalars["String"]["input"]>;
  title_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  url?: InputMaybe<Scalars["String"]["input"]>;
  url_contains?: InputMaybe<Scalars["String"]["input"]>;
  url_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  url_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  url_not?: InputMaybe<Scalars["String"]["input"]>;
  url_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  width?: InputMaybe<Scalars["Int"]["input"]>;
  width_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  width_gt?: InputMaybe<Scalars["Int"]["input"]>;
  width_gte?: InputMaybe<Scalars["Int"]["input"]>;
  width_in?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  width_lt?: InputMaybe<Scalars["Int"]["input"]>;
  width_lte?: InputMaybe<Scalars["Int"]["input"]>;
  width_not?: InputMaybe<Scalars["Int"]["input"]>;
  width_not_in?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
};

export type AssetLinkingCollections = {
  __typename?: "AssetLinkingCollections";
  bannerCollection?: Maybe<BannerCollection>;
  entryCollection?: Maybe<EntryCollection>;
  projectCardCollection?: Maybe<ProjectCardCollection>;
  seoDataCollection?: Maybe<SeoDataCollection>;
  skillSetCollection?: Maybe<SkillSetCollection>;
  userInfoCollection?: Maybe<UserInfoCollection>;
};

export type AssetLinkingCollectionsBannerCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type AssetLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type AssetLinkingCollectionsProjectCardCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type AssetLinkingCollectionsSeoDataCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type AssetLinkingCollectionsSkillSetCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type AssetLinkingCollectionsUserInfoCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export enum AssetOrder {
  ContentTypeAsc = "contentType_ASC",
  ContentTypeDesc = "contentType_DESC",
  FileNameAsc = "fileName_ASC",
  FileNameDesc = "fileName_DESC",
  HeightAsc = "height_ASC",
  HeightDesc = "height_DESC",
  SizeAsc = "size_ASC",
  SizeDesc = "size_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  UrlAsc = "url_ASC",
  UrlDesc = "url_DESC",
  WidthAsc = "width_ASC",
  WidthDesc = "width_DESC",
}

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/banner) */
export type Banner = Entry &
  _Node & {
    __typename?: "Banner";
    _id: Scalars["ID"]["output"];
    bannerAnimation?: Maybe<Scalars["String"]["output"]>;
    bannerImage?: Maybe<Asset>;
    contentfulMetadata: ContentfulMetadata;
    linkedFrom?: Maybe<BannerLinkingCollections>;
    profilePicture?: Maybe<Asset>;
    socialLinksCollection?: Maybe<AssetCollection>;
    sys: Sys;
    title?: Maybe<Scalars["String"]["output"]>;
  };

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/banner) */
export type BannerBannerAnimationArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/banner) */
export type BannerBannerImageArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/banner) */
export type BannerLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/banner) */
export type BannerProfilePictureArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/banner) */
export type BannerSocialLinksCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/banner) */
export type BannerTitleArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type BannerCollection = {
  __typename?: "BannerCollection";
  items: Array<Maybe<Banner>>;
  limit: Scalars["Int"]["output"];
  skip: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type BannerFilter = {
  AND?: InputMaybe<Array<InputMaybe<BannerFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<BannerFilter>>>;
  bannerAnimation?: InputMaybe<Scalars["String"]["input"]>;
  bannerAnimation_contains?: InputMaybe<Scalars["String"]["input"]>;
  bannerAnimation_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  bannerAnimation_in?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  bannerAnimation_not?: InputMaybe<Scalars["String"]["input"]>;
  bannerAnimation_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  bannerAnimation_not_in?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  bannerImage_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  profilePicture_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  socialLinksCollection_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  title_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  title_not?: InputMaybe<Scalars["String"]["input"]>;
  title_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type BannerLinkingCollections = {
  __typename?: "BannerLinkingCollections";
  entryCollection?: Maybe<EntryCollection>;
  userInfoCollection?: Maybe<UserInfoCollection>;
};

export type BannerLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type BannerLinkingCollectionsUserInfoCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<
    Array<InputMaybe<BannerLinkingCollectionsUserInfoCollectionOrder>>
  >;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export enum BannerLinkingCollectionsUserInfoCollectionOrder {
  DefaultThemeAsc = "defaultTheme_ASC",
  DefaultThemeDesc = "defaultTheme_DESC",
  NameAsc = "name_ASC",
  NameDesc = "name_DESC",
  RoleAsc = "role_ASC",
  RoleDesc = "role_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
  WithPageChangeButtonAsc = "withPageChangeButton_ASC",
  WithPageChangeButtonDesc = "withPageChangeButton_DESC",
}

export enum BannerOrder {
  BannerAnimationAsc = "bannerAnimation_ASC",
  BannerAnimationDesc = "bannerAnimation_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/bioCard) */
export type BioCard = Entry &
  _Node & {
    __typename?: "BioCard";
    _id: Scalars["ID"]["output"];
    contentfulMetadata: ContentfulMetadata;
    icon?: Maybe<Icon>;
    linkedFrom?: Maybe<BioCardLinkingCollections>;
    sys: Sys;
    title?: Maybe<Scalars["String"]["output"]>;
    value?: Maybe<Scalars["String"]["output"]>;
  };

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/bioCard) */
export type BioCardIconArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<IconFilter>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/bioCard) */
export type BioCardLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/bioCard) */
export type BioCardTitleArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/bioCard) */
export type BioCardValueArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type BioCardCollection = {
  __typename?: "BioCardCollection";
  items: Array<Maybe<BioCard>>;
  limit: Scalars["Int"]["output"];
  skip: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type BioCardFilter = {
  AND?: InputMaybe<Array<InputMaybe<BioCardFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<BioCardFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  icon?: InputMaybe<CfIconNestedFilter>;
  icon_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  title_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  title_not?: InputMaybe<Scalars["String"]["input"]>;
  title_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  value?: InputMaybe<Scalars["String"]["input"]>;
  value_contains?: InputMaybe<Scalars["String"]["input"]>;
  value_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  value_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  value_not?: InputMaybe<Scalars["String"]["input"]>;
  value_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  value_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type BioCardLinkingCollections = {
  __typename?: "BioCardLinkingCollections";
  centerContentAreaCollectionCollection?: Maybe<CenterContentAreaCollectionCollection>;
  entryCollection?: Maybe<EntryCollection>;
  homePageDataCollection?: Maybe<HomePageDataCollection>;
};

export type BioCardLinkingCollectionsCenterContentAreaCollectionCollectionArgs =
  {
    limit?: InputMaybe<Scalars["Int"]["input"]>;
    locale?: InputMaybe<Scalars["String"]["input"]>;
    order?: InputMaybe<
      Array<
        InputMaybe<BioCardLinkingCollectionsCenterContentAreaCollectionCollectionOrder>
      >
    >;
    preview?: InputMaybe<Scalars["Boolean"]["input"]>;
    skip?: InputMaybe<Scalars["Int"]["input"]>;
    useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  };

export type BioCardLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type BioCardLinkingCollectionsHomePageDataCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<
    Array<InputMaybe<BioCardLinkingCollectionsHomePageDataCollectionOrder>>
  >;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export enum BioCardLinkingCollectionsCenterContentAreaCollectionCollectionOrder {
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

export enum BioCardLinkingCollectionsHomePageDataCollectionOrder {
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

export enum BioCardOrder {
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
  ValueAsc = "value_ASC",
  ValueDesc = "value_DESC",
}

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/centerContentAreaCollection) */
export type CenterContentAreaCollection = Entry &
  _Node & {
    __typename?: "CenterContentAreaCollection";
    _id: Scalars["ID"]["output"];
    contentCollection?: Maybe<CenterContentAreaCollectionContentCollection>;
    contentfulMetadata: ContentfulMetadata;
    description?: Maybe<CenterContentAreaCollectionDescription>;
    linkedFrom?: Maybe<CenterContentAreaCollectionLinkingCollections>;
    sys: Sys;
    title?: Maybe<Scalars["String"]["output"]>;
  };

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/centerContentAreaCollection) */
export type CenterContentAreaCollectionContentCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<CenterContentAreaCollectionContentFilter>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/centerContentAreaCollection) */
export type CenterContentAreaCollectionDescriptionArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/centerContentAreaCollection) */
export type CenterContentAreaCollectionLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/centerContentAreaCollection) */
export type CenterContentAreaCollectionTitleArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type CenterContentAreaCollectionCollection = {
  __typename?: "CenterContentAreaCollectionCollection";
  items: Array<Maybe<CenterContentAreaCollection>>;
  limit: Scalars["Int"]["output"];
  skip: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type CenterContentAreaCollectionContentCollection = {
  __typename?: "CenterContentAreaCollectionContentCollection";
  items: Array<Maybe<CenterContentAreaCollectionContentItem>>;
  limit: Scalars["Int"]["output"];
  skip: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type CenterContentAreaCollectionContentFilter = {
  AND?: InputMaybe<Array<InputMaybe<CenterContentAreaCollectionContentFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CenterContentAreaCollectionContentFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
};

export type CenterContentAreaCollectionContentItem =
  | BioCard
  | JobExperience
  | ProjectCard;

export type CenterContentAreaCollectionDescription = {
  __typename?: "CenterContentAreaCollectionDescription";
  json: Scalars["JSON"]["output"];
  links: CenterContentAreaCollectionDescriptionLinks;
};

export type CenterContentAreaCollectionDescriptionAssets = {
  __typename?: "CenterContentAreaCollectionDescriptionAssets";
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type CenterContentAreaCollectionDescriptionEntries = {
  __typename?: "CenterContentAreaCollectionDescriptionEntries";
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type CenterContentAreaCollectionDescriptionLinks = {
  __typename?: "CenterContentAreaCollectionDescriptionLinks";
  assets: CenterContentAreaCollectionDescriptionAssets;
  entries: CenterContentAreaCollectionDescriptionEntries;
  resources: CenterContentAreaCollectionDescriptionResources;
};

export type CenterContentAreaCollectionDescriptionResources = {
  __typename?: "CenterContentAreaCollectionDescriptionResources";
  block: Array<CenterContentAreaCollectionDescriptionResourcesBlock>;
  hyperlink: Array<CenterContentAreaCollectionDescriptionResourcesHyperlink>;
  inline: Array<CenterContentAreaCollectionDescriptionResourcesInline>;
};

export type CenterContentAreaCollectionDescriptionResourcesBlock =
  ResourceLink & {
    __typename?: "CenterContentAreaCollectionDescriptionResourcesBlock";
    sys: ResourceSys;
  };

export type CenterContentAreaCollectionDescriptionResourcesHyperlink =
  ResourceLink & {
    __typename?: "CenterContentAreaCollectionDescriptionResourcesHyperlink";
    sys: ResourceSys;
  };

export type CenterContentAreaCollectionDescriptionResourcesInline =
  ResourceLink & {
    __typename?: "CenterContentAreaCollectionDescriptionResourcesInline";
    sys: ResourceSys;
  };

export type CenterContentAreaCollectionFilter = {
  AND?: InputMaybe<Array<InputMaybe<CenterContentAreaCollectionFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CenterContentAreaCollectionFilter>>>;
  content?: InputMaybe<CfcontentMultiTypeNestedFilter>;
  contentCollection_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description_contains?: InputMaybe<Scalars["String"]["input"]>;
  description_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  description_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  title_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  title_not?: InputMaybe<Scalars["String"]["input"]>;
  title_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type CenterContentAreaCollectionLinkingCollections = {
  __typename?: "CenterContentAreaCollectionLinkingCollections";
  entryCollection?: Maybe<EntryCollection>;
};

export type CenterContentAreaCollectionLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export enum CenterContentAreaCollectionOrder {
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

export type ContentfulMetadata = {
  __typename?: "ContentfulMetadata";
  concepts: Array<Maybe<TaxonomyConcept>>;
  tags: Array<Maybe<ContentfulTag>>;
};

export type ContentfulMetadataConceptsDescendantsFilter = {
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ContentfulMetadataConceptsFilter = {
  descendants?: InputMaybe<ContentfulMetadataConceptsDescendantsFilter>;
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ContentfulMetadataFilter = {
  concepts?: InputMaybe<ContentfulMetadataConceptsFilter>;
  concepts_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  tags?: InputMaybe<ContentfulMetadataTagsFilter>;
  tags_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type ContentfulMetadataTagsFilter = {
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

/**
 * Represents a tag entity for finding and organizing content easily.
 *       Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-tags
 */
export type ContentfulTag = {
  __typename?: "ContentfulTag";
  id?: Maybe<Scalars["String"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type Entry = {
  contentfulMetadata: ContentfulMetadata;
  sys: Sys;
};

export type EntryCollection = {
  __typename?: "EntryCollection";
  items: Array<Maybe<Entry>>;
  limit: Scalars["Int"]["output"];
  skip: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type EntryFilter = {
  AND?: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
};

export enum EntryOrder {
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
}

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/experiencePageData) */
export type ExperiencePageData = Entry &
  _Node & {
    __typename?: "ExperiencePageData";
    _id: Scalars["ID"]["output"];
    contentfulMetadata: ContentfulMetadata;
    experiencesCollection?: Maybe<ExperiencePageDataExperiencesCollection>;
    linkedFrom?: Maybe<ExperiencePageDataLinkingCollections>;
    sys: Sys;
    title?: Maybe<Scalars["String"]["output"]>;
  };

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/experiencePageData) */
export type ExperiencePageDataExperiencesCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<
    Array<InputMaybe<ExperiencePageDataExperiencesCollectionOrder>>
  >;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<JobExperienceFilter>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/experiencePageData) */
export type ExperiencePageDataLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/experiencePageData) */
export type ExperiencePageDataTitleArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type ExperiencePageDataCollection = {
  __typename?: "ExperiencePageDataCollection";
  items: Array<Maybe<ExperiencePageData>>;
  limit: Scalars["Int"]["output"];
  skip: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type ExperiencePageDataExperiencesCollection = {
  __typename?: "ExperiencePageDataExperiencesCollection";
  items: Array<Maybe<JobExperience>>;
  limit: Scalars["Int"]["output"];
  skip: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export enum ExperiencePageDataExperiencesCollectionOrder {
  CompanyAsc = "company_ASC",
  CompanyDesc = "company_DESC",
  CurrentlyWorkingAsc = "currentlyWorking_ASC",
  CurrentlyWorkingDesc = "currentlyWorking_DESC",
  EndDateAsc = "endDate_ASC",
  EndDateDesc = "endDate_DESC",
  LocationAsc = "location_ASC",
  LocationDesc = "location_DESC",
  PositionAsc = "position_ASC",
  PositionDesc = "position_DESC",
  StartDateAsc = "startDate_ASC",
  StartDateDesc = "startDate_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  WorkedRemotelyAsc = "workedRemotely_ASC",
  WorkedRemotelyDesc = "workedRemotely_DESC",
}

export type ExperiencePageDataFilter = {
  AND?: InputMaybe<Array<InputMaybe<ExperiencePageDataFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ExperiencePageDataFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  experiences?: InputMaybe<CfJobExperienceNestedFilter>;
  experiencesCollection_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  title_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  title_not?: InputMaybe<Scalars["String"]["input"]>;
  title_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ExperiencePageDataLinkingCollections = {
  __typename?: "ExperiencePageDataLinkingCollections";
  entryCollection?: Maybe<EntryCollection>;
  pageCollection?: Maybe<PageCollection>;
};

export type ExperiencePageDataLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type ExperiencePageDataLinkingCollectionsPageCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<
    Array<InputMaybe<ExperiencePageDataLinkingCollectionsPageCollectionOrder>>
  >;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export enum ExperiencePageDataLinkingCollectionsPageCollectionOrder {
  ContentAnimationAsc = "contentAnimation_ASC",
  ContentAnimationDesc = "contentAnimation_DESC",
  HeadingAnimationAsc = "headingAnimation_ASC",
  HeadingAnimationDesc = "headingAnimation_DESC",
  PathAsc = "path_ASC",
  PathDesc = "path_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

export enum ExperiencePageDataOrder {
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/homePageData) */
export type HomePageData = Entry &
  _Node & {
    __typename?: "HomePageData";
    _id: Scalars["ID"]["output"];
    contentfulMetadata: ContentfulMetadata;
    description?: Maybe<HomePageDataDescription>;
    infoCollection?: Maybe<HomePageDataInfoCollection>;
    linkedFrom?: Maybe<HomePageDataLinkingCollections>;
    sys: Sys;
    title?: Maybe<Scalars["String"]["output"]>;
  };

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/homePageData) */
export type HomePageDataDescriptionArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/homePageData) */
export type HomePageDataInfoCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<Array<InputMaybe<HomePageDataInfoCollectionOrder>>>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<BioCardFilter>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/homePageData) */
export type HomePageDataLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/homePageData) */
export type HomePageDataTitleArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type HomePageDataCollection = {
  __typename?: "HomePageDataCollection";
  items: Array<Maybe<HomePageData>>;
  limit: Scalars["Int"]["output"];
  skip: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type HomePageDataDescription = {
  __typename?: "HomePageDataDescription";
  json: Scalars["JSON"]["output"];
  links: HomePageDataDescriptionLinks;
};

export type HomePageDataDescriptionAssets = {
  __typename?: "HomePageDataDescriptionAssets";
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type HomePageDataDescriptionEntries = {
  __typename?: "HomePageDataDescriptionEntries";
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type HomePageDataDescriptionLinks = {
  __typename?: "HomePageDataDescriptionLinks";
  assets: HomePageDataDescriptionAssets;
  entries: HomePageDataDescriptionEntries;
  resources: HomePageDataDescriptionResources;
};

export type HomePageDataDescriptionResources = {
  __typename?: "HomePageDataDescriptionResources";
  block: Array<HomePageDataDescriptionResourcesBlock>;
  hyperlink: Array<HomePageDataDescriptionResourcesHyperlink>;
  inline: Array<HomePageDataDescriptionResourcesInline>;
};

export type HomePageDataDescriptionResourcesBlock = ResourceLink & {
  __typename?: "HomePageDataDescriptionResourcesBlock";
  sys: ResourceSys;
};

export type HomePageDataDescriptionResourcesHyperlink = ResourceLink & {
  __typename?: "HomePageDataDescriptionResourcesHyperlink";
  sys: ResourceSys;
};

export type HomePageDataDescriptionResourcesInline = ResourceLink & {
  __typename?: "HomePageDataDescriptionResourcesInline";
  sys: ResourceSys;
};

export type HomePageDataFilter = {
  AND?: InputMaybe<Array<InputMaybe<HomePageDataFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<HomePageDataFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description_contains?: InputMaybe<Scalars["String"]["input"]>;
  description_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  description_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  info?: InputMaybe<CfBioCardNestedFilter>;
  infoCollection_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  title_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  title_not?: InputMaybe<Scalars["String"]["input"]>;
  title_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type HomePageDataInfoCollection = {
  __typename?: "HomePageDataInfoCollection";
  items: Array<Maybe<BioCard>>;
  limit: Scalars["Int"]["output"];
  skip: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export enum HomePageDataInfoCollectionOrder {
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
  ValueAsc = "value_ASC",
  ValueDesc = "value_DESC",
}

export type HomePageDataLinkingCollections = {
  __typename?: "HomePageDataLinkingCollections";
  entryCollection?: Maybe<EntryCollection>;
  pageCollection?: Maybe<PageCollection>;
};

export type HomePageDataLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type HomePageDataLinkingCollectionsPageCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<
    Array<InputMaybe<HomePageDataLinkingCollectionsPageCollectionOrder>>
  >;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export enum HomePageDataLinkingCollectionsPageCollectionOrder {
  ContentAnimationAsc = "contentAnimation_ASC",
  ContentAnimationDesc = "contentAnimation_DESC",
  HeadingAnimationAsc = "headingAnimation_ASC",
  HeadingAnimationDesc = "headingAnimation_DESC",
  PathAsc = "path_ASC",
  PathDesc = "path_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

export enum HomePageDataOrder {
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/icon) */
export type Icon = Entry &
  _Node & {
    __typename?: "Icon";
    _id: Scalars["ID"]["output"];
    classes?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
    contentfulMetadata: ContentfulMetadata;
    iconCode?: Maybe<Scalars["String"]["output"]>;
    linkedFrom?: Maybe<IconLinkingCollections>;
    name?: Maybe<Scalars["String"]["output"]>;
    showTooltip?: Maybe<Scalars["Boolean"]["output"]>;
    sys: Sys;
  };

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/icon) */
export type IconClassesArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/icon) */
export type IconIconCodeArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/icon) */
export type IconLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/icon) */
export type IconNameArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/icon) */
export type IconShowTooltipArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type IconCollection = {
  __typename?: "IconCollection";
  items: Array<Maybe<Icon>>;
  limit: Scalars["Int"]["output"];
  skip: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type IconFilter = {
  AND?: InputMaybe<Array<InputMaybe<IconFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<IconFilter>>>;
  classes_contains_all?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  classes_contains_none?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  classes_contains_some?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  classes_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  iconCode?: InputMaybe<Scalars["String"]["input"]>;
  iconCode_contains?: InputMaybe<Scalars["String"]["input"]>;
  iconCode_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  iconCode_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  iconCode_not?: InputMaybe<Scalars["String"]["input"]>;
  iconCode_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  iconCode_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  name_contains?: InputMaybe<Scalars["String"]["input"]>;
  name_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  name_not?: InputMaybe<Scalars["String"]["input"]>;
  name_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  showTooltip?: InputMaybe<Scalars["Boolean"]["input"]>;
  showTooltip_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  showTooltip_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  sys?: InputMaybe<SysFilter>;
};

export type IconLinkingCollections = {
  __typename?: "IconLinkingCollections";
  bioCardCollection?: Maybe<BioCardCollection>;
  entryCollection?: Maybe<EntryCollection>;
  jobExperienceCollection?: Maybe<JobExperienceCollection>;
  metaPageCollection?: Maybe<MetaPageCollection>;
  pageCollection?: Maybe<PageCollection>;
  projectCardCollection?: Maybe<ProjectCardCollection>;
  skillGroupCollection?: Maybe<SkillGroupCollection>;
  skillSetCollection?: Maybe<SkillSetCollection>;
  userInfoCollection?: Maybe<UserInfoCollection>;
};

export type IconLinkingCollectionsBioCardCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<
    Array<InputMaybe<IconLinkingCollectionsBioCardCollectionOrder>>
  >;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type IconLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type IconLinkingCollectionsJobExperienceCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<
    Array<InputMaybe<IconLinkingCollectionsJobExperienceCollectionOrder>>
  >;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type IconLinkingCollectionsMetaPageCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<
    Array<InputMaybe<IconLinkingCollectionsMetaPageCollectionOrder>>
  >;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type IconLinkingCollectionsPageCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<
    Array<InputMaybe<IconLinkingCollectionsPageCollectionOrder>>
  >;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type IconLinkingCollectionsProjectCardCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<
    Array<InputMaybe<IconLinkingCollectionsProjectCardCollectionOrder>>
  >;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type IconLinkingCollectionsSkillGroupCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<
    Array<InputMaybe<IconLinkingCollectionsSkillGroupCollectionOrder>>
  >;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type IconLinkingCollectionsSkillSetCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<
    Array<InputMaybe<IconLinkingCollectionsSkillSetCollectionOrder>>
  >;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type IconLinkingCollectionsUserInfoCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<
    Array<InputMaybe<IconLinkingCollectionsUserInfoCollectionOrder>>
  >;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export enum IconLinkingCollectionsBioCardCollectionOrder {
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
  ValueAsc = "value_ASC",
  ValueDesc = "value_DESC",
}

export enum IconLinkingCollectionsJobExperienceCollectionOrder {
  CompanyAsc = "company_ASC",
  CompanyDesc = "company_DESC",
  CurrentlyWorkingAsc = "currentlyWorking_ASC",
  CurrentlyWorkingDesc = "currentlyWorking_DESC",
  EndDateAsc = "endDate_ASC",
  EndDateDesc = "endDate_DESC",
  LocationAsc = "location_ASC",
  LocationDesc = "location_DESC",
  PositionAsc = "position_ASC",
  PositionDesc = "position_DESC",
  StartDateAsc = "startDate_ASC",
  StartDateDesc = "startDate_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  WorkedRemotelyAsc = "workedRemotely_ASC",
  WorkedRemotelyDesc = "workedRemotely_DESC",
}

export enum IconLinkingCollectionsMetaPageCollectionOrder {
  IsDefaultPageAsc = "isDefaultPage_ASC",
  IsDefaultPageDesc = "isDefaultPage_DESC",
  PageUrlAsc = "pageUrl_ASC",
  PageUrlDesc = "pageUrl_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

export enum IconLinkingCollectionsPageCollectionOrder {
  ContentAnimationAsc = "contentAnimation_ASC",
  ContentAnimationDesc = "contentAnimation_DESC",
  HeadingAnimationAsc = "headingAnimation_ASC",
  HeadingAnimationDesc = "headingAnimation_DESC",
  PathAsc = "path_ASC",
  PathDesc = "path_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

export enum IconLinkingCollectionsProjectCardCollectionOrder {
  DeployedLinkAsc = "deployedLink_ASC",
  DeployedLinkDesc = "deployedLink_DESC",
  DescriptionAsc = "description_ASC",
  DescriptionDesc = "description_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

export enum IconLinkingCollectionsSkillGroupCollectionOrder {
  SkillProgressAsc = "skillProgress_ASC",
  SkillProgressDesc = "skillProgress_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

export enum IconLinkingCollectionsSkillSetCollectionOrder {
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

export enum IconLinkingCollectionsUserInfoCollectionOrder {
  DefaultThemeAsc = "defaultTheme_ASC",
  DefaultThemeDesc = "defaultTheme_DESC",
  NameAsc = "name_ASC",
  NameDesc = "name_DESC",
  RoleAsc = "role_ASC",
  RoleDesc = "role_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
  WithPageChangeButtonAsc = "withPageChangeButton_ASC",
  WithPageChangeButtonDesc = "withPageChangeButton_DESC",
}

export enum IconOrder {
  IconCodeAsc = "iconCode_ASC",
  IconCodeDesc = "iconCode_DESC",
  NameAsc = "name_ASC",
  NameDesc = "name_DESC",
  ShowTooltipAsc = "showTooltip_ASC",
  ShowTooltipDesc = "showTooltip_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
}

export enum ImageFormat {
  /** AVIF image format. */
  Avif = "AVIF",
  /** JPG image format. */
  Jpg = "JPG",
  /**
   * Progressive JPG format stores multiple passes of an image in progressively higher detail.
   *         When a progressive image is loading, the viewer will first see a lower quality pixelated version which
   *         will gradually improve in detail, until the image is fully downloaded. This is to display an image as
   *         early as possible to make the layout look as designed.
   */
  JpgProgressive = "JPG_PROGRESSIVE",
  /** PNG image format */
  Png = "PNG",
  /**
   * 8-bit PNG images support up to 256 colors and weigh less than the standard 24-bit PNG equivalent.
   *         The 8-bit PNG format is mostly used for simple images, such as icons or logos.
   */
  Png8 = "PNG8",
  /** WebP image format. */
  Webp = "WEBP",
}

export enum ImageResizeFocus {
  /** Focus the resizing on the bottom. */
  Bottom = "BOTTOM",
  /** Focus the resizing on the bottom left. */
  BottomLeft = "BOTTOM_LEFT",
  /** Focus the resizing on the bottom right. */
  BottomRight = "BOTTOM_RIGHT",
  /** Focus the resizing on the center. */
  Center = "CENTER",
  /** Focus the resizing on the largest face. */
  Face = "FACE",
  /** Focus the resizing on the area containing all the faces. */
  Faces = "FACES",
  /** Focus the resizing on the left. */
  Left = "LEFT",
  /** Focus the resizing on the right. */
  Right = "RIGHT",
  /** Focus the resizing on the top. */
  Top = "TOP",
  /** Focus the resizing on the top left. */
  TopLeft = "TOP_LEFT",
  /** Focus the resizing on the top right. */
  TopRight = "TOP_RIGHT",
}

export enum ImageResizeStrategy {
  /** Crops a part of the original image to fit into the specified dimensions. */
  Crop = "CROP",
  /** Resizes the image to the specified dimensions, cropping the image if needed. */
  Fill = "FILL",
  /** Resizes the image to fit into the specified dimensions. */
  Fit = "FIT",
  /**
   * Resizes the image to the specified dimensions, padding the image if needed.
   *         Uses desired background color as padding color.
   */
  Pad = "PAD",
  /** Resizes the image to the specified dimensions, changing the original aspect ratio if needed. */
  Scale = "SCALE",
  /** Creates a thumbnail from the image. */
  Thumb = "THUMB",
}

export type ImageTransformOptions = {
  /**
   * Desired background color, used with corner radius or `PAD` resize strategy.
   *         Defaults to transparent (for `PNG`, `PNG8` and `WEBP`) or white (for `JPG` and `JPG_PROGRESSIVE`).
   */
  backgroundColor?: InputMaybe<Scalars["HexColor"]["input"]>;
  /**
   * Desired corner radius in pixels.
   *         Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
   *         Defaults to `0`. Uses desired background color as padding color,
   *         unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
   */
  cornerRadius?: InputMaybe<Scalars["Int"]["input"]>;
  /** Desired image format. Defaults to the original image format. */
  format?: InputMaybe<ImageFormat>;
  /** Desired height in pixels. Defaults to the original image height. */
  height?: InputMaybe<Scalars["Dimension"]["input"]>;
  /**
   * Desired quality of the image in percents.
   *         Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
   */
  quality?: InputMaybe<Scalars["Quality"]["input"]>;
  /** Desired resize focus area. Defaults to `CENTER`. */
  resizeFocus?: InputMaybe<ImageResizeFocus>;
  /** Desired resize strategy. Defaults to `FIT`. */
  resizeStrategy?: InputMaybe<ImageResizeStrategy>;
  /** Desired width in pixels. Defaults to the original image width. */
  width?: InputMaybe<Scalars["Dimension"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/jobExperience) */
export type JobExperience = Entry &
  _Node & {
    __typename?: "JobExperience";
    _id: Scalars["ID"]["output"];
    company?: Maybe<Scalars["String"]["output"]>;
    companyIcon?: Maybe<Icon>;
    contentfulMetadata: ContentfulMetadata;
    currentlyWorking?: Maybe<Scalars["Boolean"]["output"]>;
    description?: Maybe<JobExperienceDescription>;
    durationIcon?: Maybe<Icon>;
    endDate?: Maybe<Scalars["DateTime"]["output"]>;
    linkedFrom?: Maybe<JobExperienceLinkingCollections>;
    location?: Maybe<Scalars["String"]["output"]>;
    locationIcon?: Maybe<Icon>;
    position?: Maybe<Scalars["String"]["output"]>;
    roleIcon?: Maybe<Icon>;
    startDate?: Maybe<Scalars["DateTime"]["output"]>;
    sys: Sys;
    techStack?: Maybe<SkillGroup>;
    techStackIcon?: Maybe<Icon>;
    workedRemotely?: Maybe<Scalars["Boolean"]["output"]>;
  };

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/jobExperience) */
export type JobExperienceCompanyArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/jobExperience) */
export type JobExperienceCompanyIconArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<IconFilter>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/jobExperience) */
export type JobExperienceCurrentlyWorkingArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/jobExperience) */
export type JobExperienceDescriptionArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/jobExperience) */
export type JobExperienceDurationIconArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<IconFilter>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/jobExperience) */
export type JobExperienceEndDateArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/jobExperience) */
export type JobExperienceLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/jobExperience) */
export type JobExperienceLocationArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/jobExperience) */
export type JobExperienceLocationIconArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<IconFilter>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/jobExperience) */
export type JobExperiencePositionArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/jobExperience) */
export type JobExperienceRoleIconArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<IconFilter>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/jobExperience) */
export type JobExperienceStartDateArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/jobExperience) */
export type JobExperienceTechStackArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<SkillGroupFilter>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/jobExperience) */
export type JobExperienceTechStackIconArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<IconFilter>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/jobExperience) */
export type JobExperienceWorkedRemotelyArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type JobExperienceCollection = {
  __typename?: "JobExperienceCollection";
  items: Array<Maybe<JobExperience>>;
  limit: Scalars["Int"]["output"];
  skip: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type JobExperienceDescription = {
  __typename?: "JobExperienceDescription";
  json: Scalars["JSON"]["output"];
  links: JobExperienceDescriptionLinks;
};

export type JobExperienceDescriptionAssets = {
  __typename?: "JobExperienceDescriptionAssets";
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type JobExperienceDescriptionEntries = {
  __typename?: "JobExperienceDescriptionEntries";
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type JobExperienceDescriptionLinks = {
  __typename?: "JobExperienceDescriptionLinks";
  assets: JobExperienceDescriptionAssets;
  entries: JobExperienceDescriptionEntries;
  resources: JobExperienceDescriptionResources;
};

export type JobExperienceDescriptionResources = {
  __typename?: "JobExperienceDescriptionResources";
  block: Array<JobExperienceDescriptionResourcesBlock>;
  hyperlink: Array<JobExperienceDescriptionResourcesHyperlink>;
  inline: Array<JobExperienceDescriptionResourcesInline>;
};

export type JobExperienceDescriptionResourcesBlock = ResourceLink & {
  __typename?: "JobExperienceDescriptionResourcesBlock";
  sys: ResourceSys;
};

export type JobExperienceDescriptionResourcesHyperlink = ResourceLink & {
  __typename?: "JobExperienceDescriptionResourcesHyperlink";
  sys: ResourceSys;
};

export type JobExperienceDescriptionResourcesInline = ResourceLink & {
  __typename?: "JobExperienceDescriptionResourcesInline";
  sys: ResourceSys;
};

export type JobExperienceFilter = {
  AND?: InputMaybe<Array<InputMaybe<JobExperienceFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<JobExperienceFilter>>>;
  company?: InputMaybe<Scalars["String"]["input"]>;
  companyIcon?: InputMaybe<CfIconNestedFilter>;
  companyIcon_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  company_contains?: InputMaybe<Scalars["String"]["input"]>;
  company_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  company_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  company_not?: InputMaybe<Scalars["String"]["input"]>;
  company_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  company_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  currentlyWorking?: InputMaybe<Scalars["Boolean"]["input"]>;
  currentlyWorking_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  currentlyWorking_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  description_contains?: InputMaybe<Scalars["String"]["input"]>;
  description_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  description_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  durationIcon?: InputMaybe<CfIconNestedFilter>;
  durationIcon_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  endDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  endDate_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  endDate_gt?: InputMaybe<Scalars["DateTime"]["input"]>;
  endDate_gte?: InputMaybe<Scalars["DateTime"]["input"]>;
  endDate_in?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  endDate_lt?: InputMaybe<Scalars["DateTime"]["input"]>;
  endDate_lte?: InputMaybe<Scalars["DateTime"]["input"]>;
  endDate_not?: InputMaybe<Scalars["DateTime"]["input"]>;
  endDate_not_in?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  location?: InputMaybe<Scalars["String"]["input"]>;
  locationIcon?: InputMaybe<CfIconNestedFilter>;
  locationIcon_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  location_contains?: InputMaybe<Scalars["String"]["input"]>;
  location_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  location_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  location_not?: InputMaybe<Scalars["String"]["input"]>;
  location_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  location_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  position?: InputMaybe<Scalars["String"]["input"]>;
  position_contains?: InputMaybe<Scalars["String"]["input"]>;
  position_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  position_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  position_not?: InputMaybe<Scalars["String"]["input"]>;
  position_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  position_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  roleIcon?: InputMaybe<CfIconNestedFilter>;
  roleIcon_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  startDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  startDate_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  startDate_gt?: InputMaybe<Scalars["DateTime"]["input"]>;
  startDate_gte?: InputMaybe<Scalars["DateTime"]["input"]>;
  startDate_in?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  startDate_lt?: InputMaybe<Scalars["DateTime"]["input"]>;
  startDate_lte?: InputMaybe<Scalars["DateTime"]["input"]>;
  startDate_not?: InputMaybe<Scalars["DateTime"]["input"]>;
  startDate_not_in?: InputMaybe<
    Array<InputMaybe<Scalars["DateTime"]["input"]>>
  >;
  sys?: InputMaybe<SysFilter>;
  techStack?: InputMaybe<CfSkillGroupNestedFilter>;
  techStackIcon?: InputMaybe<CfIconNestedFilter>;
  techStackIcon_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  techStack_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  workedRemotely?: InputMaybe<Scalars["Boolean"]["input"]>;
  workedRemotely_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  workedRemotely_not?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type JobExperienceLinkingCollections = {
  __typename?: "JobExperienceLinkingCollections";
  centerContentAreaCollectionCollection?: Maybe<CenterContentAreaCollectionCollection>;
  entryCollection?: Maybe<EntryCollection>;
  experiencePageDataCollection?: Maybe<ExperiencePageDataCollection>;
};

export type JobExperienceLinkingCollectionsCenterContentAreaCollectionCollectionArgs =
  {
    limit?: InputMaybe<Scalars["Int"]["input"]>;
    locale?: InputMaybe<Scalars["String"]["input"]>;
    order?: InputMaybe<
      Array<
        InputMaybe<JobExperienceLinkingCollectionsCenterContentAreaCollectionCollectionOrder>
      >
    >;
    preview?: InputMaybe<Scalars["Boolean"]["input"]>;
    skip?: InputMaybe<Scalars["Int"]["input"]>;
    useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  };

export type JobExperienceLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type JobExperienceLinkingCollectionsExperiencePageDataCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<
    Array<
      InputMaybe<JobExperienceLinkingCollectionsExperiencePageDataCollectionOrder>
    >
  >;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export enum JobExperienceLinkingCollectionsCenterContentAreaCollectionCollectionOrder {
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

export enum JobExperienceLinkingCollectionsExperiencePageDataCollectionOrder {
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

export enum JobExperienceOrder {
  CompanyAsc = "company_ASC",
  CompanyDesc = "company_DESC",
  CurrentlyWorkingAsc = "currentlyWorking_ASC",
  CurrentlyWorkingDesc = "currentlyWorking_DESC",
  EndDateAsc = "endDate_ASC",
  EndDateDesc = "endDate_DESC",
  LocationAsc = "location_ASC",
  LocationDesc = "location_DESC",
  PositionAsc = "position_ASC",
  PositionDesc = "position_DESC",
  StartDateAsc = "startDate_ASC",
  StartDateDesc = "startDate_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  WorkedRemotelyAsc = "workedRemotely_ASC",
  WorkedRemotelyDesc = "workedRemotely_DESC",
}

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/layoutSettings) */
export type LayoutSettings = Entry &
  _Node & {
    __typename?: "LayoutSettings";
    _id: Scalars["ID"]["output"];
    contentfulMetadata: ContentfulMetadata;
    drawerSide?: Maybe<Scalars["String"]["output"]>;
    drawerVariant?: Maybe<Scalars["String"]["output"]>;
    linkedFrom?: Maybe<LayoutSettingsLinkingCollections>;
    sys: Sys;
    title?: Maybe<Scalars["String"]["output"]>;
  };

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/layoutSettings) */
export type LayoutSettingsDrawerSideArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/layoutSettings) */
export type LayoutSettingsDrawerVariantArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/layoutSettings) */
export type LayoutSettingsLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/layoutSettings) */
export type LayoutSettingsTitleArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type LayoutSettingsCollection = {
  __typename?: "LayoutSettingsCollection";
  items: Array<Maybe<LayoutSettings>>;
  limit: Scalars["Int"]["output"];
  skip: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type LayoutSettingsFilter = {
  AND?: InputMaybe<Array<InputMaybe<LayoutSettingsFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<LayoutSettingsFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  drawerSide?: InputMaybe<Scalars["String"]["input"]>;
  drawerSide_contains?: InputMaybe<Scalars["String"]["input"]>;
  drawerSide_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  drawerSide_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  drawerSide_not?: InputMaybe<Scalars["String"]["input"]>;
  drawerSide_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  drawerSide_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  drawerVariant?: InputMaybe<Scalars["String"]["input"]>;
  drawerVariant_contains?: InputMaybe<Scalars["String"]["input"]>;
  drawerVariant_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  drawerVariant_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  drawerVariant_not?: InputMaybe<Scalars["String"]["input"]>;
  drawerVariant_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  drawerVariant_not_in?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  title_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  title_not?: InputMaybe<Scalars["String"]["input"]>;
  title_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type LayoutSettingsLinkingCollections = {
  __typename?: "LayoutSettingsLinkingCollections";
  entryCollection?: Maybe<EntryCollection>;
  userInfoCollection?: Maybe<UserInfoCollection>;
};

export type LayoutSettingsLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type LayoutSettingsLinkingCollectionsUserInfoCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<
    Array<InputMaybe<LayoutSettingsLinkingCollectionsUserInfoCollectionOrder>>
  >;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export enum LayoutSettingsLinkingCollectionsUserInfoCollectionOrder {
  DefaultThemeAsc = "defaultTheme_ASC",
  DefaultThemeDesc = "defaultTheme_DESC",
  NameAsc = "name_ASC",
  NameDesc = "name_DESC",
  RoleAsc = "role_ASC",
  RoleDesc = "role_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
  WithPageChangeButtonAsc = "withPageChangeButton_ASC",
  WithPageChangeButtonDesc = "withPageChangeButton_DESC",
}

export enum LayoutSettingsOrder {
  DrawerSideAsc = "drawerSide_ASC",
  DrawerSideDesc = "drawerSide_DESC",
  DrawerVariantAsc = "drawerVariant_ASC",
  DrawerVariantDesc = "drawerVariant_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/metaPage) */
export type MetaPage = Entry &
  _Node & {
    __typename?: "MetaPage";
    _id: Scalars["ID"]["output"];
    contentfulMetadata: ContentfulMetadata;
    isDefaultPage?: Maybe<Scalars["Boolean"]["output"]>;
    linkedFrom?: Maybe<MetaPageLinkingCollections>;
    pageIcon?: Maybe<Icon>;
    pageUrl?: Maybe<Scalars["String"]["output"]>;
    sys: Sys;
    title?: Maybe<Scalars["String"]["output"]>;
  };

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/metaPage) */
export type MetaPageIsDefaultPageArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/metaPage) */
export type MetaPageLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/metaPage) */
export type MetaPagePageIconArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<IconFilter>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/metaPage) */
export type MetaPagePageUrlArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/metaPage) */
export type MetaPageTitleArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type MetaPageCollection = {
  __typename?: "MetaPageCollection";
  items: Array<Maybe<MetaPage>>;
  limit: Scalars["Int"]["output"];
  skip: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type MetaPageFilter = {
  AND?: InputMaybe<Array<InputMaybe<MetaPageFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<MetaPageFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  isDefaultPage?: InputMaybe<Scalars["Boolean"]["input"]>;
  isDefaultPage_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  isDefaultPage_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  pageIcon?: InputMaybe<CfIconNestedFilter>;
  pageIcon_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  pageUrl?: InputMaybe<Scalars["String"]["input"]>;
  pageUrl_contains?: InputMaybe<Scalars["String"]["input"]>;
  pageUrl_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  pageUrl_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  pageUrl_not?: InputMaybe<Scalars["String"]["input"]>;
  pageUrl_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  pageUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  title_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  title_not?: InputMaybe<Scalars["String"]["input"]>;
  title_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type MetaPageLinkingCollections = {
  __typename?: "MetaPageLinkingCollections";
  entryCollection?: Maybe<EntryCollection>;
  userInfoCollection?: Maybe<UserInfoCollection>;
};

export type MetaPageLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type MetaPageLinkingCollectionsUserInfoCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<
    Array<InputMaybe<MetaPageLinkingCollectionsUserInfoCollectionOrder>>
  >;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export enum MetaPageLinkingCollectionsUserInfoCollectionOrder {
  DefaultThemeAsc = "defaultTheme_ASC",
  DefaultThemeDesc = "defaultTheme_DESC",
  NameAsc = "name_ASC",
  NameDesc = "name_DESC",
  RoleAsc = "role_ASC",
  RoleDesc = "role_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
  WithPageChangeButtonAsc = "withPageChangeButton_ASC",
  WithPageChangeButtonDesc = "withPageChangeButton_DESC",
}

export enum MetaPageOrder {
  IsDefaultPageAsc = "isDefaultPage_ASC",
  IsDefaultPageDesc = "isDefaultPage_DESC",
  PageUrlAsc = "pageUrl_ASC",
  PageUrlDesc = "pageUrl_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/page) */
export type Page = Entry &
  _Node & {
    __typename?: "Page";
    _id: Scalars["ID"]["output"];
    contentAnimation?: Maybe<Scalars["String"]["output"]>;
    contentfulMetadata: ContentfulMetadata;
    headingAnimation?: Maybe<Scalars["String"]["output"]>;
    linkedFrom?: Maybe<PageLinkingCollections>;
    pageData?: Maybe<PagePageData>;
    pageIcon?: Maybe<Icon>;
    pageSeo?: Maybe<SeoData>;
    path?: Maybe<Scalars["String"]["output"]>;
    sys: Sys;
    title?: Maybe<Scalars["String"]["output"]>;
  };

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/page) */
export type PageContentAnimationArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/page) */
export type PageHeadingAnimationArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/page) */
export type PageLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/page) */
export type PagePageDataArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/page) */
export type PagePageIconArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<IconFilter>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/page) */
export type PagePageSeoArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<SeoDataFilter>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/page) */
export type PagePathArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/page) */
export type PageTitleArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type PageCollection = {
  __typename?: "PageCollection";
  items: Array<Maybe<Page>>;
  limit: Scalars["Int"]["output"];
  skip: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type PageFilter = {
  AND?: InputMaybe<Array<InputMaybe<PageFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PageFilter>>>;
  contentAnimation?: InputMaybe<Scalars["String"]["input"]>;
  contentAnimation_contains?: InputMaybe<Scalars["String"]["input"]>;
  contentAnimation_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  contentAnimation_in?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  contentAnimation_not?: InputMaybe<Scalars["String"]["input"]>;
  contentAnimation_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  contentAnimation_not_in?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  headingAnimation?: InputMaybe<Scalars["String"]["input"]>;
  headingAnimation_contains?: InputMaybe<Scalars["String"]["input"]>;
  headingAnimation_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  headingAnimation_in?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  headingAnimation_not?: InputMaybe<Scalars["String"]["input"]>;
  headingAnimation_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  headingAnimation_not_in?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  pageData_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  pageIcon?: InputMaybe<CfIconNestedFilter>;
  pageIcon_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  pageSeo?: InputMaybe<CfSeoDataNestedFilter>;
  pageSeo_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  path?: InputMaybe<Scalars["String"]["input"]>;
  path_contains?: InputMaybe<Scalars["String"]["input"]>;
  path_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  path_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  path_not?: InputMaybe<Scalars["String"]["input"]>;
  path_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  path_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  title_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  title_not?: InputMaybe<Scalars["String"]["input"]>;
  title_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type PageLinkingCollections = {
  __typename?: "PageLinkingCollections";
  entryCollection?: Maybe<EntryCollection>;
  userInfoCollection?: Maybe<UserInfoCollection>;
};

export type PageLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type PageLinkingCollectionsUserInfoCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<
    Array<InputMaybe<PageLinkingCollectionsUserInfoCollectionOrder>>
  >;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export enum PageLinkingCollectionsUserInfoCollectionOrder {
  DefaultThemeAsc = "defaultTheme_ASC",
  DefaultThemeDesc = "defaultTheme_DESC",
  NameAsc = "name_ASC",
  NameDesc = "name_DESC",
  RoleAsc = "role_ASC",
  RoleDesc = "role_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
  WithPageChangeButtonAsc = "withPageChangeButton_ASC",
  WithPageChangeButtonDesc = "withPageChangeButton_DESC",
}

export enum PageOrder {
  ContentAnimationAsc = "contentAnimation_ASC",
  ContentAnimationDesc = "contentAnimation_DESC",
  HeadingAnimationAsc = "headingAnimation_ASC",
  HeadingAnimationDesc = "headingAnimation_DESC",
  PathAsc = "path_ASC",
  PathDesc = "path_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

export type PagePageData =
  | ExperiencePageData
  | HomePageData
  | ProjectsPageData
  | SkillsPageData;

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/projectCard) */
export type ProjectCard = Entry &
  _Node & {
    __typename?: "ProjectCard";
    _id: Scalars["ID"]["output"];
    contentfulMetadata: ContentfulMetadata;
    deployedLink?: Maybe<Scalars["String"]["output"]>;
    deployedLinkIcon?: Maybe<Icon>;
    description?: Maybe<Scalars["String"]["output"]>;
    linkedFrom?: Maybe<ProjectCardLinkingCollections>;
    sys: Sys;
    thumbnail?: Maybe<Asset>;
    title?: Maybe<Scalars["String"]["output"]>;
  };

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/projectCard) */
export type ProjectCardDeployedLinkArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/projectCard) */
export type ProjectCardDeployedLinkIconArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<IconFilter>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/projectCard) */
export type ProjectCardDescriptionArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/projectCard) */
export type ProjectCardLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/projectCard) */
export type ProjectCardThumbnailArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/projectCard) */
export type ProjectCardTitleArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type ProjectCardCollection = {
  __typename?: "ProjectCardCollection";
  items: Array<Maybe<ProjectCard>>;
  limit: Scalars["Int"]["output"];
  skip: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type ProjectCardFilter = {
  AND?: InputMaybe<Array<InputMaybe<ProjectCardFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ProjectCardFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  deployedLink?: InputMaybe<Scalars["String"]["input"]>;
  deployedLinkIcon?: InputMaybe<CfIconNestedFilter>;
  deployedLinkIcon_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  deployedLink_contains?: InputMaybe<Scalars["String"]["input"]>;
  deployedLink_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  deployedLink_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  deployedLink_not?: InputMaybe<Scalars["String"]["input"]>;
  deployedLink_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  deployedLink_not_in?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  description?: InputMaybe<Scalars["String"]["input"]>;
  description_contains?: InputMaybe<Scalars["String"]["input"]>;
  description_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  description_not?: InputMaybe<Scalars["String"]["input"]>;
  description_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  description_not_in?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  sys?: InputMaybe<SysFilter>;
  thumbnail_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  title_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  title_not?: InputMaybe<Scalars["String"]["input"]>;
  title_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ProjectCardLinkingCollections = {
  __typename?: "ProjectCardLinkingCollections";
  centerContentAreaCollectionCollection?: Maybe<CenterContentAreaCollectionCollection>;
  entryCollection?: Maybe<EntryCollection>;
  projectsPageDataCollection?: Maybe<ProjectsPageDataCollection>;
};

export type ProjectCardLinkingCollectionsCenterContentAreaCollectionCollectionArgs =
  {
    limit?: InputMaybe<Scalars["Int"]["input"]>;
    locale?: InputMaybe<Scalars["String"]["input"]>;
    order?: InputMaybe<
      Array<
        InputMaybe<ProjectCardLinkingCollectionsCenterContentAreaCollectionCollectionOrder>
      >
    >;
    preview?: InputMaybe<Scalars["Boolean"]["input"]>;
    skip?: InputMaybe<Scalars["Int"]["input"]>;
    useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  };

export type ProjectCardLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type ProjectCardLinkingCollectionsProjectsPageDataCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<
    Array<
      InputMaybe<ProjectCardLinkingCollectionsProjectsPageDataCollectionOrder>
    >
  >;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export enum ProjectCardLinkingCollectionsCenterContentAreaCollectionCollectionOrder {
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

export enum ProjectCardLinkingCollectionsProjectsPageDataCollectionOrder {
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

export enum ProjectCardOrder {
  DeployedLinkAsc = "deployedLink_ASC",
  DeployedLinkDesc = "deployedLink_DESC",
  DescriptionAsc = "description_ASC",
  DescriptionDesc = "description_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/projectsPageData) */
export type ProjectsPageData = Entry &
  _Node & {
    __typename?: "ProjectsPageData";
    _id: Scalars["ID"]["output"];
    contentfulMetadata: ContentfulMetadata;
    linkedFrom?: Maybe<ProjectsPageDataLinkingCollections>;
    projectsCollection?: Maybe<ProjectsPageDataProjectsCollection>;
    sys: Sys;
    title?: Maybe<Scalars["String"]["output"]>;
  };

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/projectsPageData) */
export type ProjectsPageDataLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/projectsPageData) */
export type ProjectsPageDataProjectsCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<
    Array<InputMaybe<ProjectsPageDataProjectsCollectionOrder>>
  >;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<ProjectCardFilter>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/projectsPageData) */
export type ProjectsPageDataTitleArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type ProjectsPageDataCollection = {
  __typename?: "ProjectsPageDataCollection";
  items: Array<Maybe<ProjectsPageData>>;
  limit: Scalars["Int"]["output"];
  skip: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type ProjectsPageDataFilter = {
  AND?: InputMaybe<Array<InputMaybe<ProjectsPageDataFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ProjectsPageDataFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  projects?: InputMaybe<CfProjectCardNestedFilter>;
  projectsCollection_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  title_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  title_not?: InputMaybe<Scalars["String"]["input"]>;
  title_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type ProjectsPageDataLinkingCollections = {
  __typename?: "ProjectsPageDataLinkingCollections";
  entryCollection?: Maybe<EntryCollection>;
  pageCollection?: Maybe<PageCollection>;
};

export type ProjectsPageDataLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type ProjectsPageDataLinkingCollectionsPageCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<
    Array<InputMaybe<ProjectsPageDataLinkingCollectionsPageCollectionOrder>>
  >;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export enum ProjectsPageDataLinkingCollectionsPageCollectionOrder {
  ContentAnimationAsc = "contentAnimation_ASC",
  ContentAnimationDesc = "contentAnimation_DESC",
  HeadingAnimationAsc = "headingAnimation_ASC",
  HeadingAnimationDesc = "headingAnimation_DESC",
  PathAsc = "path_ASC",
  PathDesc = "path_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

export enum ProjectsPageDataOrder {
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

export type ProjectsPageDataProjectsCollection = {
  __typename?: "ProjectsPageDataProjectsCollection";
  items: Array<Maybe<ProjectCard>>;
  limit: Scalars["Int"]["output"];
  skip: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export enum ProjectsPageDataProjectsCollectionOrder {
  DeployedLinkAsc = "deployedLink_ASC",
  DeployedLinkDesc = "deployedLink_DESC",
  DescriptionAsc = "description_ASC",
  DescriptionDesc = "description_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

export type Query = {
  __typename?: "Query";
  _node?: Maybe<_Node>;
  _nodes: Array<Maybe<_Node>>;
  asset?: Maybe<Asset>;
  assetCollection?: Maybe<AssetCollection>;
  banner?: Maybe<Banner>;
  bannerCollection?: Maybe<BannerCollection>;
  bioCard?: Maybe<BioCard>;
  bioCardCollection?: Maybe<BioCardCollection>;
  centerContentAreaCollection?: Maybe<CenterContentAreaCollection>;
  centerContentAreaCollectionCollection?: Maybe<CenterContentAreaCollectionCollection>;
  entryCollection?: Maybe<EntryCollection>;
  experiencePageData?: Maybe<ExperiencePageData>;
  experiencePageDataCollection?: Maybe<ExperiencePageDataCollection>;
  homePageData?: Maybe<HomePageData>;
  homePageDataCollection?: Maybe<HomePageDataCollection>;
  icon?: Maybe<Icon>;
  iconCollection?: Maybe<IconCollection>;
  jobExperience?: Maybe<JobExperience>;
  jobExperienceCollection?: Maybe<JobExperienceCollection>;
  layoutSettings?: Maybe<LayoutSettings>;
  layoutSettingsCollection?: Maybe<LayoutSettingsCollection>;
  metaPage?: Maybe<MetaPage>;
  metaPageCollection?: Maybe<MetaPageCollection>;
  page?: Maybe<Page>;
  pageCollection?: Maybe<PageCollection>;
  projectCard?: Maybe<ProjectCard>;
  projectCardCollection?: Maybe<ProjectCardCollection>;
  projectsPageData?: Maybe<ProjectsPageData>;
  projectsPageDataCollection?: Maybe<ProjectsPageDataCollection>;
  seoData?: Maybe<SeoData>;
  seoDataCollection?: Maybe<SeoDataCollection>;
  skillGroup?: Maybe<SkillGroup>;
  skillGroupCollection?: Maybe<SkillGroupCollection>;
  skillSet?: Maybe<SkillSet>;
  skillSetCollection?: Maybe<SkillSetCollection>;
  skillsPageData?: Maybe<SkillsPageData>;
  skillsPageDataCollection?: Maybe<SkillsPageDataCollection>;
  userInfo?: Maybe<UserInfo>;
  userInfoCollection?: Maybe<UserInfoCollection>;
};

export type Query_NodeArgs = {
  id: Scalars["ID"]["input"];
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type Query_NodesArgs = {
  ids: Array<Scalars["ID"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type QueryAssetArgs = {
  id: Scalars["String"]["input"];
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type QueryAssetCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<Array<InputMaybe<AssetOrder>>>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<AssetFilter>;
};

export type QueryBannerArgs = {
  id: Scalars["String"]["input"];
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type QueryBannerCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<Array<InputMaybe<BannerOrder>>>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<BannerFilter>;
};

export type QueryBioCardArgs = {
  id: Scalars["String"]["input"];
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type QueryBioCardCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<Array<InputMaybe<BioCardOrder>>>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<BioCardFilter>;
};

export type QueryCenterContentAreaCollectionArgs = {
  id: Scalars["String"]["input"];
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type QueryCenterContentAreaCollectionCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<Array<InputMaybe<CenterContentAreaCollectionOrder>>>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<CenterContentAreaCollectionFilter>;
};

export type QueryEntryCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<Array<InputMaybe<EntryOrder>>>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<EntryFilter>;
};

export type QueryExperiencePageDataArgs = {
  id: Scalars["String"]["input"];
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type QueryExperiencePageDataCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<Array<InputMaybe<ExperiencePageDataOrder>>>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<ExperiencePageDataFilter>;
};

export type QueryHomePageDataArgs = {
  id: Scalars["String"]["input"];
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type QueryHomePageDataCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<Array<InputMaybe<HomePageDataOrder>>>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<HomePageDataFilter>;
};

export type QueryIconArgs = {
  id: Scalars["String"]["input"];
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type QueryIconCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<Array<InputMaybe<IconOrder>>>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<IconFilter>;
};

export type QueryJobExperienceArgs = {
  id: Scalars["String"]["input"];
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type QueryJobExperienceCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<Array<InputMaybe<JobExperienceOrder>>>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<JobExperienceFilter>;
};

export type QueryLayoutSettingsArgs = {
  id: Scalars["String"]["input"];
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type QueryLayoutSettingsCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<Array<InputMaybe<LayoutSettingsOrder>>>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<LayoutSettingsFilter>;
};

export type QueryMetaPageArgs = {
  id: Scalars["String"]["input"];
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type QueryMetaPageCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<Array<InputMaybe<MetaPageOrder>>>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<MetaPageFilter>;
};

export type QueryPageArgs = {
  id: Scalars["String"]["input"];
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type QueryPageCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<Array<InputMaybe<PageOrder>>>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<PageFilter>;
};

export type QueryProjectCardArgs = {
  id: Scalars["String"]["input"];
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type QueryProjectCardCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<Array<InputMaybe<ProjectCardOrder>>>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<ProjectCardFilter>;
};

export type QueryProjectsPageDataArgs = {
  id: Scalars["String"]["input"];
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type QueryProjectsPageDataCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<Array<InputMaybe<ProjectsPageDataOrder>>>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<ProjectsPageDataFilter>;
};

export type QuerySeoDataArgs = {
  id: Scalars["String"]["input"];
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type QuerySeoDataCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<Array<InputMaybe<SeoDataOrder>>>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<SeoDataFilter>;
};

export type QuerySkillGroupArgs = {
  id: Scalars["String"]["input"];
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type QuerySkillGroupCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<Array<InputMaybe<SkillGroupOrder>>>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<SkillGroupFilter>;
};

export type QuerySkillSetArgs = {
  id: Scalars["String"]["input"];
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type QuerySkillSetCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<Array<InputMaybe<SkillSetOrder>>>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<SkillSetFilter>;
};

export type QuerySkillsPageDataArgs = {
  id: Scalars["String"]["input"];
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type QuerySkillsPageDataCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<Array<InputMaybe<SkillsPageDataOrder>>>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<SkillsPageDataFilter>;
};

export type QueryUserInfoArgs = {
  id: Scalars["String"]["input"];
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type QueryUserInfoCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<Array<InputMaybe<UserInfoOrder>>>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<UserInfoFilter>;
};

export type ResourceLink = {
  sys: ResourceSys;
};

export type ResourceSys = {
  __typename?: "ResourceSys";
  linkType: Scalars["String"]["output"];
  urn: Scalars["String"]["output"];
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/seoData) */
export type SeoData = Entry &
  _Node & {
    __typename?: "SeoData";
    _id: Scalars["ID"]["output"];
    contentfulMetadata: ContentfulMetadata;
    countryName?: Maybe<Scalars["String"]["output"]>;
    creator?: Maybe<Scalars["String"]["output"]>;
    description?: Maybe<Scalars["String"]["output"]>;
    favicon?: Maybe<Asset>;
    imagesCollection?: Maybe<AssetCollection>;
    keywords?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
    linkedFrom?: Maybe<SeoDataLinkingCollections>;
    publisher?: Maybe<Scalars["String"]["output"]>;
    siteName?: Maybe<Scalars["String"]["output"]>;
    sys: Sys;
    title?: Maybe<Scalars["String"]["output"]>;
    url?: Maybe<Scalars["String"]["output"]>;
  };

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/seoData) */
export type SeoDataCountryNameArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/seoData) */
export type SeoDataCreatorArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/seoData) */
export type SeoDataDescriptionArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/seoData) */
export type SeoDataFaviconArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/seoData) */
export type SeoDataImagesCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/seoData) */
export type SeoDataKeywordsArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/seoData) */
export type SeoDataLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/seoData) */
export type SeoDataPublisherArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/seoData) */
export type SeoDataSiteNameArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/seoData) */
export type SeoDataTitleArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/seoData) */
export type SeoDataUrlArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type SeoDataCollection = {
  __typename?: "SeoDataCollection";
  items: Array<Maybe<SeoData>>;
  limit: Scalars["Int"]["output"];
  skip: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type SeoDataFilter = {
  AND?: InputMaybe<Array<InputMaybe<SeoDataFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<SeoDataFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  countryName?: InputMaybe<Scalars["String"]["input"]>;
  countryName_contains?: InputMaybe<Scalars["String"]["input"]>;
  countryName_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  countryName_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  countryName_not?: InputMaybe<Scalars["String"]["input"]>;
  countryName_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  countryName_not_in?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  creator?: InputMaybe<Scalars["String"]["input"]>;
  creator_contains?: InputMaybe<Scalars["String"]["input"]>;
  creator_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  creator_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  creator_not?: InputMaybe<Scalars["String"]["input"]>;
  creator_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  creator_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  description_contains?: InputMaybe<Scalars["String"]["input"]>;
  description_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  description_not?: InputMaybe<Scalars["String"]["input"]>;
  description_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  description_not_in?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  favicon_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  imagesCollection_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  keywords_contains_all?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  keywords_contains_none?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  keywords_contains_some?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  keywords_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  publisher?: InputMaybe<Scalars["String"]["input"]>;
  publisher_contains?: InputMaybe<Scalars["String"]["input"]>;
  publisher_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  publisher_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  publisher_not?: InputMaybe<Scalars["String"]["input"]>;
  publisher_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  publisher_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  siteName?: InputMaybe<Scalars["String"]["input"]>;
  siteName_contains?: InputMaybe<Scalars["String"]["input"]>;
  siteName_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  siteName_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  siteName_not?: InputMaybe<Scalars["String"]["input"]>;
  siteName_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  siteName_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  title_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  title_not?: InputMaybe<Scalars["String"]["input"]>;
  title_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  url?: InputMaybe<Scalars["String"]["input"]>;
  url_contains?: InputMaybe<Scalars["String"]["input"]>;
  url_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  url_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  url_not?: InputMaybe<Scalars["String"]["input"]>;
  url_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type SeoDataLinkingCollections = {
  __typename?: "SeoDataLinkingCollections";
  entryCollection?: Maybe<EntryCollection>;
  pageCollection?: Maybe<PageCollection>;
};

export type SeoDataLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type SeoDataLinkingCollectionsPageCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<
    Array<InputMaybe<SeoDataLinkingCollectionsPageCollectionOrder>>
  >;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export enum SeoDataLinkingCollectionsPageCollectionOrder {
  ContentAnimationAsc = "contentAnimation_ASC",
  ContentAnimationDesc = "contentAnimation_DESC",
  HeadingAnimationAsc = "headingAnimation_ASC",
  HeadingAnimationDesc = "headingAnimation_DESC",
  PathAsc = "path_ASC",
  PathDesc = "path_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

export enum SeoDataOrder {
  CountryNameAsc = "countryName_ASC",
  CountryNameDesc = "countryName_DESC",
  CreatorAsc = "creator_ASC",
  CreatorDesc = "creator_DESC",
  DescriptionAsc = "description_ASC",
  DescriptionDesc = "description_DESC",
  PublisherAsc = "publisher_ASC",
  PublisherDesc = "publisher_DESC",
  SiteNameAsc = "siteName_ASC",
  SiteNameDesc = "siteName_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
  UrlAsc = "url_ASC",
  UrlDesc = "url_DESC",
}

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/skillGroup) */
export type SkillGroup = Entry &
  _Node & {
    __typename?: "SkillGroup";
    _id: Scalars["ID"]["output"];
    contentfulMetadata: ContentfulMetadata;
    linkedFrom?: Maybe<SkillGroupLinkingCollections>;
    skillIconsCollection?: Maybe<SkillGroupSkillIconsCollection>;
    skillProgress?: Maybe<Scalars["Int"]["output"]>;
    sys: Sys;
    title?: Maybe<Scalars["String"]["output"]>;
  };

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/skillGroup) */
export type SkillGroupLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/skillGroup) */
export type SkillGroupSkillIconsCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<Array<InputMaybe<SkillGroupSkillIconsCollectionOrder>>>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<IconFilter>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/skillGroup) */
export type SkillGroupSkillProgressArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/skillGroup) */
export type SkillGroupTitleArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type SkillGroupCollection = {
  __typename?: "SkillGroupCollection";
  items: Array<Maybe<SkillGroup>>;
  limit: Scalars["Int"]["output"];
  skip: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type SkillGroupFilter = {
  AND?: InputMaybe<Array<InputMaybe<SkillGroupFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<SkillGroupFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  skillIcons?: InputMaybe<CfIconNestedFilter>;
  skillIconsCollection_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  skillProgress?: InputMaybe<Scalars["Int"]["input"]>;
  skillProgress_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  skillProgress_gt?: InputMaybe<Scalars["Int"]["input"]>;
  skillProgress_gte?: InputMaybe<Scalars["Int"]["input"]>;
  skillProgress_in?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  skillProgress_lt?: InputMaybe<Scalars["Int"]["input"]>;
  skillProgress_lte?: InputMaybe<Scalars["Int"]["input"]>;
  skillProgress_not?: InputMaybe<Scalars["Int"]["input"]>;
  skillProgress_not_in?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  title_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  title_not?: InputMaybe<Scalars["String"]["input"]>;
  title_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type SkillGroupLinkingCollections = {
  __typename?: "SkillGroupLinkingCollections";
  entryCollection?: Maybe<EntryCollection>;
  jobExperienceCollection?: Maybe<JobExperienceCollection>;
  skillSetCollection?: Maybe<SkillSetCollection>;
};

export type SkillGroupLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type SkillGroupLinkingCollectionsJobExperienceCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<
    Array<InputMaybe<SkillGroupLinkingCollectionsJobExperienceCollectionOrder>>
  >;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type SkillGroupLinkingCollectionsSkillSetCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<
    Array<InputMaybe<SkillGroupLinkingCollectionsSkillSetCollectionOrder>>
  >;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export enum SkillGroupLinkingCollectionsJobExperienceCollectionOrder {
  CompanyAsc = "company_ASC",
  CompanyDesc = "company_DESC",
  CurrentlyWorkingAsc = "currentlyWorking_ASC",
  CurrentlyWorkingDesc = "currentlyWorking_DESC",
  EndDateAsc = "endDate_ASC",
  EndDateDesc = "endDate_DESC",
  LocationAsc = "location_ASC",
  LocationDesc = "location_DESC",
  PositionAsc = "position_ASC",
  PositionDesc = "position_DESC",
  StartDateAsc = "startDate_ASC",
  StartDateDesc = "startDate_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  WorkedRemotelyAsc = "workedRemotely_ASC",
  WorkedRemotelyDesc = "workedRemotely_DESC",
}

export enum SkillGroupLinkingCollectionsSkillSetCollectionOrder {
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

export enum SkillGroupOrder {
  SkillProgressAsc = "skillProgress_ASC",
  SkillProgressDesc = "skillProgress_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

export type SkillGroupSkillIconsCollection = {
  __typename?: "SkillGroupSkillIconsCollection";
  items: Array<Maybe<Icon>>;
  limit: Scalars["Int"]["output"];
  skip: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export enum SkillGroupSkillIconsCollectionOrder {
  IconCodeAsc = "iconCode_ASC",
  IconCodeDesc = "iconCode_DESC",
  NameAsc = "name_ASC",
  NameDesc = "name_DESC",
  ShowTooltipAsc = "showTooltip_ASC",
  ShowTooltipDesc = "showTooltip_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
}

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/skillSet) */
export type SkillSet = Entry &
  _Node & {
    __typename?: "SkillSet";
    _id: Scalars["ID"]["output"];
    contentfulMetadata: ContentfulMetadata;
    icon?: Maybe<Icon>;
    linkedFrom?: Maybe<SkillSetLinkingCollections>;
    skillsArrayCollection?: Maybe<SkillSetSkillsArrayCollection>;
    skillsetIcon?: Maybe<Asset>;
    sys: Sys;
    title?: Maybe<Scalars["String"]["output"]>;
  };

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/skillSet) */
export type SkillSetIconArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<IconFilter>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/skillSet) */
export type SkillSetLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/skillSet) */
export type SkillSetSkillsArrayCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<Array<InputMaybe<SkillSetSkillsArrayCollectionOrder>>>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<SkillGroupFilter>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/skillSet) */
export type SkillSetSkillsetIconArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/skillSet) */
export type SkillSetTitleArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type SkillSetCollection = {
  __typename?: "SkillSetCollection";
  items: Array<Maybe<SkillSet>>;
  limit: Scalars["Int"]["output"];
  skip: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type SkillSetFilter = {
  AND?: InputMaybe<Array<InputMaybe<SkillSetFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<SkillSetFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  icon?: InputMaybe<CfIconNestedFilter>;
  icon_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  skillsArray?: InputMaybe<CfSkillGroupNestedFilter>;
  skillsArrayCollection_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  skillsetIcon_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  title_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  title_not?: InputMaybe<Scalars["String"]["input"]>;
  title_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type SkillSetLinkingCollections = {
  __typename?: "SkillSetLinkingCollections";
  entryCollection?: Maybe<EntryCollection>;
  skillsPageDataCollection?: Maybe<SkillsPageDataCollection>;
};

export type SkillSetLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type SkillSetLinkingCollectionsSkillsPageDataCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<
    Array<InputMaybe<SkillSetLinkingCollectionsSkillsPageDataCollectionOrder>>
  >;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export enum SkillSetLinkingCollectionsSkillsPageDataCollectionOrder {
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

export enum SkillSetOrder {
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

export type SkillSetSkillsArrayCollection = {
  __typename?: "SkillSetSkillsArrayCollection";
  items: Array<Maybe<SkillGroup>>;
  limit: Scalars["Int"]["output"];
  skip: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export enum SkillSetSkillsArrayCollectionOrder {
  SkillProgressAsc = "skillProgress_ASC",
  SkillProgressDesc = "skillProgress_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/skillsPageData) */
export type SkillsPageData = Entry &
  _Node & {
    __typename?: "SkillsPageData";
    _id: Scalars["ID"]["output"];
    contentfulMetadata: ContentfulMetadata;
    linkedFrom?: Maybe<SkillsPageDataLinkingCollections>;
    skillsSetCollection?: Maybe<SkillsPageDataSkillsSetCollection>;
    sys: Sys;
    title?: Maybe<Scalars["String"]["output"]>;
  };

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/skillsPageData) */
export type SkillsPageDataLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/skillsPageData) */
export type SkillsPageDataSkillsSetCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<Array<InputMaybe<SkillsPageDataSkillsSetCollectionOrder>>>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<SkillSetFilter>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/skillsPageData) */
export type SkillsPageDataTitleArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type SkillsPageDataCollection = {
  __typename?: "SkillsPageDataCollection";
  items: Array<Maybe<SkillsPageData>>;
  limit: Scalars["Int"]["output"];
  skip: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type SkillsPageDataFilter = {
  AND?: InputMaybe<Array<InputMaybe<SkillsPageDataFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<SkillsPageDataFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  skillsSet?: InputMaybe<CfSkillSetNestedFilter>;
  skillsSetCollection_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  title_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  title_not?: InputMaybe<Scalars["String"]["input"]>;
  title_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type SkillsPageDataLinkingCollections = {
  __typename?: "SkillsPageDataLinkingCollections";
  entryCollection?: Maybe<EntryCollection>;
  pageCollection?: Maybe<PageCollection>;
};

export type SkillsPageDataLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type SkillsPageDataLinkingCollectionsPageCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<
    Array<InputMaybe<SkillsPageDataLinkingCollectionsPageCollectionOrder>>
  >;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export enum SkillsPageDataLinkingCollectionsPageCollectionOrder {
  ContentAnimationAsc = "contentAnimation_ASC",
  ContentAnimationDesc = "contentAnimation_DESC",
  HeadingAnimationAsc = "headingAnimation_ASC",
  HeadingAnimationDesc = "headingAnimation_DESC",
  PathAsc = "path_ASC",
  PathDesc = "path_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

export enum SkillsPageDataOrder {
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

export type SkillsPageDataSkillsSetCollection = {
  __typename?: "SkillsPageDataSkillsSetCollection";
  items: Array<Maybe<SkillSet>>;
  limit: Scalars["Int"]["output"];
  skip: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export enum SkillsPageDataSkillsSetCollectionOrder {
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

export type Sys = {
  __typename?: "Sys";
  environmentId: Scalars["String"]["output"];
  firstPublishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  id: Scalars["String"]["output"];
  /** The locale that was requested. */
  locale?: Maybe<Scalars["String"]["output"]>;
  publishedAt?: Maybe<Scalars["DateTime"]["output"]>;
  publishedVersion?: Maybe<Scalars["Int"]["output"]>;
  spaceId: Scalars["String"]["output"];
};

export type SysFilter = {
  firstPublishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  firstPublishedAt_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  firstPublishedAt_gt?: InputMaybe<Scalars["DateTime"]["input"]>;
  firstPublishedAt_gte?: InputMaybe<Scalars["DateTime"]["input"]>;
  firstPublishedAt_in?: InputMaybe<
    Array<InputMaybe<Scalars["DateTime"]["input"]>>
  >;
  firstPublishedAt_lt?: InputMaybe<Scalars["DateTime"]["input"]>;
  firstPublishedAt_lte?: InputMaybe<Scalars["DateTime"]["input"]>;
  firstPublishedAt_not?: InputMaybe<Scalars["DateTime"]["input"]>;
  firstPublishedAt_not_in?: InputMaybe<
    Array<InputMaybe<Scalars["DateTime"]["input"]>>
  >;
  id?: InputMaybe<Scalars["String"]["input"]>;
  id_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  id_not?: InputMaybe<Scalars["String"]["input"]>;
  id_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  publishedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  publishedAt_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  publishedAt_gt?: InputMaybe<Scalars["DateTime"]["input"]>;
  publishedAt_gte?: InputMaybe<Scalars["DateTime"]["input"]>;
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  publishedAt_lt?: InputMaybe<Scalars["DateTime"]["input"]>;
  publishedAt_lte?: InputMaybe<Scalars["DateTime"]["input"]>;
  publishedAt_not?: InputMaybe<Scalars["DateTime"]["input"]>;
  publishedAt_not_in?: InputMaybe<
    Array<InputMaybe<Scalars["DateTime"]["input"]>>
  >;
  publishedVersion?: InputMaybe<Scalars["Float"]["input"]>;
  publishedVersion_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  publishedVersion_gt?: InputMaybe<Scalars["Float"]["input"]>;
  publishedVersion_gte?: InputMaybe<Scalars["Float"]["input"]>;
  publishedVersion_in?: InputMaybe<
    Array<InputMaybe<Scalars["Float"]["input"]>>
  >;
  publishedVersion_lt?: InputMaybe<Scalars["Float"]["input"]>;
  publishedVersion_lte?: InputMaybe<Scalars["Float"]["input"]>;
  publishedVersion_not?: InputMaybe<Scalars["Float"]["input"]>;
  publishedVersion_not_in?: InputMaybe<
    Array<InputMaybe<Scalars["Float"]["input"]>>
  >;
};

/**
 * Represents a taxonomy concept entity for finding and organizing content easily.
 *         Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-concepts
 */
export type TaxonomyConcept = {
  __typename?: "TaxonomyConcept";
  id?: Maybe<Scalars["String"]["output"]>;
};

export type TimelineFilterInput = {
  /** Preview content starting from a given release date */
  release_lte?: InputMaybe<Scalars["String"]["input"]>;
  /** Preview content starting from a given timestamp */
  timestamp_lte?: InputMaybe<Scalars["DateTime"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/userInfo) */
export type UserInfo = Entry &
  _Node & {
    __typename?: "UserInfo";
    _id: Scalars["ID"]["output"];
    bannerData?: Maybe<Banner>;
    contentfulMetadata: ContentfulMetadata;
    defaultTheme?: Maybe<Scalars["String"]["output"]>;
    layoutSettings?: Maybe<LayoutSettings>;
    linkedFrom?: Maybe<UserInfoLinkingCollections>;
    name?: Maybe<Scalars["String"]["output"]>;
    pagesCollection?: Maybe<UserInfoPagesCollection>;
    pagesInformationCollection?: Maybe<UserInfoPagesInformationCollection>;
    resume?: Maybe<Asset>;
    resumeIcon?: Maybe<Icon>;
    role?: Maybe<Scalars["String"]["output"]>;
    sys: Sys;
    themeIcon?: Maybe<Icon>;
    themeList?: Maybe<Array<Maybe<Scalars["String"]["output"]>>>;
    title?: Maybe<Scalars["String"]["output"]>;
    withPageChangeButton?: Maybe<Scalars["Boolean"]["output"]>;
  };

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/userInfo) */
export type UserInfoBannerDataArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<BannerFilter>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/userInfo) */
export type UserInfoDefaultThemeArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/userInfo) */
export type UserInfoLayoutSettingsArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<LayoutSettingsFilter>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/userInfo) */
export type UserInfoLinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/userInfo) */
export type UserInfoNameArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/userInfo) */
export type UserInfoPagesCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<Array<InputMaybe<UserInfoPagesCollectionOrder>>>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<MetaPageFilter>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/userInfo) */
export type UserInfoPagesInformationCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  order?: InputMaybe<
    Array<InputMaybe<UserInfoPagesInformationCollectionOrder>>
  >;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<PageFilter>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/userInfo) */
export type UserInfoResumeArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/userInfo) */
export type UserInfoResumeIconArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<IconFilter>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/userInfo) */
export type UserInfoRoleArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/userInfo) */
export type UserInfoThemeIconArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
  where?: InputMaybe<IconFilter>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/userInfo) */
export type UserInfoThemeListArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/userInfo) */
export type UserInfoTitleArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/userInfo) */
export type UserInfoWithPageChangeButtonArgs = {
  locale?: InputMaybe<Scalars["String"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type UserInfoCollection = {
  __typename?: "UserInfoCollection";
  items: Array<Maybe<UserInfo>>;
  limit: Scalars["Int"]["output"];
  skip: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export type UserInfoFilter = {
  AND?: InputMaybe<Array<InputMaybe<UserInfoFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<UserInfoFilter>>>;
  bannerData?: InputMaybe<CfBannerNestedFilter>;
  bannerData_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  defaultTheme?: InputMaybe<Scalars["String"]["input"]>;
  defaultTheme_contains?: InputMaybe<Scalars["String"]["input"]>;
  defaultTheme_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  defaultTheme_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  defaultTheme_not?: InputMaybe<Scalars["String"]["input"]>;
  defaultTheme_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  defaultTheme_not_in?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  layoutSettings?: InputMaybe<CfLayoutSettingsNestedFilter>;
  layoutSettings_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  name_contains?: InputMaybe<Scalars["String"]["input"]>;
  name_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  name_not?: InputMaybe<Scalars["String"]["input"]>;
  name_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  pages?: InputMaybe<CfMetaPageNestedFilter>;
  pagesCollection_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  pagesInformation?: InputMaybe<CfPageNestedFilter>;
  pagesInformationCollection_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  resumeIcon?: InputMaybe<CfIconNestedFilter>;
  resumeIcon_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  resume_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  role?: InputMaybe<Scalars["String"]["input"]>;
  role_contains?: InputMaybe<Scalars["String"]["input"]>;
  role_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  role_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  role_not?: InputMaybe<Scalars["String"]["input"]>;
  role_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  role_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  sys?: InputMaybe<SysFilter>;
  themeIcon?: InputMaybe<CfIconNestedFilter>;
  themeIcon_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  themeList_contains_all?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  themeList_contains_none?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  themeList_contains_some?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  themeList_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  title_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  title_not?: InputMaybe<Scalars["String"]["input"]>;
  title_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  withPageChangeButton?: InputMaybe<Scalars["Boolean"]["input"]>;
  withPageChangeButton_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  withPageChangeButton_not?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type UserInfoLinkingCollections = {
  __typename?: "UserInfoLinkingCollections";
  entryCollection?: Maybe<EntryCollection>;
};

export type UserInfoLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars["Int"]["input"]>;
  locale?: InputMaybe<Scalars["String"]["input"]>;
  preview?: InputMaybe<Scalars["Boolean"]["input"]>;
  skip?: InputMaybe<Scalars["Int"]["input"]>;
  useFallbackLocale?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export enum UserInfoOrder {
  DefaultThemeAsc = "defaultTheme_ASC",
  DefaultThemeDesc = "defaultTheme_DESC",
  NameAsc = "name_ASC",
  NameDesc = "name_DESC",
  RoleAsc = "role_ASC",
  RoleDesc = "role_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
  WithPageChangeButtonAsc = "withPageChangeButton_ASC",
  WithPageChangeButtonDesc = "withPageChangeButton_DESC",
}

export type UserInfoPagesCollection = {
  __typename?: "UserInfoPagesCollection";
  items: Array<Maybe<MetaPage>>;
  limit: Scalars["Int"]["output"];
  skip: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export enum UserInfoPagesCollectionOrder {
  IsDefaultPageAsc = "isDefaultPage_ASC",
  IsDefaultPageDesc = "isDefaultPage_DESC",
  PageUrlAsc = "pageUrl_ASC",
  PageUrlDesc = "pageUrl_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

export type UserInfoPagesInformationCollection = {
  __typename?: "UserInfoPagesInformationCollection";
  items: Array<Maybe<Page>>;
  limit: Scalars["Int"]["output"];
  skip: Scalars["Int"]["output"];
  total: Scalars["Int"]["output"];
};

export enum UserInfoPagesInformationCollectionOrder {
  ContentAnimationAsc = "contentAnimation_ASC",
  ContentAnimationDesc = "contentAnimation_DESC",
  HeadingAnimationAsc = "headingAnimation_ASC",
  HeadingAnimationDesc = "headingAnimation_DESC",
  PathAsc = "path_ASC",
  PathDesc = "path_DESC",
  SysFirstPublishedAtAsc = "sys_firstPublishedAt_ASC",
  SysFirstPublishedAtDesc = "sys_firstPublishedAt_DESC",
  SysIdAsc = "sys_id_ASC",
  SysIdDesc = "sys_id_DESC",
  SysPublishedAtAsc = "sys_publishedAt_ASC",
  SysPublishedAtDesc = "sys_publishedAt_DESC",
  SysPublishedVersionAsc = "sys_publishedVersion_ASC",
  SysPublishedVersionDesc = "sys_publishedVersion_DESC",
  TitleAsc = "title_ASC",
  TitleDesc = "title_DESC",
}

export type _Node = {
  _id: Scalars["ID"]["output"];
};

export type CfBannerNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfBannerNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfBannerNestedFilter>>>;
  bannerAnimation?: InputMaybe<Scalars["String"]["input"]>;
  bannerAnimation_contains?: InputMaybe<Scalars["String"]["input"]>;
  bannerAnimation_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  bannerAnimation_in?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  bannerAnimation_not?: InputMaybe<Scalars["String"]["input"]>;
  bannerAnimation_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  bannerAnimation_not_in?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  bannerImage_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  profilePicture_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  socialLinksCollection_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  title_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  title_not?: InputMaybe<Scalars["String"]["input"]>;
  title_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type CfBioCardNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfBioCardNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfBioCardNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  icon_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  title_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  title_not?: InputMaybe<Scalars["String"]["input"]>;
  title_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  value?: InputMaybe<Scalars["String"]["input"]>;
  value_contains?: InputMaybe<Scalars["String"]["input"]>;
  value_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  value_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  value_not?: InputMaybe<Scalars["String"]["input"]>;
  value_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  value_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type CfIconNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfIconNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfIconNestedFilter>>>;
  classes_contains_all?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  classes_contains_none?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  classes_contains_some?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  classes_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  iconCode?: InputMaybe<Scalars["String"]["input"]>;
  iconCode_contains?: InputMaybe<Scalars["String"]["input"]>;
  iconCode_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  iconCode_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  iconCode_not?: InputMaybe<Scalars["String"]["input"]>;
  iconCode_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  iconCode_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  name_contains?: InputMaybe<Scalars["String"]["input"]>;
  name_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  name_not?: InputMaybe<Scalars["String"]["input"]>;
  name_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  showTooltip?: InputMaybe<Scalars["Boolean"]["input"]>;
  showTooltip_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  showTooltip_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  sys?: InputMaybe<SysFilter>;
};

export type CfJobExperienceNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfJobExperienceNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfJobExperienceNestedFilter>>>;
  company?: InputMaybe<Scalars["String"]["input"]>;
  companyIcon_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  company_contains?: InputMaybe<Scalars["String"]["input"]>;
  company_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  company_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  company_not?: InputMaybe<Scalars["String"]["input"]>;
  company_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  company_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  currentlyWorking?: InputMaybe<Scalars["Boolean"]["input"]>;
  currentlyWorking_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  currentlyWorking_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  description_contains?: InputMaybe<Scalars["String"]["input"]>;
  description_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  description_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  durationIcon_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  endDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  endDate_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  endDate_gt?: InputMaybe<Scalars["DateTime"]["input"]>;
  endDate_gte?: InputMaybe<Scalars["DateTime"]["input"]>;
  endDate_in?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  endDate_lt?: InputMaybe<Scalars["DateTime"]["input"]>;
  endDate_lte?: InputMaybe<Scalars["DateTime"]["input"]>;
  endDate_not?: InputMaybe<Scalars["DateTime"]["input"]>;
  endDate_not_in?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  location?: InputMaybe<Scalars["String"]["input"]>;
  locationIcon_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  location_contains?: InputMaybe<Scalars["String"]["input"]>;
  location_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  location_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  location_not?: InputMaybe<Scalars["String"]["input"]>;
  location_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  location_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  position?: InputMaybe<Scalars["String"]["input"]>;
  position_contains?: InputMaybe<Scalars["String"]["input"]>;
  position_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  position_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  position_not?: InputMaybe<Scalars["String"]["input"]>;
  position_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  position_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  roleIcon_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  startDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  startDate_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  startDate_gt?: InputMaybe<Scalars["DateTime"]["input"]>;
  startDate_gte?: InputMaybe<Scalars["DateTime"]["input"]>;
  startDate_in?: InputMaybe<Array<InputMaybe<Scalars["DateTime"]["input"]>>>;
  startDate_lt?: InputMaybe<Scalars["DateTime"]["input"]>;
  startDate_lte?: InputMaybe<Scalars["DateTime"]["input"]>;
  startDate_not?: InputMaybe<Scalars["DateTime"]["input"]>;
  startDate_not_in?: InputMaybe<
    Array<InputMaybe<Scalars["DateTime"]["input"]>>
  >;
  sys?: InputMaybe<SysFilter>;
  techStackIcon_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  techStack_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  workedRemotely?: InputMaybe<Scalars["Boolean"]["input"]>;
  workedRemotely_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  workedRemotely_not?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type CfLayoutSettingsNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfLayoutSettingsNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfLayoutSettingsNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  drawerSide?: InputMaybe<Scalars["String"]["input"]>;
  drawerSide_contains?: InputMaybe<Scalars["String"]["input"]>;
  drawerSide_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  drawerSide_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  drawerSide_not?: InputMaybe<Scalars["String"]["input"]>;
  drawerSide_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  drawerSide_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  drawerVariant?: InputMaybe<Scalars["String"]["input"]>;
  drawerVariant_contains?: InputMaybe<Scalars["String"]["input"]>;
  drawerVariant_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  drawerVariant_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  drawerVariant_not?: InputMaybe<Scalars["String"]["input"]>;
  drawerVariant_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  drawerVariant_not_in?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  title_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  title_not?: InputMaybe<Scalars["String"]["input"]>;
  title_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type CfMetaPageNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfMetaPageNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfMetaPageNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  isDefaultPage?: InputMaybe<Scalars["Boolean"]["input"]>;
  isDefaultPage_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  isDefaultPage_not?: InputMaybe<Scalars["Boolean"]["input"]>;
  pageIcon_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  pageUrl?: InputMaybe<Scalars["String"]["input"]>;
  pageUrl_contains?: InputMaybe<Scalars["String"]["input"]>;
  pageUrl_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  pageUrl_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  pageUrl_not?: InputMaybe<Scalars["String"]["input"]>;
  pageUrl_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  pageUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  title_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  title_not?: InputMaybe<Scalars["String"]["input"]>;
  title_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type CfPageNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfPageNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfPageNestedFilter>>>;
  contentAnimation?: InputMaybe<Scalars["String"]["input"]>;
  contentAnimation_contains?: InputMaybe<Scalars["String"]["input"]>;
  contentAnimation_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  contentAnimation_in?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  contentAnimation_not?: InputMaybe<Scalars["String"]["input"]>;
  contentAnimation_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  contentAnimation_not_in?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  headingAnimation?: InputMaybe<Scalars["String"]["input"]>;
  headingAnimation_contains?: InputMaybe<Scalars["String"]["input"]>;
  headingAnimation_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  headingAnimation_in?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  headingAnimation_not?: InputMaybe<Scalars["String"]["input"]>;
  headingAnimation_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  headingAnimation_not_in?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  pageData_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  pageIcon_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  pageSeo_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  path?: InputMaybe<Scalars["String"]["input"]>;
  path_contains?: InputMaybe<Scalars["String"]["input"]>;
  path_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  path_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  path_not?: InputMaybe<Scalars["String"]["input"]>;
  path_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  path_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  title_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  title_not?: InputMaybe<Scalars["String"]["input"]>;
  title_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type CfProjectCardNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfProjectCardNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfProjectCardNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  deployedLink?: InputMaybe<Scalars["String"]["input"]>;
  deployedLinkIcon_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  deployedLink_contains?: InputMaybe<Scalars["String"]["input"]>;
  deployedLink_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  deployedLink_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  deployedLink_not?: InputMaybe<Scalars["String"]["input"]>;
  deployedLink_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  deployedLink_not_in?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  description?: InputMaybe<Scalars["String"]["input"]>;
  description_contains?: InputMaybe<Scalars["String"]["input"]>;
  description_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  description_not?: InputMaybe<Scalars["String"]["input"]>;
  description_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  description_not_in?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  sys?: InputMaybe<SysFilter>;
  thumbnail_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  title_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  title_not?: InputMaybe<Scalars["String"]["input"]>;
  title_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type CfSeoDataNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfSeoDataNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfSeoDataNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  countryName?: InputMaybe<Scalars["String"]["input"]>;
  countryName_contains?: InputMaybe<Scalars["String"]["input"]>;
  countryName_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  countryName_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  countryName_not?: InputMaybe<Scalars["String"]["input"]>;
  countryName_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  countryName_not_in?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  creator?: InputMaybe<Scalars["String"]["input"]>;
  creator_contains?: InputMaybe<Scalars["String"]["input"]>;
  creator_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  creator_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  creator_not?: InputMaybe<Scalars["String"]["input"]>;
  creator_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  creator_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  description_contains?: InputMaybe<Scalars["String"]["input"]>;
  description_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  description_not?: InputMaybe<Scalars["String"]["input"]>;
  description_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  description_not_in?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  favicon_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  imagesCollection_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  keywords_contains_all?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  keywords_contains_none?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  keywords_contains_some?: InputMaybe<
    Array<InputMaybe<Scalars["String"]["input"]>>
  >;
  keywords_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  publisher?: InputMaybe<Scalars["String"]["input"]>;
  publisher_contains?: InputMaybe<Scalars["String"]["input"]>;
  publisher_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  publisher_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  publisher_not?: InputMaybe<Scalars["String"]["input"]>;
  publisher_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  publisher_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  siteName?: InputMaybe<Scalars["String"]["input"]>;
  siteName_contains?: InputMaybe<Scalars["String"]["input"]>;
  siteName_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  siteName_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  siteName_not?: InputMaybe<Scalars["String"]["input"]>;
  siteName_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  siteName_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  title_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  title_not?: InputMaybe<Scalars["String"]["input"]>;
  title_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  url?: InputMaybe<Scalars["String"]["input"]>;
  url_contains?: InputMaybe<Scalars["String"]["input"]>;
  url_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  url_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  url_not?: InputMaybe<Scalars["String"]["input"]>;
  url_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type CfSkillGroupNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfSkillGroupNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfSkillGroupNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  skillIconsCollection_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  skillProgress?: InputMaybe<Scalars["Int"]["input"]>;
  skillProgress_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  skillProgress_gt?: InputMaybe<Scalars["Int"]["input"]>;
  skillProgress_gte?: InputMaybe<Scalars["Int"]["input"]>;
  skillProgress_in?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  skillProgress_lt?: InputMaybe<Scalars["Int"]["input"]>;
  skillProgress_lte?: InputMaybe<Scalars["Int"]["input"]>;
  skillProgress_not?: InputMaybe<Scalars["Int"]["input"]>;
  skillProgress_not_in?: InputMaybe<Array<InputMaybe<Scalars["Int"]["input"]>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  title_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  title_not?: InputMaybe<Scalars["String"]["input"]>;
  title_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type CfSkillSetNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfSkillSetNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfSkillSetNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  icon_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  skillsArrayCollection_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  skillsetIcon_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  title_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_exists?: InputMaybe<Scalars["Boolean"]["input"]>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
  title_not?: InputMaybe<Scalars["String"]["input"]>;
  title_not_contains?: InputMaybe<Scalars["String"]["input"]>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars["String"]["input"]>>>;
};

export type CfcontentMultiTypeNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<CfcontentMultiTypeNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<CfcontentMultiTypeNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
};

export type AssetFragment = {
  __typename: "Asset";
  width?: number | null;
  url?: string | null;
  title?: string | null;
  size?: number | null;
  height?: number | null;
  description?: string | null;
  fileName?: string | null;
  contentType?: string | null;
  sys: { __typename?: "Sys"; id: string };
};

export type BioCardFragment = {
  __typename: "BioCard";
  title?: string | null;
  value?: string | null;
  _id: string;
  icon?: {
    __typename: "Icon";
    _id: string;
    classes?: Array<string | null> | null;
    name?: string | null;
    iconCode?: string | null;
    showTooltip?: boolean | null;
  } | null;
};

export type IconFragment = {
  __typename: "Icon";
  _id: string;
  classes?: Array<string | null> | null;
  name?: string | null;
  iconCode?: string | null;
  showTooltip?: boolean | null;
};

export type JobExperienceFragment = {
  __typename: "JobExperience";
  company?: string | null;
  currentlyWorking?: boolean | null;
  workedRemotely?: boolean | null;
  endDate?: any | null;
  position?: string | null;
  startDate?: any | null;
  location?: string | null;
  companyIcon?: {
    __typename: "Icon";
    _id: string;
    classes?: Array<string | null> | null;
    name?: string | null;
    iconCode?: string | null;
    showTooltip?: boolean | null;
  } | null;
  techStackIcon?: {
    __typename: "Icon";
    _id: string;
    classes?: Array<string | null> | null;
    name?: string | null;
    iconCode?: string | null;
    showTooltip?: boolean | null;
  } | null;
  description?: { __typename?: "JobExperienceDescription"; json: any } | null;
  durationIcon?: {
    __typename: "Icon";
    _id: string;
    classes?: Array<string | null> | null;
    name?: string | null;
    iconCode?: string | null;
    showTooltip?: boolean | null;
  } | null;
  locationIcon?: {
    __typename: "Icon";
    _id: string;
    classes?: Array<string | null> | null;
    name?: string | null;
    iconCode?: string | null;
    showTooltip?: boolean | null;
  } | null;
  roleIcon?: {
    __typename: "Icon";
    _id: string;
    classes?: Array<string | null> | null;
    name?: string | null;
    iconCode?: string | null;
    showTooltip?: boolean | null;
  } | null;
  techStack?: {
    __typename?: "SkillGroup";
    skillProgress?: number | null;
    _id: string;
    title?: string | null;
    skillIconsCollection?: {
      __typename?: "SkillGroupSkillIconsCollection";
      items: Array<{
        __typename: "Icon";
        _id: string;
        classes?: Array<string | null> | null;
        name?: string | null;
        iconCode?: string | null;
        showTooltip?: boolean | null;
      } | null>;
    } | null;
  } | null;
};

export type SeoDataFragment = {
  __typename: "SeoData";
  countryName?: string | null;
  creator?: string | null;
  description?: string | null;
  keywords?: Array<string | null> | null;
  url?: string | null;
  siteName?: string | null;
  publisher?: string | null;
  title?: string | null;
  imagesCollection?: {
    __typename?: "AssetCollection";
    items: Array<{
      __typename: "Asset";
      width?: number | null;
      url?: string | null;
      title?: string | null;
      size?: number | null;
      height?: number | null;
      description?: string | null;
      fileName?: string | null;
      contentType?: string | null;
      sys: { __typename?: "Sys"; id: string };
    } | null>;
  } | null;
  favicon?: {
    __typename: "Asset";
    width?: number | null;
    url?: string | null;
    title?: string | null;
    size?: number | null;
    height?: number | null;
    description?: string | null;
    fileName?: string | null;
    contentType?: string | null;
    sys: { __typename?: "Sys"; id: string };
  } | null;
  sys: { __typename?: "Sys"; id: string };
};

export type ExperiencePageDataFragment = {
  __typename: "ExperiencePageData";
  title?: string | null;
  _id: string;
  experiencesCollection?: {
    __typename?: "ExperiencePageDataExperiencesCollection";
    items: Array<{
      __typename: "JobExperience";
      company?: string | null;
      currentlyWorking?: boolean | null;
      workedRemotely?: boolean | null;
      endDate?: any | null;
      position?: string | null;
      startDate?: any | null;
      location?: string | null;
      companyIcon?: {
        __typename: "Icon";
        _id: string;
        classes?: Array<string | null> | null;
        name?: string | null;
        iconCode?: string | null;
        showTooltip?: boolean | null;
      } | null;
      techStackIcon?: {
        __typename: "Icon";
        _id: string;
        classes?: Array<string | null> | null;
        name?: string | null;
        iconCode?: string | null;
        showTooltip?: boolean | null;
      } | null;
      description?: {
        __typename?: "JobExperienceDescription";
        json: any;
      } | null;
      durationIcon?: {
        __typename: "Icon";
        _id: string;
        classes?: Array<string | null> | null;
        name?: string | null;
        iconCode?: string | null;
        showTooltip?: boolean | null;
      } | null;
      locationIcon?: {
        __typename: "Icon";
        _id: string;
        classes?: Array<string | null> | null;
        name?: string | null;
        iconCode?: string | null;
        showTooltip?: boolean | null;
      } | null;
      roleIcon?: {
        __typename: "Icon";
        _id: string;
        classes?: Array<string | null> | null;
        name?: string | null;
        iconCode?: string | null;
        showTooltip?: boolean | null;
      } | null;
      techStack?: {
        __typename?: "SkillGroup";
        skillProgress?: number | null;
        _id: string;
        title?: string | null;
        skillIconsCollection?: {
          __typename?: "SkillGroupSkillIconsCollection";
          items: Array<{
            __typename: "Icon";
            _id: string;
            classes?: Array<string | null> | null;
            name?: string | null;
            iconCode?: string | null;
            showTooltip?: boolean | null;
          } | null>;
        } | null;
      } | null;
    } | null>;
  } | null;
};

export type HomePageDataFragment = {
  __typename: "HomePageData";
  _id: string;
  title?: string | null;
  description?: { __typename?: "HomePageDataDescription"; json: any } | null;
  infoCollection?: {
    __typename?: "HomePageDataInfoCollection";
    items: Array<{
      __typename: "BioCard";
      title?: string | null;
      value?: string | null;
      icon?: {
        __typename: "Icon";
        _id: string;
        classes?: Array<string | null> | null;
        name?: string | null;
        iconCode?: string | null;
        showTooltip?: boolean | null;
      } | null;
    } | null>;
  } | null;
};

export type ProjectsPageDataFragment = {
  __typename: "ProjectsPageData";
  _id: string;
  title?: string | null;
  projectsCollection?: {
    __typename?: "ProjectsPageDataProjectsCollection";
    items: Array<{
      __typename: "ProjectCard";
      _id: string;
      deployedLink?: string | null;
      title?: string | null;
      description?: string | null;
      deployedLinkIcon?: {
        __typename: "Icon";
        _id: string;
        classes?: Array<string | null> | null;
        name?: string | null;
        iconCode?: string | null;
        showTooltip?: boolean | null;
      } | null;
      thumbnail?: {
        __typename: "Asset";
        width?: number | null;
        url?: string | null;
        title?: string | null;
        size?: number | null;
        height?: number | null;
        description?: string | null;
        fileName?: string | null;
        contentType?: string | null;
        sys: { __typename?: "Sys"; id: string };
      } | null;
    } | null>;
  } | null;
};

export type SkillsPageDataFragment = {
  __typename: "SkillsPageData";
  _id: string;
  title?: string | null;
  skillsSetCollection?: {
    __typename?: "SkillsPageDataSkillsSetCollection";
    items: Array<{
      __typename?: "SkillSet";
      title?: string | null;
      icon?: {
        __typename: "Icon";
        _id: string;
        classes?: Array<string | null> | null;
        name?: string | null;
        iconCode?: string | null;
        showTooltip?: boolean | null;
      } | null;
      skillsArrayCollection?: {
        __typename?: "SkillSetSkillsArrayCollection";
        items: Array<{
          __typename: "SkillGroup";
          _id: string;
          title?: string | null;
          skillProgress?: number | null;
          skillIconsCollection?: {
            __typename: "SkillGroupSkillIconsCollection";
            items: Array<{
              __typename: "Icon";
              _id: string;
              classes?: Array<string | null> | null;
              name?: string | null;
              iconCode?: string | null;
              showTooltip?: boolean | null;
            } | null>;
          } | null;
        } | null>;
      } | null;
    } | null>;
  } | null;
};

export type FetchPageByPathQueryVariables = Exact<{
  path: Scalars["String"]["input"];
}>;

export type FetchPageByPathQuery = {
  __typename?: "Query";
  pageCollection?: {
    __typename?: "PageCollection";
    items: Array<{
      __typename?: "Page";
      _id: string;
      path?: string | null;
      title?: string | null;
      contentAnimation?: string | null;
      headingAnimation?: string | null;
      pageSeo?: {
        __typename: "SeoData";
        countryName?: string | null;
        creator?: string | null;
        description?: string | null;
        keywords?: Array<string | null> | null;
        url?: string | null;
        siteName?: string | null;
        publisher?: string | null;
        title?: string | null;
        imagesCollection?: {
          __typename?: "AssetCollection";
          items: Array<{
            __typename: "Asset";
            width?: number | null;
            url?: string | null;
            title?: string | null;
            size?: number | null;
            height?: number | null;
            description?: string | null;
            fileName?: string | null;
            contentType?: string | null;
            sys: { __typename?: "Sys"; id: string };
          } | null>;
        } | null;
        favicon?: {
          __typename: "Asset";
          width?: number | null;
          url?: string | null;
          title?: string | null;
          size?: number | null;
          height?: number | null;
          description?: string | null;
          fileName?: string | null;
          contentType?: string | null;
          sys: { __typename?: "Sys"; id: string };
        } | null;
        sys: { __typename?: "Sys"; id: string };
      } | null;
      pageData?:
        | {
            __typename: "ExperiencePageData";
            title?: string | null;
            _id: string;
            experiencesCollection?: {
              __typename?: "ExperiencePageDataExperiencesCollection";
              items: Array<{
                __typename: "JobExperience";
                company?: string | null;
                currentlyWorking?: boolean | null;
                workedRemotely?: boolean | null;
                endDate?: any | null;
                position?: string | null;
                startDate?: any | null;
                location?: string | null;
                companyIcon?: {
                  __typename: "Icon";
                  _id: string;
                  classes?: Array<string | null> | null;
                  name?: string | null;
                  iconCode?: string | null;
                  showTooltip?: boolean | null;
                } | null;
                techStackIcon?: {
                  __typename: "Icon";
                  _id: string;
                  classes?: Array<string | null> | null;
                  name?: string | null;
                  iconCode?: string | null;
                  showTooltip?: boolean | null;
                } | null;
                description?: {
                  __typename?: "JobExperienceDescription";
                  json: any;
                } | null;
                durationIcon?: {
                  __typename: "Icon";
                  _id: string;
                  classes?: Array<string | null> | null;
                  name?: string | null;
                  iconCode?: string | null;
                  showTooltip?: boolean | null;
                } | null;
                locationIcon?: {
                  __typename: "Icon";
                  _id: string;
                  classes?: Array<string | null> | null;
                  name?: string | null;
                  iconCode?: string | null;
                  showTooltip?: boolean | null;
                } | null;
                roleIcon?: {
                  __typename: "Icon";
                  _id: string;
                  classes?: Array<string | null> | null;
                  name?: string | null;
                  iconCode?: string | null;
                  showTooltip?: boolean | null;
                } | null;
                techStack?: {
                  __typename?: "SkillGroup";
                  skillProgress?: number | null;
                  _id: string;
                  title?: string | null;
                  skillIconsCollection?: {
                    __typename?: "SkillGroupSkillIconsCollection";
                    items: Array<{
                      __typename: "Icon";
                      _id: string;
                      classes?: Array<string | null> | null;
                      name?: string | null;
                      iconCode?: string | null;
                      showTooltip?: boolean | null;
                    } | null>;
                  } | null;
                } | null;
              } | null>;
            } | null;
          }
        | {
            __typename: "HomePageData";
            _id: string;
            title?: string | null;
            description?: {
              __typename?: "HomePageDataDescription";
              json: any;
            } | null;
            infoCollection?: {
              __typename?: "HomePageDataInfoCollection";
              items: Array<{
                __typename: "BioCard";
                title?: string | null;
                value?: string | null;
                icon?: {
                  __typename: "Icon";
                  _id: string;
                  classes?: Array<string | null> | null;
                  name?: string | null;
                  iconCode?: string | null;
                  showTooltip?: boolean | null;
                } | null;
              } | null>;
            } | null;
          }
        | {
            __typename: "ProjectsPageData";
            _id: string;
            title?: string | null;
            projectsCollection?: {
              __typename?: "ProjectsPageDataProjectsCollection";
              items: Array<{
                __typename: "ProjectCard";
                _id: string;
                deployedLink?: string | null;
                title?: string | null;
                description?: string | null;
                deployedLinkIcon?: {
                  __typename: "Icon";
                  _id: string;
                  classes?: Array<string | null> | null;
                  name?: string | null;
                  iconCode?: string | null;
                  showTooltip?: boolean | null;
                } | null;
                thumbnail?: {
                  __typename: "Asset";
                  width?: number | null;
                  url?: string | null;
                  title?: string | null;
                  size?: number | null;
                  height?: number | null;
                  description?: string | null;
                  fileName?: string | null;
                  contentType?: string | null;
                  sys: { __typename?: "Sys"; id: string };
                } | null;
              } | null>;
            } | null;
          }
        | {
            __typename: "SkillsPageData";
            _id: string;
            title?: string | null;
            skillsSetCollection?: {
              __typename?: "SkillsPageDataSkillsSetCollection";
              items: Array<{
                __typename?: "SkillSet";
                title?: string | null;
                icon?: {
                  __typename: "Icon";
                  _id: string;
                  classes?: Array<string | null> | null;
                  name?: string | null;
                  iconCode?: string | null;
                  showTooltip?: boolean | null;
                } | null;
                skillsArrayCollection?: {
                  __typename?: "SkillSetSkillsArrayCollection";
                  items: Array<{
                    __typename: "SkillGroup";
                    _id: string;
                    title?: string | null;
                    skillProgress?: number | null;
                    skillIconsCollection?: {
                      __typename: "SkillGroupSkillIconsCollection";
                      items: Array<{
                        __typename: "Icon";
                        _id: string;
                        classes?: Array<string | null> | null;
                        name?: string | null;
                        iconCode?: string | null;
                        showTooltip?: boolean | null;
                      } | null>;
                    } | null;
                  } | null>;
                } | null;
              } | null>;
            } | null;
          }
        | null;
      pageIcon?: {
        __typename: "Icon";
        _id: string;
        classes?: Array<string | null> | null;
        name?: string | null;
        iconCode?: string | null;
        showTooltip?: boolean | null;
      } | null;
    } | null>;
  } | null;
};

export type GetAppDataQueryVariables = Exact<{
  id: Scalars["String"]["input"];
}>;

export type GetAppDataQuery = {
  __typename?: "Query";
  userInfo?: {
    __typename?: "UserInfo";
    title?: string | null;
    name?: string | null;
    defaultTheme?: string | null;
    themeList?: Array<string | null> | null;
    role?: string | null;
    bannerData?: {
      __typename?: "Banner";
      bannerAnimation?: string | null;
      title?: string | null;
      profilePicture?: {
        __typename?: "Asset";
        description?: string | null;
        fileName?: string | null;
        width?: number | null;
        height?: number | null;
        title?: string | null;
        url?: string | null;
      } | null;
      socialLinksCollection?: {
        __typename?: "AssetCollection";
        items: Array<{
          __typename?: "Asset";
          description?: string | null;
          fileName?: string | null;
          width?: number | null;
          height?: number | null;
          title?: string | null;
          url?: string | null;
        } | null>;
      } | null;
      bannerImage?: {
        __typename?: "Asset";
        title?: string | null;
        url?: string | null;
        description?: string | null;
        fileName?: string | null;
        height?: number | null;
        width?: number | null;
      } | null;
    } | null;
    resume?: {
      __typename?: "Asset";
      description?: string | null;
      fileName?: string | null;
      title?: string | null;
      url?: string | null;
    } | null;
    pagesCollection?: {
      __typename?: "UserInfoPagesCollection";
      items: Array<{
        __typename?: "MetaPage";
        pageUrl?: string | null;
        isDefaultPage?: boolean | null;
        title?: string | null;
        pageIcon?: {
          __typename?: "Icon";
          classes?: Array<string | null> | null;
          iconCode?: string | null;
          name?: string | null;
          showTooltip?: boolean | null;
        } | null;
      } | null>;
    } | null;
    resumeIcon?: {
      __typename?: "Icon";
      classes?: Array<string | null> | null;
      showTooltip?: boolean | null;
      name?: string | null;
      iconCode?: string | null;
    } | null;
    themeIcon?: {
      __typename?: "Icon";
      classes?: Array<string | null> | null;
      showTooltip?: boolean | null;
      name?: string | null;
      iconCode?: string | null;
    } | null;
    layoutSettings?: {
      __typename?: "LayoutSettings";
      drawerSide?: string | null;
      drawerVariant?: string | null;
      title?: string | null;
    } | null;
  } | null;
};

export const IconFragmentDoc = gql`
  fragment Icon on Icon {
    _id
    classes
    __typename
    name
    iconCode
    showTooltip
  }
`;
export const BioCardFragmentDoc = gql`
  fragment BioCard on BioCard {
    title
    value
    __typename
    _id
    icon {
      ...Icon
    }
  }
  ${IconFragmentDoc}
`;
export const AssetFragmentDoc = gql`
  fragment Asset on Asset {
    __typename
    sys {
      id
    }
    width
    url
    title
    size
    height
    description
    fileName
    contentType
  }
`;
export const SeoDataFragmentDoc = gql`
  fragment SeoData on SeoData {
    countryName
    creator
    description
    keywords
    __typename
    url
    siteName
    publisher
    imagesCollection {
      items {
        ...Asset
      }
    }
    favicon {
      ...Asset
    }
    title
    sys {
      id
    }
  }
  ${AssetFragmentDoc}
`;
export const JobExperienceFragmentDoc = gql`
  fragment JobExperience on JobExperience {
    company
    companyIcon {
      ...Icon
    }
    currentlyWorking
    __typename
    workedRemotely
    techStackIcon {
      ...Icon
    }
    description {
      json
    }
    durationIcon {
      ...Icon
    }
    endDate
    position
    startDate
    location
    locationIcon {
      ...Icon
    }
    roleIcon {
      ...Icon
    }
    techStack {
      skillProgress
      _id
      title
      skillIconsCollection {
        items {
          ...Icon
        }
      }
    }
  }
  ${IconFragmentDoc}
`;
export const ExperiencePageDataFragmentDoc = gql`
  fragment ExperiencePageData on ExperiencePageData {
    title
    _id
    __typename
    experiencesCollection(limit: 10) {
      items {
        ...JobExperience
      }
    }
  }
  ${JobExperienceFragmentDoc}
`;
export const HomePageDataFragmentDoc = gql`
  fragment HomePageData on HomePageData {
    _id
    description {
      json
    }
    title
    __typename
    infoCollection {
      items {
        title
        __typename
        value
        icon {
          ...Icon
        }
      }
    }
  }
  ${IconFragmentDoc}
`;
export const ProjectsPageDataFragmentDoc = gql`
  fragment ProjectsPageData on ProjectsPageData {
    _id
    title
    __typename
    projectsCollection {
      items {
        _id
        deployedLink
        title
        __typename
        description
        deployedLinkIcon {
          ...Icon
        }
        thumbnail {
          ...Asset
        }
      }
    }
  }
  ${IconFragmentDoc}
  ${AssetFragmentDoc}
`;
export const SkillsPageDataFragmentDoc = gql`
  fragment SkillsPageData on SkillsPageData {
    _id
    title
    __typename
    skillsSetCollection(limit: 10) {
      items {
        title
        icon {
          ...Icon
        }
        skillsArrayCollection(limit: 10) {
          items {
            _id
            title
            skillIconsCollection(limit: 10) {
              __typename
              items {
                ...Icon
              }
            }
            skillProgress
            __typename
          }
        }
      }
    }
  }
  ${IconFragmentDoc}
`;
export const FetchPageByPathDocument = gql`
  query fetchPageByPath($path: String!) {
    pageCollection(where: { path: $path }, limit: 1) {
      items {
        _id
        path
        title
        contentAnimation
        pageSeo {
          ...SeoData
        }
        pageData {
          __typename
          ... on HomePageData {
            ...HomePageData
          }
          ... on ExperiencePageData {
            ...ExperiencePageData
          }
          ... on SkillsPageData {
            ...SkillsPageData
          }
          ... on ProjectsPageData {
            ...ProjectsPageData
          }
        }
        headingAnimation
        pageIcon {
          ...Icon
        }
      }
    }
  }
  ${SeoDataFragmentDoc}
  ${HomePageDataFragmentDoc}
  ${ExperiencePageDataFragmentDoc}
  ${SkillsPageDataFragmentDoc}
  ${ProjectsPageDataFragmentDoc}
  ${IconFragmentDoc}
`;
export const GetAppDataDocument = gql`
  query GetAppData($id: String!) {
    userInfo(id: $id) {
      title
      name
      bannerData {
        bannerAnimation
        title
        profilePicture {
          description
          fileName
          width
          height
          title
          url
        }
        bannerAnimation
        socialLinksCollection {
          items {
            description
            fileName
            width
            height
            title
            url
          }
        }
        bannerImage {
          title
          url
          description
          fileName
          height
          width
        }
      }
      defaultTheme
      themeList
      resume {
        description
        fileName
        title
        url
      }
      role
      pagesCollection {
        items {
          pageUrl
          isDefaultPage
          title
          pageIcon {
            classes
            iconCode
            name
            showTooltip
          }
        }
      }
      resumeIcon {
        classes
        showTooltip
        name
        iconCode
      }
      resume {
        description
        fileName
        title
        url
      }
      themeIcon {
        classes
        showTooltip
        name
        iconCode
      }
      themeList
      defaultTheme
      layoutSettings {
        drawerSide
        drawerVariant
        title
      }
    }
  }
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string,
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (
  action,
  _operationName,
  _operationType,
) => action();
const FetchPageByPathDocumentString = print(FetchPageByPathDocument);
const GetAppDataDocumentString = print(GetAppDataDocument);
export function getSdk(
  client: GraphQLClient,
  withWrapper: SdkFunctionWrapper = defaultWrapper,
) {
  return {
    fetchPageByPath(
      variables: FetchPageByPathQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<{
      data: FetchPageByPathQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<FetchPageByPathQuery>(
            FetchPageByPathDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        "fetchPageByPath",
        "query",
      );
    },
    GetAppData(
      variables: GetAppDataQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"],
    ): Promise<{
      data: GetAppDataQuery;
      extensions?: any;
      headers: Dom.Headers;
      status: number;
    }> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.rawRequest<GetAppDataQuery>(
            GetAppDataDocumentString,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders },
          ),
        "GetAppData",
        "query",
      );
    },
  };
}
export type Sdk = ReturnType<typeof getSdk>;
