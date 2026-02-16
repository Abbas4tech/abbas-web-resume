/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /**
   * A date-time string at UTC, such as 2007-12-03T10:15:30Z,
   *     compliant with the 'date-time' format outlined in section 5.6 of
   *     the RFC 3339 profile of the ISO 8601 standard for representation
   *     of dates and times using the Gregorian calendar.
   */
  DateTime: { input: any; output: any; }
  /** The 'Dimension' type represents dimensions as whole numeric values between `1` and `4000`. */
  Dimension: { input: any; output: any; }
  /** The 'HexColor' type represents color in `rgb:ffffff` string format. */
  HexColor: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** The 'Quality' type represents quality as whole numeric values between `1` and `100`. */
  Quality: { input: any; output: any; }
};

/** Represents a binary file in a space. An asset can be any file type. */
export type Asset = {
  __typename?: 'Asset';
  contentType: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  description: Maybe<Scalars['String']['output']>;
  fileName: Maybe<Scalars['String']['output']>;
  height: Maybe<Scalars['Int']['output']>;
  linkedFrom: Maybe<AssetLinkingCollections>;
  size: Maybe<Scalars['Int']['output']>;
  sys: Sys;
  title: Maybe<Scalars['String']['output']>;
  url: Maybe<Scalars['String']['output']>;
  width: Maybe<Scalars['Int']['output']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetContentTypeArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetDescriptionArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetFileNameArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetHeightArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetLinkedFromArgs = {
  allowedLocales: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetSizeArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetTitleArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetUrlArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  transform: InputMaybe<ImageTransformOptions>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetWidthArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type AssetCollection = {
  __typename?: 'AssetCollection';
  items: Array<Maybe<Asset>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type AssetFilter = {
  AND: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  OR: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  contentType: InputMaybe<Scalars['String']['input']>;
  contentType_contains: InputMaybe<Scalars['String']['input']>;
  contentType_exists: InputMaybe<Scalars['Boolean']['input']>;
  contentType_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentType_not: InputMaybe<Scalars['String']['input']>;
  contentType_not_contains: InputMaybe<Scalars['String']['input']>;
  contentType_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  description: InputMaybe<Scalars['String']['input']>;
  description_contains: InputMaybe<Scalars['String']['input']>;
  description_exists: InputMaybe<Scalars['Boolean']['input']>;
  description_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not: InputMaybe<Scalars['String']['input']>;
  description_not_contains: InputMaybe<Scalars['String']['input']>;
  description_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fileName: InputMaybe<Scalars['String']['input']>;
  fileName_contains: InputMaybe<Scalars['String']['input']>;
  fileName_exists: InputMaybe<Scalars['Boolean']['input']>;
  fileName_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fileName_not: InputMaybe<Scalars['String']['input']>;
  fileName_not_contains: InputMaybe<Scalars['String']['input']>;
  fileName_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  height: InputMaybe<Scalars['Int']['input']>;
  height_exists: InputMaybe<Scalars['Boolean']['input']>;
  height_gt: InputMaybe<Scalars['Int']['input']>;
  height_gte: InputMaybe<Scalars['Int']['input']>;
  height_in: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  height_lt: InputMaybe<Scalars['Int']['input']>;
  height_lte: InputMaybe<Scalars['Int']['input']>;
  height_not: InputMaybe<Scalars['Int']['input']>;
  height_not_in: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  size: InputMaybe<Scalars['Int']['input']>;
  size_exists: InputMaybe<Scalars['Boolean']['input']>;
  size_gt: InputMaybe<Scalars['Int']['input']>;
  size_gte: InputMaybe<Scalars['Int']['input']>;
  size_in: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  size_lt: InputMaybe<Scalars['Int']['input']>;
  size_lte: InputMaybe<Scalars['Int']['input']>;
  size_not: InputMaybe<Scalars['Int']['input']>;
  size_not_in: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  sys: InputMaybe<SysFilter>;
  title: InputMaybe<Scalars['String']['input']>;
  title_contains: InputMaybe<Scalars['String']['input']>;
  title_exists: InputMaybe<Scalars['Boolean']['input']>;
  title_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not: InputMaybe<Scalars['String']['input']>;
  title_not_contains: InputMaybe<Scalars['String']['input']>;
  title_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url: InputMaybe<Scalars['String']['input']>;
  url_contains: InputMaybe<Scalars['String']['input']>;
  url_exists: InputMaybe<Scalars['Boolean']['input']>;
  url_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url_not: InputMaybe<Scalars['String']['input']>;
  url_not_contains: InputMaybe<Scalars['String']['input']>;
  url_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  width: InputMaybe<Scalars['Int']['input']>;
  width_exists: InputMaybe<Scalars['Boolean']['input']>;
  width_gt: InputMaybe<Scalars['Int']['input']>;
  width_gte: InputMaybe<Scalars['Int']['input']>;
  width_in: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  width_lt: InputMaybe<Scalars['Int']['input']>;
  width_lte: InputMaybe<Scalars['Int']['input']>;
  width_not: InputMaybe<Scalars['Int']['input']>;
  width_not_in: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type AssetLinkingCollections = {
  __typename?: 'AssetLinkingCollections';
  bannerCollection: Maybe<BannerCollection>;
  entryCollection: Maybe<EntryCollection>;
  projectCardCollection: Maybe<ProjectCardCollection>;
  seoDataCollection: Maybe<SeoDataCollection>;
  skillSetCollection: Maybe<SkillSetCollection>;
  userInfoCollection: Maybe<UserInfoCollection>;
};


export type AssetLinkingCollectionsBannerCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionsProjectCardCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionsSeoDataCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionsSkillSetCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionsUserInfoCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type AssetOrder =
  | 'contentType_ASC'
  | 'contentType_DESC'
  | 'fileName_ASC'
  | 'fileName_DESC'
  | 'height_ASC'
  | 'height_DESC'
  | 'size_ASC'
  | 'size_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'url_ASC'
  | 'url_DESC'
  | 'width_ASC'
  | 'width_DESC';

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/banner) */
export type Banner = Entry & _Node & {
  __typename?: 'Banner';
  _id: Scalars['ID']['output'];
  bannerAnimation: Maybe<Scalars['String']['output']>;
  bannerImage: Maybe<Asset>;
  contentfulMetadata: ContentfulMetadata;
  linkedFrom: Maybe<BannerLinkingCollections>;
  profilePicture: Maybe<Asset>;
  socialLinksCollection: Maybe<AssetCollection>;
  sys: Sys;
  title: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/banner) */
export type BannerBannerAnimationArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/banner) */
export type BannerBannerImageArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/banner) */
export type BannerLinkedFromArgs = {
  allowedLocales: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/banner) */
export type BannerProfilePictureArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/banner) */
export type BannerSocialLinksCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/banner) */
export type BannerTitleArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type BannerCollection = {
  __typename?: 'BannerCollection';
  items: Array<Maybe<Banner>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type BannerFilter = {
  AND: InputMaybe<Array<InputMaybe<BannerFilter>>>;
  OR: InputMaybe<Array<InputMaybe<BannerFilter>>>;
  bannerAnimation: InputMaybe<Scalars['String']['input']>;
  bannerAnimation_contains: InputMaybe<Scalars['String']['input']>;
  bannerAnimation_exists: InputMaybe<Scalars['Boolean']['input']>;
  bannerAnimation_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  bannerAnimation_not: InputMaybe<Scalars['String']['input']>;
  bannerAnimation_not_contains: InputMaybe<Scalars['String']['input']>;
  bannerAnimation_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  bannerImage_exists: InputMaybe<Scalars['Boolean']['input']>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  profilePicture_exists: InputMaybe<Scalars['Boolean']['input']>;
  socialLinksCollection_exists: InputMaybe<Scalars['Boolean']['input']>;
  sys: InputMaybe<SysFilter>;
  title: InputMaybe<Scalars['String']['input']>;
  title_contains: InputMaybe<Scalars['String']['input']>;
  title_exists: InputMaybe<Scalars['Boolean']['input']>;
  title_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not: InputMaybe<Scalars['String']['input']>;
  title_not_contains: InputMaybe<Scalars['String']['input']>;
  title_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type BannerLinkingCollections = {
  __typename?: 'BannerLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  userInfoCollection: Maybe<UserInfoCollection>;
};


export type BannerLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type BannerLinkingCollectionsUserInfoCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<BannerLinkingCollectionsUserInfoCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type BannerLinkingCollectionsUserInfoCollectionOrder =
  | 'defaultTheme_ASC'
  | 'defaultTheme_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'role_ASC'
  | 'role_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC'
  | 'withPageChangeButton_ASC'
  | 'withPageChangeButton_DESC';

export type BannerOrder =
  | 'bannerAnimation_ASC'
  | 'bannerAnimation_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/bioCard) */
export type BioCard = Entry & _Node & {
  __typename?: 'BioCard';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  icon: Maybe<Icon>;
  linkedFrom: Maybe<BioCardLinkingCollections>;
  sys: Sys;
  title: Maybe<Scalars['String']['output']>;
  value: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/bioCard) */
export type BioCardIconArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<IconFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/bioCard) */
export type BioCardLinkedFromArgs = {
  allowedLocales: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/bioCard) */
export type BioCardTitleArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/bioCard) */
export type BioCardValueArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type BioCardCollection = {
  __typename?: 'BioCardCollection';
  items: Array<Maybe<BioCard>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type BioCardFilter = {
  AND: InputMaybe<Array<InputMaybe<BioCardFilter>>>;
  OR: InputMaybe<Array<InputMaybe<BioCardFilter>>>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  icon: InputMaybe<CfIconNestedFilter>;
  icon_exists: InputMaybe<Scalars['Boolean']['input']>;
  sys: InputMaybe<SysFilter>;
  title: InputMaybe<Scalars['String']['input']>;
  title_contains: InputMaybe<Scalars['String']['input']>;
  title_exists: InputMaybe<Scalars['Boolean']['input']>;
  title_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not: InputMaybe<Scalars['String']['input']>;
  title_not_contains: InputMaybe<Scalars['String']['input']>;
  title_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  value: InputMaybe<Scalars['String']['input']>;
  value_contains: InputMaybe<Scalars['String']['input']>;
  value_exists: InputMaybe<Scalars['Boolean']['input']>;
  value_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  value_not: InputMaybe<Scalars['String']['input']>;
  value_not_contains: InputMaybe<Scalars['String']['input']>;
  value_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type BioCardLinkingCollections = {
  __typename?: 'BioCardLinkingCollections';
  centerContentAreaCollectionCollection: Maybe<CenterContentAreaCollectionCollection>;
  entryCollection: Maybe<EntryCollection>;
  homePageDataCollection: Maybe<HomePageDataCollection>;
};


export type BioCardLinkingCollectionsCenterContentAreaCollectionCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<BioCardLinkingCollectionsCenterContentAreaCollectionCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type BioCardLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type BioCardLinkingCollectionsHomePageDataCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<BioCardLinkingCollectionsHomePageDataCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type BioCardLinkingCollectionsCenterContentAreaCollectionCollectionOrder =
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

export type BioCardLinkingCollectionsHomePageDataCollectionOrder =
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

export type BioCardOrder =
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC'
  | 'value_ASC'
  | 'value_DESC';

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/centerContentAreaCollection) */
export type CenterContentAreaCollection = Entry & _Node & {
  __typename?: 'CenterContentAreaCollection';
  _id: Scalars['ID']['output'];
  contentCollection: Maybe<CenterContentAreaCollectionContentCollection>;
  contentfulMetadata: ContentfulMetadata;
  description: Maybe<CenterContentAreaCollectionDescription>;
  linkedFrom: Maybe<CenterContentAreaCollectionLinkingCollections>;
  sys: Sys;
  title: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/centerContentAreaCollection) */
export type CenterContentAreaCollectionContentCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<CenterContentAreaCollectionContentFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/centerContentAreaCollection) */
export type CenterContentAreaCollectionDescriptionArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/centerContentAreaCollection) */
export type CenterContentAreaCollectionLinkedFromArgs = {
  allowedLocales: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/centerContentAreaCollection) */
export type CenterContentAreaCollectionTitleArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type CenterContentAreaCollectionCollection = {
  __typename?: 'CenterContentAreaCollectionCollection';
  items: Array<Maybe<CenterContentAreaCollection>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type CenterContentAreaCollectionContentCollection = {
  __typename?: 'CenterContentAreaCollectionContentCollection';
  items: Array<Maybe<CenterContentAreaCollectionContentItem>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type CenterContentAreaCollectionContentFilter = {
  AND: InputMaybe<Array<InputMaybe<CenterContentAreaCollectionContentFilter>>>;
  OR: InputMaybe<Array<InputMaybe<CenterContentAreaCollectionContentFilter>>>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  sys: InputMaybe<SysFilter>;
};

export type CenterContentAreaCollectionContentItem = BioCard | JobExperience | ProjectCard;

export type CenterContentAreaCollectionDescription = {
  __typename?: 'CenterContentAreaCollectionDescription';
  json: Scalars['JSON']['output'];
  links: CenterContentAreaCollectionDescriptionLinks;
};

export type CenterContentAreaCollectionDescriptionAssets = {
  __typename?: 'CenterContentAreaCollectionDescriptionAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type CenterContentAreaCollectionDescriptionEntries = {
  __typename?: 'CenterContentAreaCollectionDescriptionEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type CenterContentAreaCollectionDescriptionLinks = {
  __typename?: 'CenterContentAreaCollectionDescriptionLinks';
  assets: CenterContentAreaCollectionDescriptionAssets;
  entries: CenterContentAreaCollectionDescriptionEntries;
  resources: CenterContentAreaCollectionDescriptionResources;
};

export type CenterContentAreaCollectionDescriptionResources = {
  __typename?: 'CenterContentAreaCollectionDescriptionResources';
  block: Array<CenterContentAreaCollectionDescriptionResourcesBlock>;
  hyperlink: Array<CenterContentAreaCollectionDescriptionResourcesHyperlink>;
  inline: Array<CenterContentAreaCollectionDescriptionResourcesInline>;
};

export type CenterContentAreaCollectionDescriptionResourcesBlock = ResourceLink & {
  __typename?: 'CenterContentAreaCollectionDescriptionResourcesBlock';
  sys: ResourceSys;
};

export type CenterContentAreaCollectionDescriptionResourcesHyperlink = ResourceLink & {
  __typename?: 'CenterContentAreaCollectionDescriptionResourcesHyperlink';
  sys: ResourceSys;
};

export type CenterContentAreaCollectionDescriptionResourcesInline = ResourceLink & {
  __typename?: 'CenterContentAreaCollectionDescriptionResourcesInline';
  sys: ResourceSys;
};

export type CenterContentAreaCollectionFilter = {
  AND: InputMaybe<Array<InputMaybe<CenterContentAreaCollectionFilter>>>;
  OR: InputMaybe<Array<InputMaybe<CenterContentAreaCollectionFilter>>>;
  content: InputMaybe<CfcontentMultiTypeNestedFilter>;
  contentCollection_exists: InputMaybe<Scalars['Boolean']['input']>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  description_contains: InputMaybe<Scalars['String']['input']>;
  description_exists: InputMaybe<Scalars['Boolean']['input']>;
  description_not_contains: InputMaybe<Scalars['String']['input']>;
  sys: InputMaybe<SysFilter>;
  title: InputMaybe<Scalars['String']['input']>;
  title_contains: InputMaybe<Scalars['String']['input']>;
  title_exists: InputMaybe<Scalars['Boolean']['input']>;
  title_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not: InputMaybe<Scalars['String']['input']>;
  title_not_contains: InputMaybe<Scalars['String']['input']>;
  title_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CenterContentAreaCollectionLinkingCollections = {
  __typename?: 'CenterContentAreaCollectionLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
};


export type CenterContentAreaCollectionLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type CenterContentAreaCollectionOrder =
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

export type ContentfulMetadata = {
  __typename?: 'ContentfulMetadata';
  concepts: Array<Maybe<TaxonomyConcept>>;
  tags: Array<Maybe<ContentfulTag>>;
};

export type ContentfulMetadataConceptsDescendantsFilter = {
  id_contains_all: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_none: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_some: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ContentfulMetadataConceptsFilter = {
  descendants: InputMaybe<ContentfulMetadataConceptsDescendantsFilter>;
  id_contains_all: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_none: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_some: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ContentfulMetadataFilter = {
  concepts: InputMaybe<ContentfulMetadataConceptsFilter>;
  concepts_exists: InputMaybe<Scalars['Boolean']['input']>;
  tags: InputMaybe<ContentfulMetadataTagsFilter>;
  tags_exists: InputMaybe<Scalars['Boolean']['input']>;
};

export type ContentfulMetadataTagsFilter = {
  id_contains_all: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_none: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_some: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/**
 * Represents a tag entity for finding and organizing content easily.
 *       Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-tags
 */
export type ContentfulTag = {
  __typename?: 'ContentfulTag';
  id: Maybe<Scalars['String']['output']>;
  name: Maybe<Scalars['String']['output']>;
};

export type Entry = {
  contentfulMetadata: ContentfulMetadata;
  sys: Sys;
};

export type EntryCollection = {
  __typename?: 'EntryCollection';
  items: Array<Maybe<Entry>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type EntryFilter = {
  AND: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  OR: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  sys: InputMaybe<SysFilter>;
};

export type EntryOrder =
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC';

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/experiencePageData) */
export type ExperiencePageData = Entry & _Node & {
  __typename?: 'ExperiencePageData';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  experiencesCollection: Maybe<ExperiencePageDataExperiencesCollection>;
  linkedFrom: Maybe<ExperiencePageDataLinkingCollections>;
  sys: Sys;
  title: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/experiencePageData) */
export type ExperiencePageDataExperiencesCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<ExperiencePageDataExperiencesCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<JobExperienceFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/experiencePageData) */
export type ExperiencePageDataLinkedFromArgs = {
  allowedLocales: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/experiencePageData) */
export type ExperiencePageDataTitleArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type ExperiencePageDataCollection = {
  __typename?: 'ExperiencePageDataCollection';
  items: Array<Maybe<ExperiencePageData>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ExperiencePageDataExperiencesCollection = {
  __typename?: 'ExperiencePageDataExperiencesCollection';
  items: Array<Maybe<JobExperience>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ExperiencePageDataExperiencesCollectionOrder =
  | 'company_ASC'
  | 'company_DESC'
  | 'currentlyWorking_ASC'
  | 'currentlyWorking_DESC'
  | 'endDate_ASC'
  | 'endDate_DESC'
  | 'location_ASC'
  | 'location_DESC'
  | 'position_ASC'
  | 'position_DESC'
  | 'startDate_ASC'
  | 'startDate_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'workedRemotely_ASC'
  | 'workedRemotely_DESC';

export type ExperiencePageDataFilter = {
  AND: InputMaybe<Array<InputMaybe<ExperiencePageDataFilter>>>;
  OR: InputMaybe<Array<InputMaybe<ExperiencePageDataFilter>>>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  experiences: InputMaybe<CfJobExperienceNestedFilter>;
  experiencesCollection_exists: InputMaybe<Scalars['Boolean']['input']>;
  sys: InputMaybe<SysFilter>;
  title: InputMaybe<Scalars['String']['input']>;
  title_contains: InputMaybe<Scalars['String']['input']>;
  title_exists: InputMaybe<Scalars['Boolean']['input']>;
  title_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not: InputMaybe<Scalars['String']['input']>;
  title_not_contains: InputMaybe<Scalars['String']['input']>;
  title_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ExperiencePageDataLinkingCollections = {
  __typename?: 'ExperiencePageDataLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  pageCollection: Maybe<PageCollection>;
};


export type ExperiencePageDataLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type ExperiencePageDataLinkingCollectionsPageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<ExperiencePageDataLinkingCollectionsPageCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type ExperiencePageDataLinkingCollectionsPageCollectionOrder =
  | 'contentAnimation_ASC'
  | 'contentAnimation_DESC'
  | 'headingAnimation_ASC'
  | 'headingAnimation_DESC'
  | 'path_ASC'
  | 'path_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

export type ExperiencePageDataOrder =
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/homePageData) */
export type HomePageData = Entry & _Node & {
  __typename?: 'HomePageData';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  description: Maybe<HomePageDataDescription>;
  infoCollection: Maybe<HomePageDataInfoCollection>;
  linkedFrom: Maybe<HomePageDataLinkingCollections>;
  sys: Sys;
  title: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/homePageData) */
export type HomePageDataDescriptionArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/homePageData) */
export type HomePageDataInfoCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<HomePageDataInfoCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<BioCardFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/homePageData) */
export type HomePageDataLinkedFromArgs = {
  allowedLocales: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/homePageData) */
export type HomePageDataTitleArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type HomePageDataCollection = {
  __typename?: 'HomePageDataCollection';
  items: Array<Maybe<HomePageData>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type HomePageDataDescription = {
  __typename?: 'HomePageDataDescription';
  json: Scalars['JSON']['output'];
  links: HomePageDataDescriptionLinks;
};

export type HomePageDataDescriptionAssets = {
  __typename?: 'HomePageDataDescriptionAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type HomePageDataDescriptionEntries = {
  __typename?: 'HomePageDataDescriptionEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type HomePageDataDescriptionLinks = {
  __typename?: 'HomePageDataDescriptionLinks';
  assets: HomePageDataDescriptionAssets;
  entries: HomePageDataDescriptionEntries;
  resources: HomePageDataDescriptionResources;
};

export type HomePageDataDescriptionResources = {
  __typename?: 'HomePageDataDescriptionResources';
  block: Array<HomePageDataDescriptionResourcesBlock>;
  hyperlink: Array<HomePageDataDescriptionResourcesHyperlink>;
  inline: Array<HomePageDataDescriptionResourcesInline>;
};

export type HomePageDataDescriptionResourcesBlock = ResourceLink & {
  __typename?: 'HomePageDataDescriptionResourcesBlock';
  sys: ResourceSys;
};

export type HomePageDataDescriptionResourcesHyperlink = ResourceLink & {
  __typename?: 'HomePageDataDescriptionResourcesHyperlink';
  sys: ResourceSys;
};

export type HomePageDataDescriptionResourcesInline = ResourceLink & {
  __typename?: 'HomePageDataDescriptionResourcesInline';
  sys: ResourceSys;
};

export type HomePageDataFilter = {
  AND: InputMaybe<Array<InputMaybe<HomePageDataFilter>>>;
  OR: InputMaybe<Array<InputMaybe<HomePageDataFilter>>>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  description_contains: InputMaybe<Scalars['String']['input']>;
  description_exists: InputMaybe<Scalars['Boolean']['input']>;
  description_not_contains: InputMaybe<Scalars['String']['input']>;
  info: InputMaybe<CfBioCardNestedFilter>;
  infoCollection_exists: InputMaybe<Scalars['Boolean']['input']>;
  sys: InputMaybe<SysFilter>;
  title: InputMaybe<Scalars['String']['input']>;
  title_contains: InputMaybe<Scalars['String']['input']>;
  title_exists: InputMaybe<Scalars['Boolean']['input']>;
  title_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not: InputMaybe<Scalars['String']['input']>;
  title_not_contains: InputMaybe<Scalars['String']['input']>;
  title_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type HomePageDataInfoCollection = {
  __typename?: 'HomePageDataInfoCollection';
  items: Array<Maybe<BioCard>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type HomePageDataInfoCollectionOrder =
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC'
  | 'value_ASC'
  | 'value_DESC';

export type HomePageDataLinkingCollections = {
  __typename?: 'HomePageDataLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  pageCollection: Maybe<PageCollection>;
};


export type HomePageDataLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type HomePageDataLinkingCollectionsPageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<HomePageDataLinkingCollectionsPageCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type HomePageDataLinkingCollectionsPageCollectionOrder =
  | 'contentAnimation_ASC'
  | 'contentAnimation_DESC'
  | 'headingAnimation_ASC'
  | 'headingAnimation_DESC'
  | 'path_ASC'
  | 'path_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

export type HomePageDataOrder =
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/icon) */
export type Icon = Entry & _Node & {
  __typename?: 'Icon';
  _id: Scalars['ID']['output'];
  classes: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  contentfulMetadata: ContentfulMetadata;
  iconCode: Maybe<Scalars['String']['output']>;
  linkedFrom: Maybe<IconLinkingCollections>;
  name: Maybe<Scalars['String']['output']>;
  showTooltip: Maybe<Scalars['Boolean']['output']>;
  sys: Sys;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/icon) */
export type IconClassesArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/icon) */
export type IconIconCodeArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/icon) */
export type IconLinkedFromArgs = {
  allowedLocales: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/icon) */
export type IconNameArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/icon) */
export type IconShowTooltipArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type IconCollection = {
  __typename?: 'IconCollection';
  items: Array<Maybe<Icon>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type IconFilter = {
  AND: InputMaybe<Array<InputMaybe<IconFilter>>>;
  OR: InputMaybe<Array<InputMaybe<IconFilter>>>;
  classes_contains_all: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  classes_contains_none: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  classes_contains_some: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  classes_exists: InputMaybe<Scalars['Boolean']['input']>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  iconCode: InputMaybe<Scalars['String']['input']>;
  iconCode_contains: InputMaybe<Scalars['String']['input']>;
  iconCode_exists: InputMaybe<Scalars['Boolean']['input']>;
  iconCode_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  iconCode_not: InputMaybe<Scalars['String']['input']>;
  iconCode_not_contains: InputMaybe<Scalars['String']['input']>;
  iconCode_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name: InputMaybe<Scalars['String']['input']>;
  name_contains: InputMaybe<Scalars['String']['input']>;
  name_exists: InputMaybe<Scalars['Boolean']['input']>;
  name_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not: InputMaybe<Scalars['String']['input']>;
  name_not_contains: InputMaybe<Scalars['String']['input']>;
  name_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  showTooltip: InputMaybe<Scalars['Boolean']['input']>;
  showTooltip_exists: InputMaybe<Scalars['Boolean']['input']>;
  showTooltip_not: InputMaybe<Scalars['Boolean']['input']>;
  sys: InputMaybe<SysFilter>;
};

export type IconLinkingCollections = {
  __typename?: 'IconLinkingCollections';
  bioCardCollection: Maybe<BioCardCollection>;
  entryCollection: Maybe<EntryCollection>;
  jobExperienceCollection: Maybe<JobExperienceCollection>;
  metaPageCollection: Maybe<MetaPageCollection>;
  pageCollection: Maybe<PageCollection>;
  projectCardCollection: Maybe<ProjectCardCollection>;
  skillGroupCollection: Maybe<SkillGroupCollection>;
  skillSetCollection: Maybe<SkillSetCollection>;
  userInfoCollection: Maybe<UserInfoCollection>;
};


export type IconLinkingCollectionsBioCardCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<IconLinkingCollectionsBioCardCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type IconLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type IconLinkingCollectionsJobExperienceCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<IconLinkingCollectionsJobExperienceCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type IconLinkingCollectionsMetaPageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<IconLinkingCollectionsMetaPageCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type IconLinkingCollectionsPageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<IconLinkingCollectionsPageCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type IconLinkingCollectionsProjectCardCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<IconLinkingCollectionsProjectCardCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type IconLinkingCollectionsSkillGroupCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<IconLinkingCollectionsSkillGroupCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type IconLinkingCollectionsSkillSetCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<IconLinkingCollectionsSkillSetCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type IconLinkingCollectionsUserInfoCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<IconLinkingCollectionsUserInfoCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type IconLinkingCollectionsBioCardCollectionOrder =
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC'
  | 'value_ASC'
  | 'value_DESC';

export type IconLinkingCollectionsJobExperienceCollectionOrder =
  | 'company_ASC'
  | 'company_DESC'
  | 'currentlyWorking_ASC'
  | 'currentlyWorking_DESC'
  | 'endDate_ASC'
  | 'endDate_DESC'
  | 'location_ASC'
  | 'location_DESC'
  | 'position_ASC'
  | 'position_DESC'
  | 'startDate_ASC'
  | 'startDate_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'workedRemotely_ASC'
  | 'workedRemotely_DESC';

export type IconLinkingCollectionsMetaPageCollectionOrder =
  | 'isDefaultPage_ASC'
  | 'isDefaultPage_DESC'
  | 'pageUrl_ASC'
  | 'pageUrl_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

export type IconLinkingCollectionsPageCollectionOrder =
  | 'contentAnimation_ASC'
  | 'contentAnimation_DESC'
  | 'headingAnimation_ASC'
  | 'headingAnimation_DESC'
  | 'path_ASC'
  | 'path_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

export type IconLinkingCollectionsProjectCardCollectionOrder =
  | 'deployedLink_ASC'
  | 'deployedLink_DESC'
  | 'description_ASC'
  | 'description_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

export type IconLinkingCollectionsSkillGroupCollectionOrder =
  | 'skillProgress_ASC'
  | 'skillProgress_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

export type IconLinkingCollectionsSkillSetCollectionOrder =
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

export type IconLinkingCollectionsUserInfoCollectionOrder =
  | 'defaultTheme_ASC'
  | 'defaultTheme_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'role_ASC'
  | 'role_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC'
  | 'withPageChangeButton_ASC'
  | 'withPageChangeButton_DESC';

export type IconOrder =
  | 'iconCode_ASC'
  | 'iconCode_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'showTooltip_ASC'
  | 'showTooltip_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC';

export type ImageFormat =
  /** AVIF image format. */
  | 'AVIF'
  /** JPG image format. */
  | 'JPG'
  /**
   * Progressive JPG format stores multiple passes of an image in progressively higher detail.
   *         When a progressive image is loading, the viewer will first see a lower quality pixelated version which
   *         will gradually improve in detail, until the image is fully downloaded. This is to display an image as
   *         early as possible to make the layout look as designed.
   */
  | 'JPG_PROGRESSIVE'
  /** PNG image format */
  | 'PNG'
  /**
   * 8-bit PNG images support up to 256 colors and weigh less than the standard 24-bit PNG equivalent.
   *         The 8-bit PNG format is mostly used for simple images, such as icons or logos.
   */
  | 'PNG8'
  /** WebP image format. */
  | 'WEBP';

export type ImageResizeFocus =
  /** Focus the resizing on the bottom. */
  | 'BOTTOM'
  /** Focus the resizing on the bottom left. */
  | 'BOTTOM_LEFT'
  /** Focus the resizing on the bottom right. */
  | 'BOTTOM_RIGHT'
  /** Focus the resizing on the center. */
  | 'CENTER'
  /** Focus the resizing on the largest face. */
  | 'FACE'
  /** Focus the resizing on the area containing all the faces. */
  | 'FACES'
  /** Focus the resizing on the left. */
  | 'LEFT'
  /** Focus the resizing on the right. */
  | 'RIGHT'
  /** Focus the resizing on the top. */
  | 'TOP'
  /** Focus the resizing on the top left. */
  | 'TOP_LEFT'
  /** Focus the resizing on the top right. */
  | 'TOP_RIGHT';

export type ImageResizeStrategy =
  /** Crops a part of the original image to fit into the specified dimensions. */
  | 'CROP'
  /** Resizes the image to the specified dimensions, cropping the image if needed. */
  | 'FILL'
  /** Resizes the image to fit into the specified dimensions. */
  | 'FIT'
  /**
   * Resizes the image to the specified dimensions, padding the image if needed.
   *         Uses desired background color as padding color.
   */
  | 'PAD'
  /** Resizes the image to the specified dimensions, changing the original aspect ratio if needed. */
  | 'SCALE'
  /** Creates a thumbnail from the image. */
  | 'THUMB';

export type ImageTransformOptions = {
  /**
   * Desired background color, used with corner radius or `PAD` resize strategy.
   *         Defaults to transparent (for `PNG`, `PNG8` and `WEBP`) or white (for `JPG` and `JPG_PROGRESSIVE`).
   */
  backgroundColor: InputMaybe<Scalars['HexColor']['input']>;
  /**
   * Desired corner radius in pixels.
   *         Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
   *         Defaults to `0`. Uses desired background color as padding color,
   *         unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
   */
  cornerRadius: InputMaybe<Scalars['Int']['input']>;
  /** Desired image format. Defaults to the original image format. */
  format: InputMaybe<ImageFormat>;
  /** Desired height in pixels. Defaults to the original image height. */
  height: InputMaybe<Scalars['Dimension']['input']>;
  /**
   * Desired quality of the image in percents.
   *         Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
   */
  quality: InputMaybe<Scalars['Quality']['input']>;
  /** Desired resize focus area. Defaults to `CENTER`. */
  resizeFocus: InputMaybe<ImageResizeFocus>;
  /** Desired resize strategy. Defaults to `FIT`. */
  resizeStrategy: InputMaybe<ImageResizeStrategy>;
  /** Desired width in pixels. Defaults to the original image width. */
  width: InputMaybe<Scalars['Dimension']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/jobExperience) */
export type JobExperience = Entry & _Node & {
  __typename?: 'JobExperience';
  _id: Scalars['ID']['output'];
  company: Maybe<Scalars['String']['output']>;
  companyIcon: Maybe<Icon>;
  contentfulMetadata: ContentfulMetadata;
  currentlyWorking: Maybe<Scalars['Boolean']['output']>;
  description: Maybe<JobExperienceDescription>;
  durationIcon: Maybe<Icon>;
  endDate: Maybe<Scalars['DateTime']['output']>;
  linkedFrom: Maybe<JobExperienceLinkingCollections>;
  location: Maybe<Scalars['String']['output']>;
  locationIcon: Maybe<Icon>;
  position: Maybe<Scalars['String']['output']>;
  roleIcon: Maybe<Icon>;
  startDate: Maybe<Scalars['DateTime']['output']>;
  sys: Sys;
  techStack: Maybe<SkillGroup>;
  techStackIcon: Maybe<Icon>;
  workedRemotely: Maybe<Scalars['Boolean']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/jobExperience) */
export type JobExperienceCompanyArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/jobExperience) */
export type JobExperienceCompanyIconArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<IconFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/jobExperience) */
export type JobExperienceCurrentlyWorkingArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/jobExperience) */
export type JobExperienceDescriptionArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/jobExperience) */
export type JobExperienceDurationIconArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<IconFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/jobExperience) */
export type JobExperienceEndDateArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/jobExperience) */
export type JobExperienceLinkedFromArgs = {
  allowedLocales: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/jobExperience) */
export type JobExperienceLocationArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/jobExperience) */
export type JobExperienceLocationIconArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<IconFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/jobExperience) */
export type JobExperiencePositionArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/jobExperience) */
export type JobExperienceRoleIconArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<IconFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/jobExperience) */
export type JobExperienceStartDateArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/jobExperience) */
export type JobExperienceTechStackArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<SkillGroupFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/jobExperience) */
export type JobExperienceTechStackIconArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<IconFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/jobExperience) */
export type JobExperienceWorkedRemotelyArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type JobExperienceCollection = {
  __typename?: 'JobExperienceCollection';
  items: Array<Maybe<JobExperience>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type JobExperienceDescription = {
  __typename?: 'JobExperienceDescription';
  json: Scalars['JSON']['output'];
  links: JobExperienceDescriptionLinks;
};

export type JobExperienceDescriptionAssets = {
  __typename?: 'JobExperienceDescriptionAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type JobExperienceDescriptionEntries = {
  __typename?: 'JobExperienceDescriptionEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type JobExperienceDescriptionLinks = {
  __typename?: 'JobExperienceDescriptionLinks';
  assets: JobExperienceDescriptionAssets;
  entries: JobExperienceDescriptionEntries;
  resources: JobExperienceDescriptionResources;
};

export type JobExperienceDescriptionResources = {
  __typename?: 'JobExperienceDescriptionResources';
  block: Array<JobExperienceDescriptionResourcesBlock>;
  hyperlink: Array<JobExperienceDescriptionResourcesHyperlink>;
  inline: Array<JobExperienceDescriptionResourcesInline>;
};

export type JobExperienceDescriptionResourcesBlock = ResourceLink & {
  __typename?: 'JobExperienceDescriptionResourcesBlock';
  sys: ResourceSys;
};

export type JobExperienceDescriptionResourcesHyperlink = ResourceLink & {
  __typename?: 'JobExperienceDescriptionResourcesHyperlink';
  sys: ResourceSys;
};

export type JobExperienceDescriptionResourcesInline = ResourceLink & {
  __typename?: 'JobExperienceDescriptionResourcesInline';
  sys: ResourceSys;
};

export type JobExperienceFilter = {
  AND: InputMaybe<Array<InputMaybe<JobExperienceFilter>>>;
  OR: InputMaybe<Array<InputMaybe<JobExperienceFilter>>>;
  company: InputMaybe<Scalars['String']['input']>;
  companyIcon: InputMaybe<CfIconNestedFilter>;
  companyIcon_exists: InputMaybe<Scalars['Boolean']['input']>;
  company_contains: InputMaybe<Scalars['String']['input']>;
  company_exists: InputMaybe<Scalars['Boolean']['input']>;
  company_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  company_not: InputMaybe<Scalars['String']['input']>;
  company_not_contains: InputMaybe<Scalars['String']['input']>;
  company_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  currentlyWorking: InputMaybe<Scalars['Boolean']['input']>;
  currentlyWorking_exists: InputMaybe<Scalars['Boolean']['input']>;
  currentlyWorking_not: InputMaybe<Scalars['Boolean']['input']>;
  description_contains: InputMaybe<Scalars['String']['input']>;
  description_exists: InputMaybe<Scalars['Boolean']['input']>;
  description_not_contains: InputMaybe<Scalars['String']['input']>;
  durationIcon: InputMaybe<CfIconNestedFilter>;
  durationIcon_exists: InputMaybe<Scalars['Boolean']['input']>;
  endDate: InputMaybe<Scalars['DateTime']['input']>;
  endDate_exists: InputMaybe<Scalars['Boolean']['input']>;
  endDate_gt: InputMaybe<Scalars['DateTime']['input']>;
  endDate_gte: InputMaybe<Scalars['DateTime']['input']>;
  endDate_in: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  endDate_lt: InputMaybe<Scalars['DateTime']['input']>;
  endDate_lte: InputMaybe<Scalars['DateTime']['input']>;
  endDate_not: InputMaybe<Scalars['DateTime']['input']>;
  endDate_not_in: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  location: InputMaybe<Scalars['String']['input']>;
  locationIcon: InputMaybe<CfIconNestedFilter>;
  locationIcon_exists: InputMaybe<Scalars['Boolean']['input']>;
  location_contains: InputMaybe<Scalars['String']['input']>;
  location_exists: InputMaybe<Scalars['Boolean']['input']>;
  location_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  location_not: InputMaybe<Scalars['String']['input']>;
  location_not_contains: InputMaybe<Scalars['String']['input']>;
  location_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  position: InputMaybe<Scalars['String']['input']>;
  position_contains: InputMaybe<Scalars['String']['input']>;
  position_exists: InputMaybe<Scalars['Boolean']['input']>;
  position_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  position_not: InputMaybe<Scalars['String']['input']>;
  position_not_contains: InputMaybe<Scalars['String']['input']>;
  position_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  roleIcon: InputMaybe<CfIconNestedFilter>;
  roleIcon_exists: InputMaybe<Scalars['Boolean']['input']>;
  startDate: InputMaybe<Scalars['DateTime']['input']>;
  startDate_exists: InputMaybe<Scalars['Boolean']['input']>;
  startDate_gt: InputMaybe<Scalars['DateTime']['input']>;
  startDate_gte: InputMaybe<Scalars['DateTime']['input']>;
  startDate_in: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  startDate_lt: InputMaybe<Scalars['DateTime']['input']>;
  startDate_lte: InputMaybe<Scalars['DateTime']['input']>;
  startDate_not: InputMaybe<Scalars['DateTime']['input']>;
  startDate_not_in: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  sys: InputMaybe<SysFilter>;
  techStack: InputMaybe<CfSkillGroupNestedFilter>;
  techStackIcon: InputMaybe<CfIconNestedFilter>;
  techStackIcon_exists: InputMaybe<Scalars['Boolean']['input']>;
  techStack_exists: InputMaybe<Scalars['Boolean']['input']>;
  workedRemotely: InputMaybe<Scalars['Boolean']['input']>;
  workedRemotely_exists: InputMaybe<Scalars['Boolean']['input']>;
  workedRemotely_not: InputMaybe<Scalars['Boolean']['input']>;
};

export type JobExperienceLinkingCollections = {
  __typename?: 'JobExperienceLinkingCollections';
  centerContentAreaCollectionCollection: Maybe<CenterContentAreaCollectionCollection>;
  entryCollection: Maybe<EntryCollection>;
  experiencePageDataCollection: Maybe<ExperiencePageDataCollection>;
};


export type JobExperienceLinkingCollectionsCenterContentAreaCollectionCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<JobExperienceLinkingCollectionsCenterContentAreaCollectionCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type JobExperienceLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type JobExperienceLinkingCollectionsExperiencePageDataCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<JobExperienceLinkingCollectionsExperiencePageDataCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type JobExperienceLinkingCollectionsCenterContentAreaCollectionCollectionOrder =
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

export type JobExperienceLinkingCollectionsExperiencePageDataCollectionOrder =
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

export type JobExperienceOrder =
  | 'company_ASC'
  | 'company_DESC'
  | 'currentlyWorking_ASC'
  | 'currentlyWorking_DESC'
  | 'endDate_ASC'
  | 'endDate_DESC'
  | 'location_ASC'
  | 'location_DESC'
  | 'position_ASC'
  | 'position_DESC'
  | 'startDate_ASC'
  | 'startDate_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'workedRemotely_ASC'
  | 'workedRemotely_DESC';

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/layoutSettings) */
export type LayoutSettings = Entry & _Node & {
  __typename?: 'LayoutSettings';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  drawerSide: Maybe<Scalars['String']['output']>;
  drawerVariant: Maybe<Scalars['String']['output']>;
  linkedFrom: Maybe<LayoutSettingsLinkingCollections>;
  sys: Sys;
  title: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/layoutSettings) */
export type LayoutSettingsDrawerSideArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/layoutSettings) */
export type LayoutSettingsDrawerVariantArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/layoutSettings) */
export type LayoutSettingsLinkedFromArgs = {
  allowedLocales: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/layoutSettings) */
export type LayoutSettingsTitleArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type LayoutSettingsCollection = {
  __typename?: 'LayoutSettingsCollection';
  items: Array<Maybe<LayoutSettings>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type LayoutSettingsFilter = {
  AND: InputMaybe<Array<InputMaybe<LayoutSettingsFilter>>>;
  OR: InputMaybe<Array<InputMaybe<LayoutSettingsFilter>>>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  drawerSide: InputMaybe<Scalars['String']['input']>;
  drawerSide_contains: InputMaybe<Scalars['String']['input']>;
  drawerSide_exists: InputMaybe<Scalars['Boolean']['input']>;
  drawerSide_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  drawerSide_not: InputMaybe<Scalars['String']['input']>;
  drawerSide_not_contains: InputMaybe<Scalars['String']['input']>;
  drawerSide_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  drawerVariant: InputMaybe<Scalars['String']['input']>;
  drawerVariant_contains: InputMaybe<Scalars['String']['input']>;
  drawerVariant_exists: InputMaybe<Scalars['Boolean']['input']>;
  drawerVariant_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  drawerVariant_not: InputMaybe<Scalars['String']['input']>;
  drawerVariant_not_contains: InputMaybe<Scalars['String']['input']>;
  drawerVariant_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys: InputMaybe<SysFilter>;
  title: InputMaybe<Scalars['String']['input']>;
  title_contains: InputMaybe<Scalars['String']['input']>;
  title_exists: InputMaybe<Scalars['Boolean']['input']>;
  title_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not: InputMaybe<Scalars['String']['input']>;
  title_not_contains: InputMaybe<Scalars['String']['input']>;
  title_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type LayoutSettingsLinkingCollections = {
  __typename?: 'LayoutSettingsLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  userInfoCollection: Maybe<UserInfoCollection>;
};


export type LayoutSettingsLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type LayoutSettingsLinkingCollectionsUserInfoCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<LayoutSettingsLinkingCollectionsUserInfoCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type LayoutSettingsLinkingCollectionsUserInfoCollectionOrder =
  | 'defaultTheme_ASC'
  | 'defaultTheme_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'role_ASC'
  | 'role_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC'
  | 'withPageChangeButton_ASC'
  | 'withPageChangeButton_DESC';

export type LayoutSettingsOrder =
  | 'drawerSide_ASC'
  | 'drawerSide_DESC'
  | 'drawerVariant_ASC'
  | 'drawerVariant_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/metaPage) */
export type MetaPage = Entry & _Node & {
  __typename?: 'MetaPage';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  isDefaultPage: Maybe<Scalars['Boolean']['output']>;
  linkedFrom: Maybe<MetaPageLinkingCollections>;
  pageIcon: Maybe<Icon>;
  pageUrl: Maybe<Scalars['String']['output']>;
  sys: Sys;
  title: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/metaPage) */
export type MetaPageIsDefaultPageArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/metaPage) */
export type MetaPageLinkedFromArgs = {
  allowedLocales: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/metaPage) */
export type MetaPagePageIconArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<IconFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/metaPage) */
export type MetaPagePageUrlArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/metaPage) */
export type MetaPageTitleArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type MetaPageCollection = {
  __typename?: 'MetaPageCollection';
  items: Array<Maybe<MetaPage>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type MetaPageFilter = {
  AND: InputMaybe<Array<InputMaybe<MetaPageFilter>>>;
  OR: InputMaybe<Array<InputMaybe<MetaPageFilter>>>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  isDefaultPage: InputMaybe<Scalars['Boolean']['input']>;
  isDefaultPage_exists: InputMaybe<Scalars['Boolean']['input']>;
  isDefaultPage_not: InputMaybe<Scalars['Boolean']['input']>;
  pageIcon: InputMaybe<CfIconNestedFilter>;
  pageIcon_exists: InputMaybe<Scalars['Boolean']['input']>;
  pageUrl: InputMaybe<Scalars['String']['input']>;
  pageUrl_contains: InputMaybe<Scalars['String']['input']>;
  pageUrl_exists: InputMaybe<Scalars['Boolean']['input']>;
  pageUrl_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pageUrl_not: InputMaybe<Scalars['String']['input']>;
  pageUrl_not_contains: InputMaybe<Scalars['String']['input']>;
  pageUrl_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys: InputMaybe<SysFilter>;
  title: InputMaybe<Scalars['String']['input']>;
  title_contains: InputMaybe<Scalars['String']['input']>;
  title_exists: InputMaybe<Scalars['Boolean']['input']>;
  title_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not: InputMaybe<Scalars['String']['input']>;
  title_not_contains: InputMaybe<Scalars['String']['input']>;
  title_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type MetaPageLinkingCollections = {
  __typename?: 'MetaPageLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  userInfoCollection: Maybe<UserInfoCollection>;
};


export type MetaPageLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type MetaPageLinkingCollectionsUserInfoCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<MetaPageLinkingCollectionsUserInfoCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type MetaPageLinkingCollectionsUserInfoCollectionOrder =
  | 'defaultTheme_ASC'
  | 'defaultTheme_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'role_ASC'
  | 'role_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC'
  | 'withPageChangeButton_ASC'
  | 'withPageChangeButton_DESC';

export type MetaPageOrder =
  | 'isDefaultPage_ASC'
  | 'isDefaultPage_DESC'
  | 'pageUrl_ASC'
  | 'pageUrl_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/page) */
export type Page = Entry & _Node & {
  __typename?: 'Page';
  _id: Scalars['ID']['output'];
  contentAnimation: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  headingAnimation: Maybe<Scalars['String']['output']>;
  linkedFrom: Maybe<PageLinkingCollections>;
  pageData: Maybe<PagePageData>;
  pageIcon: Maybe<Icon>;
  pageSeo: Maybe<SeoData>;
  path: Maybe<Scalars['String']['output']>;
  sys: Sys;
  title: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/page) */
export type PageContentAnimationArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/page) */
export type PageHeadingAnimationArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/page) */
export type PageLinkedFromArgs = {
  allowedLocales: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/page) */
export type PagePageDataArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/page) */
export type PagePageIconArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<IconFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/page) */
export type PagePageSeoArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<SeoDataFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/page) */
export type PagePathArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/page) */
export type PageTitleArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type PageCollection = {
  __typename?: 'PageCollection';
  items: Array<Maybe<Page>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PageFilter = {
  AND: InputMaybe<Array<InputMaybe<PageFilter>>>;
  OR: InputMaybe<Array<InputMaybe<PageFilter>>>;
  contentAnimation: InputMaybe<Scalars['String']['input']>;
  contentAnimation_contains: InputMaybe<Scalars['String']['input']>;
  contentAnimation_exists: InputMaybe<Scalars['Boolean']['input']>;
  contentAnimation_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentAnimation_not: InputMaybe<Scalars['String']['input']>;
  contentAnimation_not_contains: InputMaybe<Scalars['String']['input']>;
  contentAnimation_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  headingAnimation: InputMaybe<Scalars['String']['input']>;
  headingAnimation_contains: InputMaybe<Scalars['String']['input']>;
  headingAnimation_exists: InputMaybe<Scalars['Boolean']['input']>;
  headingAnimation_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  headingAnimation_not: InputMaybe<Scalars['String']['input']>;
  headingAnimation_not_contains: InputMaybe<Scalars['String']['input']>;
  headingAnimation_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pageData_exists: InputMaybe<Scalars['Boolean']['input']>;
  pageIcon: InputMaybe<CfIconNestedFilter>;
  pageIcon_exists: InputMaybe<Scalars['Boolean']['input']>;
  pageSeo: InputMaybe<CfSeoDataNestedFilter>;
  pageSeo_exists: InputMaybe<Scalars['Boolean']['input']>;
  path: InputMaybe<Scalars['String']['input']>;
  path_contains: InputMaybe<Scalars['String']['input']>;
  path_exists: InputMaybe<Scalars['Boolean']['input']>;
  path_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  path_not: InputMaybe<Scalars['String']['input']>;
  path_not_contains: InputMaybe<Scalars['String']['input']>;
  path_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys: InputMaybe<SysFilter>;
  title: InputMaybe<Scalars['String']['input']>;
  title_contains: InputMaybe<Scalars['String']['input']>;
  title_exists: InputMaybe<Scalars['Boolean']['input']>;
  title_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not: InputMaybe<Scalars['String']['input']>;
  title_not_contains: InputMaybe<Scalars['String']['input']>;
  title_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PageLinkingCollections = {
  __typename?: 'PageLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  userInfoCollection: Maybe<UserInfoCollection>;
};


export type PageLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type PageLinkingCollectionsUserInfoCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<PageLinkingCollectionsUserInfoCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type PageLinkingCollectionsUserInfoCollectionOrder =
  | 'defaultTheme_ASC'
  | 'defaultTheme_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'role_ASC'
  | 'role_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC'
  | 'withPageChangeButton_ASC'
  | 'withPageChangeButton_DESC';

export type PageOrder =
  | 'contentAnimation_ASC'
  | 'contentAnimation_DESC'
  | 'headingAnimation_ASC'
  | 'headingAnimation_DESC'
  | 'path_ASC'
  | 'path_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

export type PagePageData = ExperiencePageData | HomePageData | ProjectsPageData | SkillsPageData;

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/projectCard) */
export type ProjectCard = Entry & _Node & {
  __typename?: 'ProjectCard';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  deployedLink: Maybe<Scalars['String']['output']>;
  deployedLinkIcon: Maybe<Icon>;
  description: Maybe<Scalars['String']['output']>;
  linkedFrom: Maybe<ProjectCardLinkingCollections>;
  sys: Sys;
  thumbnail: Maybe<Asset>;
  title: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/projectCard) */
export type ProjectCardDeployedLinkArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/projectCard) */
export type ProjectCardDeployedLinkIconArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<IconFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/projectCard) */
export type ProjectCardDescriptionArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/projectCard) */
export type ProjectCardLinkedFromArgs = {
  allowedLocales: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/projectCard) */
export type ProjectCardThumbnailArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/projectCard) */
export type ProjectCardTitleArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type ProjectCardCollection = {
  __typename?: 'ProjectCardCollection';
  items: Array<Maybe<ProjectCard>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ProjectCardFilter = {
  AND: InputMaybe<Array<InputMaybe<ProjectCardFilter>>>;
  OR: InputMaybe<Array<InputMaybe<ProjectCardFilter>>>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  deployedLink: InputMaybe<Scalars['String']['input']>;
  deployedLinkIcon: InputMaybe<CfIconNestedFilter>;
  deployedLinkIcon_exists: InputMaybe<Scalars['Boolean']['input']>;
  deployedLink_contains: InputMaybe<Scalars['String']['input']>;
  deployedLink_exists: InputMaybe<Scalars['Boolean']['input']>;
  deployedLink_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  deployedLink_not: InputMaybe<Scalars['String']['input']>;
  deployedLink_not_contains: InputMaybe<Scalars['String']['input']>;
  deployedLink_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description: InputMaybe<Scalars['String']['input']>;
  description_contains: InputMaybe<Scalars['String']['input']>;
  description_exists: InputMaybe<Scalars['Boolean']['input']>;
  description_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not: InputMaybe<Scalars['String']['input']>;
  description_not_contains: InputMaybe<Scalars['String']['input']>;
  description_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys: InputMaybe<SysFilter>;
  thumbnail_exists: InputMaybe<Scalars['Boolean']['input']>;
  title: InputMaybe<Scalars['String']['input']>;
  title_contains: InputMaybe<Scalars['String']['input']>;
  title_exists: InputMaybe<Scalars['Boolean']['input']>;
  title_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not: InputMaybe<Scalars['String']['input']>;
  title_not_contains: InputMaybe<Scalars['String']['input']>;
  title_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ProjectCardLinkingCollections = {
  __typename?: 'ProjectCardLinkingCollections';
  centerContentAreaCollectionCollection: Maybe<CenterContentAreaCollectionCollection>;
  entryCollection: Maybe<EntryCollection>;
  projectsPageDataCollection: Maybe<ProjectsPageDataCollection>;
};


export type ProjectCardLinkingCollectionsCenterContentAreaCollectionCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<ProjectCardLinkingCollectionsCenterContentAreaCollectionCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type ProjectCardLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type ProjectCardLinkingCollectionsProjectsPageDataCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<ProjectCardLinkingCollectionsProjectsPageDataCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type ProjectCardLinkingCollectionsCenterContentAreaCollectionCollectionOrder =
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

export type ProjectCardLinkingCollectionsProjectsPageDataCollectionOrder =
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

export type ProjectCardOrder =
  | 'deployedLink_ASC'
  | 'deployedLink_DESC'
  | 'description_ASC'
  | 'description_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/projectsPageData) */
export type ProjectsPageData = Entry & _Node & {
  __typename?: 'ProjectsPageData';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  linkedFrom: Maybe<ProjectsPageDataLinkingCollections>;
  projectsCollection: Maybe<ProjectsPageDataProjectsCollection>;
  sys: Sys;
  title: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/projectsPageData) */
export type ProjectsPageDataLinkedFromArgs = {
  allowedLocales: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/projectsPageData) */
export type ProjectsPageDataProjectsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<ProjectsPageDataProjectsCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<ProjectCardFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/projectsPageData) */
export type ProjectsPageDataTitleArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type ProjectsPageDataCollection = {
  __typename?: 'ProjectsPageDataCollection';
  items: Array<Maybe<ProjectsPageData>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ProjectsPageDataFilter = {
  AND: InputMaybe<Array<InputMaybe<ProjectsPageDataFilter>>>;
  OR: InputMaybe<Array<InputMaybe<ProjectsPageDataFilter>>>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  projects: InputMaybe<CfProjectCardNestedFilter>;
  projectsCollection_exists: InputMaybe<Scalars['Boolean']['input']>;
  sys: InputMaybe<SysFilter>;
  title: InputMaybe<Scalars['String']['input']>;
  title_contains: InputMaybe<Scalars['String']['input']>;
  title_exists: InputMaybe<Scalars['Boolean']['input']>;
  title_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not: InputMaybe<Scalars['String']['input']>;
  title_not_contains: InputMaybe<Scalars['String']['input']>;
  title_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ProjectsPageDataLinkingCollections = {
  __typename?: 'ProjectsPageDataLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  pageCollection: Maybe<PageCollection>;
};


export type ProjectsPageDataLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type ProjectsPageDataLinkingCollectionsPageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<ProjectsPageDataLinkingCollectionsPageCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type ProjectsPageDataLinkingCollectionsPageCollectionOrder =
  | 'contentAnimation_ASC'
  | 'contentAnimation_DESC'
  | 'headingAnimation_ASC'
  | 'headingAnimation_DESC'
  | 'path_ASC'
  | 'path_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

export type ProjectsPageDataOrder =
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

export type ProjectsPageDataProjectsCollection = {
  __typename?: 'ProjectsPageDataProjectsCollection';
  items: Array<Maybe<ProjectCard>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ProjectsPageDataProjectsCollectionOrder =
  | 'deployedLink_ASC'
  | 'deployedLink_DESC'
  | 'description_ASC'
  | 'description_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

export type Query = {
  __typename?: 'Query';
  _node: Maybe<_Node>;
  _nodes: Array<Maybe<_Node>>;
  asset: Maybe<Asset>;
  assetCollection: Maybe<AssetCollection>;
  banner: Maybe<Banner>;
  bannerCollection: Maybe<BannerCollection>;
  bioCard: Maybe<BioCard>;
  bioCardCollection: Maybe<BioCardCollection>;
  centerContentAreaCollection: Maybe<CenterContentAreaCollection>;
  centerContentAreaCollectionCollection: Maybe<CenterContentAreaCollectionCollection>;
  entryCollection: Maybe<EntryCollection>;
  experiencePageData: Maybe<ExperiencePageData>;
  experiencePageDataCollection: Maybe<ExperiencePageDataCollection>;
  homePageData: Maybe<HomePageData>;
  homePageDataCollection: Maybe<HomePageDataCollection>;
  icon: Maybe<Icon>;
  iconCollection: Maybe<IconCollection>;
  jobExperience: Maybe<JobExperience>;
  jobExperienceCollection: Maybe<JobExperienceCollection>;
  layoutSettings: Maybe<LayoutSettings>;
  layoutSettingsCollection: Maybe<LayoutSettingsCollection>;
  metaPage: Maybe<MetaPage>;
  metaPageCollection: Maybe<MetaPageCollection>;
  page: Maybe<Page>;
  pageCollection: Maybe<PageCollection>;
  projectCard: Maybe<ProjectCard>;
  projectCardCollection: Maybe<ProjectCardCollection>;
  projectsPageData: Maybe<ProjectsPageData>;
  projectsPageDataCollection: Maybe<ProjectsPageDataCollection>;
  seoData: Maybe<SeoData>;
  seoDataCollection: Maybe<SeoDataCollection>;
  skillGroup: Maybe<SkillGroup>;
  skillGroupCollection: Maybe<SkillGroupCollection>;
  skillSet: Maybe<SkillSet>;
  skillSetCollection: Maybe<SkillSetCollection>;
  skillsPageData: Maybe<SkillsPageData>;
  skillsPageDataCollection: Maybe<SkillsPageDataCollection>;
  userInfo: Maybe<UserInfo>;
  userInfoCollection: Maybe<UserInfoCollection>;
};


export type Query_NodeArgs = {
  id: Scalars['ID']['input'];
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type Query_NodesArgs = {
  ids: Array<Scalars['ID']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAssetArgs = {
  id: Scalars['String']['input'];
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryAssetCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<AssetOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<AssetFilter>;
};


export type QueryBannerArgs = {
  id: Scalars['String']['input'];
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryBannerCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<BannerOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<BannerFilter>;
};


export type QueryBioCardArgs = {
  id: Scalars['String']['input'];
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryBioCardCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<BioCardOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<BioCardFilter>;
};


export type QueryCenterContentAreaCollectionArgs = {
  id: Scalars['String']['input'];
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryCenterContentAreaCollectionCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<CenterContentAreaCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<CenterContentAreaCollectionFilter>;
};


export type QueryEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<EntryOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<EntryFilter>;
};


export type QueryExperiencePageDataArgs = {
  id: Scalars['String']['input'];
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryExperiencePageDataCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<ExperiencePageDataOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<ExperiencePageDataFilter>;
};


export type QueryHomePageDataArgs = {
  id: Scalars['String']['input'];
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryHomePageDataCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<HomePageDataOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<HomePageDataFilter>;
};


export type QueryIconArgs = {
  id: Scalars['String']['input'];
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryIconCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<IconOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<IconFilter>;
};


export type QueryJobExperienceArgs = {
  id: Scalars['String']['input'];
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryJobExperienceCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<JobExperienceOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<JobExperienceFilter>;
};


export type QueryLayoutSettingsArgs = {
  id: Scalars['String']['input'];
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryLayoutSettingsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<LayoutSettingsOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<LayoutSettingsFilter>;
};


export type QueryMetaPageArgs = {
  id: Scalars['String']['input'];
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryMetaPageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<MetaPageOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<MetaPageFilter>;
};


export type QueryPageArgs = {
  id: Scalars['String']['input'];
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryPageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<PageOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<PageFilter>;
};


export type QueryProjectCardArgs = {
  id: Scalars['String']['input'];
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryProjectCardCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<ProjectCardOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<ProjectCardFilter>;
};


export type QueryProjectsPageDataArgs = {
  id: Scalars['String']['input'];
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryProjectsPageDataCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<ProjectsPageDataOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<ProjectsPageDataFilter>;
};


export type QuerySeoDataArgs = {
  id: Scalars['String']['input'];
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type QuerySeoDataCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<SeoDataOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<SeoDataFilter>;
};


export type QuerySkillGroupArgs = {
  id: Scalars['String']['input'];
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type QuerySkillGroupCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<SkillGroupOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<SkillGroupFilter>;
};


export type QuerySkillSetArgs = {
  id: Scalars['String']['input'];
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type QuerySkillSetCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<SkillSetOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<SkillSetFilter>;
};


export type QuerySkillsPageDataArgs = {
  id: Scalars['String']['input'];
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type QuerySkillsPageDataCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<SkillsPageDataOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<SkillsPageDataFilter>;
};


export type QueryUserInfoArgs = {
  id: Scalars['String']['input'];
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryUserInfoCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<UserInfoOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<UserInfoFilter>;
};

export type ResourceLink = {
  sys: ResourceSys;
};

export type ResourceSys = {
  __typename?: 'ResourceSys';
  linkType: Scalars['String']['output'];
  urn: Scalars['String']['output'];
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/seoData) */
export type SeoData = Entry & _Node & {
  __typename?: 'SeoData';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  countryName: Maybe<Scalars['String']['output']>;
  creator: Maybe<Scalars['String']['output']>;
  description: Maybe<Scalars['String']['output']>;
  favicon: Maybe<Asset>;
  imagesCollection: Maybe<AssetCollection>;
  keywords: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  linkedFrom: Maybe<SeoDataLinkingCollections>;
  publisher: Maybe<Scalars['String']['output']>;
  siteName: Maybe<Scalars['String']['output']>;
  sys: Sys;
  title: Maybe<Scalars['String']['output']>;
  url: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/seoData) */
export type SeoDataCountryNameArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/seoData) */
export type SeoDataCreatorArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/seoData) */
export type SeoDataDescriptionArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/seoData) */
export type SeoDataFaviconArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/seoData) */
export type SeoDataImagesCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/seoData) */
export type SeoDataKeywordsArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/seoData) */
export type SeoDataLinkedFromArgs = {
  allowedLocales: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/seoData) */
export type SeoDataPublisherArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/seoData) */
export type SeoDataSiteNameArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/seoData) */
export type SeoDataTitleArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/seoData) */
export type SeoDataUrlArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type SeoDataCollection = {
  __typename?: 'SeoDataCollection';
  items: Array<Maybe<SeoData>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type SeoDataFilter = {
  AND: InputMaybe<Array<InputMaybe<SeoDataFilter>>>;
  OR: InputMaybe<Array<InputMaybe<SeoDataFilter>>>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  countryName: InputMaybe<Scalars['String']['input']>;
  countryName_contains: InputMaybe<Scalars['String']['input']>;
  countryName_exists: InputMaybe<Scalars['Boolean']['input']>;
  countryName_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  countryName_not: InputMaybe<Scalars['String']['input']>;
  countryName_not_contains: InputMaybe<Scalars['String']['input']>;
  countryName_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  creator: InputMaybe<Scalars['String']['input']>;
  creator_contains: InputMaybe<Scalars['String']['input']>;
  creator_exists: InputMaybe<Scalars['Boolean']['input']>;
  creator_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  creator_not: InputMaybe<Scalars['String']['input']>;
  creator_not_contains: InputMaybe<Scalars['String']['input']>;
  creator_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description: InputMaybe<Scalars['String']['input']>;
  description_contains: InputMaybe<Scalars['String']['input']>;
  description_exists: InputMaybe<Scalars['Boolean']['input']>;
  description_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not: InputMaybe<Scalars['String']['input']>;
  description_not_contains: InputMaybe<Scalars['String']['input']>;
  description_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  favicon_exists: InputMaybe<Scalars['Boolean']['input']>;
  imagesCollection_exists: InputMaybe<Scalars['Boolean']['input']>;
  keywords_contains_all: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  keywords_contains_none: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  keywords_contains_some: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  keywords_exists: InputMaybe<Scalars['Boolean']['input']>;
  publisher: InputMaybe<Scalars['String']['input']>;
  publisher_contains: InputMaybe<Scalars['String']['input']>;
  publisher_exists: InputMaybe<Scalars['Boolean']['input']>;
  publisher_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  publisher_not: InputMaybe<Scalars['String']['input']>;
  publisher_not_contains: InputMaybe<Scalars['String']['input']>;
  publisher_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  siteName: InputMaybe<Scalars['String']['input']>;
  siteName_contains: InputMaybe<Scalars['String']['input']>;
  siteName_exists: InputMaybe<Scalars['Boolean']['input']>;
  siteName_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  siteName_not: InputMaybe<Scalars['String']['input']>;
  siteName_not_contains: InputMaybe<Scalars['String']['input']>;
  siteName_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys: InputMaybe<SysFilter>;
  title: InputMaybe<Scalars['String']['input']>;
  title_contains: InputMaybe<Scalars['String']['input']>;
  title_exists: InputMaybe<Scalars['Boolean']['input']>;
  title_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not: InputMaybe<Scalars['String']['input']>;
  title_not_contains: InputMaybe<Scalars['String']['input']>;
  title_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url: InputMaybe<Scalars['String']['input']>;
  url_contains: InputMaybe<Scalars['String']['input']>;
  url_exists: InputMaybe<Scalars['Boolean']['input']>;
  url_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url_not: InputMaybe<Scalars['String']['input']>;
  url_not_contains: InputMaybe<Scalars['String']['input']>;
  url_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type SeoDataLinkingCollections = {
  __typename?: 'SeoDataLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  pageCollection: Maybe<PageCollection>;
};


export type SeoDataLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type SeoDataLinkingCollectionsPageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<SeoDataLinkingCollectionsPageCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type SeoDataLinkingCollectionsPageCollectionOrder =
  | 'contentAnimation_ASC'
  | 'contentAnimation_DESC'
  | 'headingAnimation_ASC'
  | 'headingAnimation_DESC'
  | 'path_ASC'
  | 'path_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

export type SeoDataOrder =
  | 'countryName_ASC'
  | 'countryName_DESC'
  | 'creator_ASC'
  | 'creator_DESC'
  | 'description_ASC'
  | 'description_DESC'
  | 'publisher_ASC'
  | 'publisher_DESC'
  | 'siteName_ASC'
  | 'siteName_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC'
  | 'url_ASC'
  | 'url_DESC';

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/skillGroup) */
export type SkillGroup = Entry & _Node & {
  __typename?: 'SkillGroup';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  linkedFrom: Maybe<SkillGroupLinkingCollections>;
  skillIconsCollection: Maybe<SkillGroupSkillIconsCollection>;
  skillProgress: Maybe<Scalars['Int']['output']>;
  sys: Sys;
  title: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/skillGroup) */
export type SkillGroupLinkedFromArgs = {
  allowedLocales: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/skillGroup) */
export type SkillGroupSkillIconsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<SkillGroupSkillIconsCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<IconFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/skillGroup) */
export type SkillGroupSkillProgressArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/skillGroup) */
export type SkillGroupTitleArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type SkillGroupCollection = {
  __typename?: 'SkillGroupCollection';
  items: Array<Maybe<SkillGroup>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type SkillGroupFilter = {
  AND: InputMaybe<Array<InputMaybe<SkillGroupFilter>>>;
  OR: InputMaybe<Array<InputMaybe<SkillGroupFilter>>>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  skillIcons: InputMaybe<CfIconNestedFilter>;
  skillIconsCollection_exists: InputMaybe<Scalars['Boolean']['input']>;
  skillProgress: InputMaybe<Scalars['Int']['input']>;
  skillProgress_exists: InputMaybe<Scalars['Boolean']['input']>;
  skillProgress_gt: InputMaybe<Scalars['Int']['input']>;
  skillProgress_gte: InputMaybe<Scalars['Int']['input']>;
  skillProgress_in: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  skillProgress_lt: InputMaybe<Scalars['Int']['input']>;
  skillProgress_lte: InputMaybe<Scalars['Int']['input']>;
  skillProgress_not: InputMaybe<Scalars['Int']['input']>;
  skillProgress_not_in: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  sys: InputMaybe<SysFilter>;
  title: InputMaybe<Scalars['String']['input']>;
  title_contains: InputMaybe<Scalars['String']['input']>;
  title_exists: InputMaybe<Scalars['Boolean']['input']>;
  title_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not: InputMaybe<Scalars['String']['input']>;
  title_not_contains: InputMaybe<Scalars['String']['input']>;
  title_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type SkillGroupLinkingCollections = {
  __typename?: 'SkillGroupLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  jobExperienceCollection: Maybe<JobExperienceCollection>;
  skillSetCollection: Maybe<SkillSetCollection>;
};


export type SkillGroupLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type SkillGroupLinkingCollectionsJobExperienceCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<SkillGroupLinkingCollectionsJobExperienceCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type SkillGroupLinkingCollectionsSkillSetCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<SkillGroupLinkingCollectionsSkillSetCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type SkillGroupLinkingCollectionsJobExperienceCollectionOrder =
  | 'company_ASC'
  | 'company_DESC'
  | 'currentlyWorking_ASC'
  | 'currentlyWorking_DESC'
  | 'endDate_ASC'
  | 'endDate_DESC'
  | 'location_ASC'
  | 'location_DESC'
  | 'position_ASC'
  | 'position_DESC'
  | 'startDate_ASC'
  | 'startDate_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'workedRemotely_ASC'
  | 'workedRemotely_DESC';

export type SkillGroupLinkingCollectionsSkillSetCollectionOrder =
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

export type SkillGroupOrder =
  | 'skillProgress_ASC'
  | 'skillProgress_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

export type SkillGroupSkillIconsCollection = {
  __typename?: 'SkillGroupSkillIconsCollection';
  items: Array<Maybe<Icon>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type SkillGroupSkillIconsCollectionOrder =
  | 'iconCode_ASC'
  | 'iconCode_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'showTooltip_ASC'
  | 'showTooltip_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC';

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/skillSet) */
export type SkillSet = Entry & _Node & {
  __typename?: 'SkillSet';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  icon: Maybe<Icon>;
  linkedFrom: Maybe<SkillSetLinkingCollections>;
  skillsArrayCollection: Maybe<SkillSetSkillsArrayCollection>;
  skillsetIcon: Maybe<Asset>;
  sys: Sys;
  title: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/skillSet) */
export type SkillSetIconArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<IconFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/skillSet) */
export type SkillSetLinkedFromArgs = {
  allowedLocales: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/skillSet) */
export type SkillSetSkillsArrayCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<SkillSetSkillsArrayCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<SkillGroupFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/skillSet) */
export type SkillSetSkillsetIconArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/skillSet) */
export type SkillSetTitleArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type SkillSetCollection = {
  __typename?: 'SkillSetCollection';
  items: Array<Maybe<SkillSet>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type SkillSetFilter = {
  AND: InputMaybe<Array<InputMaybe<SkillSetFilter>>>;
  OR: InputMaybe<Array<InputMaybe<SkillSetFilter>>>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  icon: InputMaybe<CfIconNestedFilter>;
  icon_exists: InputMaybe<Scalars['Boolean']['input']>;
  skillsArray: InputMaybe<CfSkillGroupNestedFilter>;
  skillsArrayCollection_exists: InputMaybe<Scalars['Boolean']['input']>;
  skillsetIcon_exists: InputMaybe<Scalars['Boolean']['input']>;
  sys: InputMaybe<SysFilter>;
  title: InputMaybe<Scalars['String']['input']>;
  title_contains: InputMaybe<Scalars['String']['input']>;
  title_exists: InputMaybe<Scalars['Boolean']['input']>;
  title_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not: InputMaybe<Scalars['String']['input']>;
  title_not_contains: InputMaybe<Scalars['String']['input']>;
  title_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type SkillSetLinkingCollections = {
  __typename?: 'SkillSetLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  skillsPageDataCollection: Maybe<SkillsPageDataCollection>;
};


export type SkillSetLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type SkillSetLinkingCollectionsSkillsPageDataCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<SkillSetLinkingCollectionsSkillsPageDataCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type SkillSetLinkingCollectionsSkillsPageDataCollectionOrder =
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

export type SkillSetOrder =
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

export type SkillSetSkillsArrayCollection = {
  __typename?: 'SkillSetSkillsArrayCollection';
  items: Array<Maybe<SkillGroup>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type SkillSetSkillsArrayCollectionOrder =
  | 'skillProgress_ASC'
  | 'skillProgress_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/skillsPageData) */
export type SkillsPageData = Entry & _Node & {
  __typename?: 'SkillsPageData';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  linkedFrom: Maybe<SkillsPageDataLinkingCollections>;
  skillsSetCollection: Maybe<SkillsPageDataSkillsSetCollection>;
  sys: Sys;
  title: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/skillsPageData) */
export type SkillsPageDataLinkedFromArgs = {
  allowedLocales: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/skillsPageData) */
export type SkillsPageDataSkillsSetCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<SkillsPageDataSkillsSetCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<SkillSetFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/skillsPageData) */
export type SkillsPageDataTitleArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type SkillsPageDataCollection = {
  __typename?: 'SkillsPageDataCollection';
  items: Array<Maybe<SkillsPageData>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type SkillsPageDataFilter = {
  AND: InputMaybe<Array<InputMaybe<SkillsPageDataFilter>>>;
  OR: InputMaybe<Array<InputMaybe<SkillsPageDataFilter>>>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  skillsSet: InputMaybe<CfSkillSetNestedFilter>;
  skillsSetCollection_exists: InputMaybe<Scalars['Boolean']['input']>;
  sys: InputMaybe<SysFilter>;
  title: InputMaybe<Scalars['String']['input']>;
  title_contains: InputMaybe<Scalars['String']['input']>;
  title_exists: InputMaybe<Scalars['Boolean']['input']>;
  title_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not: InputMaybe<Scalars['String']['input']>;
  title_not_contains: InputMaybe<Scalars['String']['input']>;
  title_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type SkillsPageDataLinkingCollections = {
  __typename?: 'SkillsPageDataLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
  pageCollection: Maybe<PageCollection>;
};


export type SkillsPageDataLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


export type SkillsPageDataLinkingCollectionsPageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<SkillsPageDataLinkingCollectionsPageCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type SkillsPageDataLinkingCollectionsPageCollectionOrder =
  | 'contentAnimation_ASC'
  | 'contentAnimation_DESC'
  | 'headingAnimation_ASC'
  | 'headingAnimation_DESC'
  | 'path_ASC'
  | 'path_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

export type SkillsPageDataOrder =
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

export type SkillsPageDataSkillsSetCollection = {
  __typename?: 'SkillsPageDataSkillsSetCollection';
  items: Array<Maybe<SkillSet>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type SkillsPageDataSkillsSetCollectionOrder =
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

export type Sys = {
  __typename?: 'Sys';
  environmentId: Scalars['String']['output'];
  firstPublishedAt: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  /** The locale that was requested. */
  locale: Maybe<Scalars['String']['output']>;
  publishedAt: Maybe<Scalars['DateTime']['output']>;
  publishedVersion: Maybe<Scalars['Int']['output']>;
  spaceId: Scalars['String']['output'];
};

export type SysFilter = {
  firstPublishedAt: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_exists: InputMaybe<Scalars['Boolean']['input']>;
  firstPublishedAt_gt: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_gte: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_in: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  firstPublishedAt_lt: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_lte: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_not: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_not_in: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  id: InputMaybe<Scalars['String']['input']>;
  id_contains: InputMaybe<Scalars['String']['input']>;
  id_exists: InputMaybe<Scalars['Boolean']['input']>;
  id_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not: InputMaybe<Scalars['String']['input']>;
  id_not_contains: InputMaybe<Scalars['String']['input']>;
  id_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  publishedAt: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_exists: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt_gt: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_gte: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_in: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedAt_lt: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_lte: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_not: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_not_in: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedVersion: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_exists: InputMaybe<Scalars['Boolean']['input']>;
  publishedVersion_gt: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_gte: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_in: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  publishedVersion_lt: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_lte: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_not: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_not_in: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

/**
 * Represents a taxonomy concept entity for finding and organizing content easily.
 *         Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-concepts
 */
export type TaxonomyConcept = {
  __typename?: 'TaxonomyConcept';
  id: Maybe<Scalars['String']['output']>;
};

export type TimelineFilterInput = {
  /** Preview content starting from a given release date */
  release_lte: InputMaybe<Scalars['String']['input']>;
  /** Preview content starting from a given timestamp */
  timestamp_lte: InputMaybe<Scalars['DateTime']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/userInfo) */
export type UserInfo = Entry & _Node & {
  __typename?: 'UserInfo';
  _id: Scalars['ID']['output'];
  bannerData: Maybe<Banner>;
  contentfulMetadata: ContentfulMetadata;
  defaultTheme: Maybe<Scalars['String']['output']>;
  layoutSettings: Maybe<LayoutSettings>;
  linkedFrom: Maybe<UserInfoLinkingCollections>;
  name: Maybe<Scalars['String']['output']>;
  pagesCollection: Maybe<UserInfoPagesCollection>;
  pagesInformationCollection: Maybe<UserInfoPagesInformationCollection>;
  resume: Maybe<Asset>;
  resumeIcon: Maybe<Icon>;
  role: Maybe<Scalars['String']['output']>;
  sys: Sys;
  themeIcon: Maybe<Icon>;
  themeList: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  title: Maybe<Scalars['String']['output']>;
  withPageChangeButton: Maybe<Scalars['Boolean']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/userInfo) */
export type UserInfoBannerDataArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<BannerFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/userInfo) */
export type UserInfoDefaultThemeArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/userInfo) */
export type UserInfoLayoutSettingsArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<LayoutSettingsFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/userInfo) */
export type UserInfoLinkedFromArgs = {
  allowedLocales: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/userInfo) */
export type UserInfoNameArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/userInfo) */
export type UserInfoPagesCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<UserInfoPagesCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<MetaPageFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/userInfo) */
export type UserInfoPagesInformationCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  order: InputMaybe<Array<InputMaybe<UserInfoPagesInformationCollectionOrder>>>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<PageFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/userInfo) */
export type UserInfoResumeArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/userInfo) */
export type UserInfoResumeIconArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<IconFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/userInfo) */
export type UserInfoRoleArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/userInfo) */
export type UserInfoThemeIconArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
  where: InputMaybe<IconFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/userInfo) */
export type UserInfoThemeListArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/userInfo) */
export type UserInfoTitleArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/6mdmgsjzhh4y/content_types/userInfo) */
export type UserInfoWithPageChangeButtonArgs = {
  locale: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserInfoCollection = {
  __typename?: 'UserInfoCollection';
  items: Array<Maybe<UserInfo>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type UserInfoFilter = {
  AND: InputMaybe<Array<InputMaybe<UserInfoFilter>>>;
  OR: InputMaybe<Array<InputMaybe<UserInfoFilter>>>;
  bannerData: InputMaybe<CfBannerNestedFilter>;
  bannerData_exists: InputMaybe<Scalars['Boolean']['input']>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  defaultTheme: InputMaybe<Scalars['String']['input']>;
  defaultTheme_contains: InputMaybe<Scalars['String']['input']>;
  defaultTheme_exists: InputMaybe<Scalars['Boolean']['input']>;
  defaultTheme_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  defaultTheme_not: InputMaybe<Scalars['String']['input']>;
  defaultTheme_not_contains: InputMaybe<Scalars['String']['input']>;
  defaultTheme_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  layoutSettings: InputMaybe<CfLayoutSettingsNestedFilter>;
  layoutSettings_exists: InputMaybe<Scalars['Boolean']['input']>;
  name: InputMaybe<Scalars['String']['input']>;
  name_contains: InputMaybe<Scalars['String']['input']>;
  name_exists: InputMaybe<Scalars['Boolean']['input']>;
  name_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not: InputMaybe<Scalars['String']['input']>;
  name_not_contains: InputMaybe<Scalars['String']['input']>;
  name_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pages: InputMaybe<CfMetaPageNestedFilter>;
  pagesCollection_exists: InputMaybe<Scalars['Boolean']['input']>;
  pagesInformation: InputMaybe<CfPageNestedFilter>;
  pagesInformationCollection_exists: InputMaybe<Scalars['Boolean']['input']>;
  resumeIcon: InputMaybe<CfIconNestedFilter>;
  resumeIcon_exists: InputMaybe<Scalars['Boolean']['input']>;
  resume_exists: InputMaybe<Scalars['Boolean']['input']>;
  role: InputMaybe<Scalars['String']['input']>;
  role_contains: InputMaybe<Scalars['String']['input']>;
  role_exists: InputMaybe<Scalars['Boolean']['input']>;
  role_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  role_not: InputMaybe<Scalars['String']['input']>;
  role_not_contains: InputMaybe<Scalars['String']['input']>;
  role_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys: InputMaybe<SysFilter>;
  themeIcon: InputMaybe<CfIconNestedFilter>;
  themeIcon_exists: InputMaybe<Scalars['Boolean']['input']>;
  themeList_contains_all: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  themeList_contains_none: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  themeList_contains_some: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  themeList_exists: InputMaybe<Scalars['Boolean']['input']>;
  title: InputMaybe<Scalars['String']['input']>;
  title_contains: InputMaybe<Scalars['String']['input']>;
  title_exists: InputMaybe<Scalars['Boolean']['input']>;
  title_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not: InputMaybe<Scalars['String']['input']>;
  title_not_contains: InputMaybe<Scalars['String']['input']>;
  title_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  withPageChangeButton: InputMaybe<Scalars['Boolean']['input']>;
  withPageChangeButton_exists: InputMaybe<Scalars['Boolean']['input']>;
  withPageChangeButton_not: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserInfoLinkingCollections = {
  __typename?: 'UserInfoLinkingCollections';
  entryCollection: Maybe<EntryCollection>;
};


export type UserInfoLinkingCollectionsEntryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale: InputMaybe<Scalars['String']['input']>;
  preview: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale: InputMaybe<Scalars['Boolean']['input']>;
};

export type UserInfoOrder =
  | 'defaultTheme_ASC'
  | 'defaultTheme_DESC'
  | 'name_ASC'
  | 'name_DESC'
  | 'role_ASC'
  | 'role_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC'
  | 'withPageChangeButton_ASC'
  | 'withPageChangeButton_DESC';

export type UserInfoPagesCollection = {
  __typename?: 'UserInfoPagesCollection';
  items: Array<Maybe<MetaPage>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type UserInfoPagesCollectionOrder =
  | 'isDefaultPage_ASC'
  | 'isDefaultPage_DESC'
  | 'pageUrl_ASC'
  | 'pageUrl_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

export type UserInfoPagesInformationCollection = {
  __typename?: 'UserInfoPagesInformationCollection';
  items: Array<Maybe<Page>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type UserInfoPagesInformationCollectionOrder =
  | 'contentAnimation_ASC'
  | 'contentAnimation_DESC'
  | 'headingAnimation_ASC'
  | 'headingAnimation_DESC'
  | 'path_ASC'
  | 'path_DESC'
  | 'sys_firstPublishedAt_ASC'
  | 'sys_firstPublishedAt_DESC'
  | 'sys_id_ASC'
  | 'sys_id_DESC'
  | 'sys_publishedAt_ASC'
  | 'sys_publishedAt_DESC'
  | 'sys_publishedVersion_ASC'
  | 'sys_publishedVersion_DESC'
  | 'title_ASC'
  | 'title_DESC';

export type _Node = {
  _id: Scalars['ID']['output'];
};

export type CfBannerNestedFilter = {
  AND: InputMaybe<Array<InputMaybe<CfBannerNestedFilter>>>;
  OR: InputMaybe<Array<InputMaybe<CfBannerNestedFilter>>>;
  bannerAnimation: InputMaybe<Scalars['String']['input']>;
  bannerAnimation_contains: InputMaybe<Scalars['String']['input']>;
  bannerAnimation_exists: InputMaybe<Scalars['Boolean']['input']>;
  bannerAnimation_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  bannerAnimation_not: InputMaybe<Scalars['String']['input']>;
  bannerAnimation_not_contains: InputMaybe<Scalars['String']['input']>;
  bannerAnimation_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  bannerImage_exists: InputMaybe<Scalars['Boolean']['input']>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  profilePicture_exists: InputMaybe<Scalars['Boolean']['input']>;
  socialLinksCollection_exists: InputMaybe<Scalars['Boolean']['input']>;
  sys: InputMaybe<SysFilter>;
  title: InputMaybe<Scalars['String']['input']>;
  title_contains: InputMaybe<Scalars['String']['input']>;
  title_exists: InputMaybe<Scalars['Boolean']['input']>;
  title_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not: InputMaybe<Scalars['String']['input']>;
  title_not_contains: InputMaybe<Scalars['String']['input']>;
  title_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CfBioCardNestedFilter = {
  AND: InputMaybe<Array<InputMaybe<CfBioCardNestedFilter>>>;
  OR: InputMaybe<Array<InputMaybe<CfBioCardNestedFilter>>>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  icon_exists: InputMaybe<Scalars['Boolean']['input']>;
  sys: InputMaybe<SysFilter>;
  title: InputMaybe<Scalars['String']['input']>;
  title_contains: InputMaybe<Scalars['String']['input']>;
  title_exists: InputMaybe<Scalars['Boolean']['input']>;
  title_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not: InputMaybe<Scalars['String']['input']>;
  title_not_contains: InputMaybe<Scalars['String']['input']>;
  title_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  value: InputMaybe<Scalars['String']['input']>;
  value_contains: InputMaybe<Scalars['String']['input']>;
  value_exists: InputMaybe<Scalars['Boolean']['input']>;
  value_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  value_not: InputMaybe<Scalars['String']['input']>;
  value_not_contains: InputMaybe<Scalars['String']['input']>;
  value_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CfIconNestedFilter = {
  AND: InputMaybe<Array<InputMaybe<CfIconNestedFilter>>>;
  OR: InputMaybe<Array<InputMaybe<CfIconNestedFilter>>>;
  classes_contains_all: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  classes_contains_none: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  classes_contains_some: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  classes_exists: InputMaybe<Scalars['Boolean']['input']>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  iconCode: InputMaybe<Scalars['String']['input']>;
  iconCode_contains: InputMaybe<Scalars['String']['input']>;
  iconCode_exists: InputMaybe<Scalars['Boolean']['input']>;
  iconCode_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  iconCode_not: InputMaybe<Scalars['String']['input']>;
  iconCode_not_contains: InputMaybe<Scalars['String']['input']>;
  iconCode_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name: InputMaybe<Scalars['String']['input']>;
  name_contains: InputMaybe<Scalars['String']['input']>;
  name_exists: InputMaybe<Scalars['Boolean']['input']>;
  name_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not: InputMaybe<Scalars['String']['input']>;
  name_not_contains: InputMaybe<Scalars['String']['input']>;
  name_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  showTooltip: InputMaybe<Scalars['Boolean']['input']>;
  showTooltip_exists: InputMaybe<Scalars['Boolean']['input']>;
  showTooltip_not: InputMaybe<Scalars['Boolean']['input']>;
  sys: InputMaybe<SysFilter>;
};

export type CfJobExperienceNestedFilter = {
  AND: InputMaybe<Array<InputMaybe<CfJobExperienceNestedFilter>>>;
  OR: InputMaybe<Array<InputMaybe<CfJobExperienceNestedFilter>>>;
  company: InputMaybe<Scalars['String']['input']>;
  companyIcon_exists: InputMaybe<Scalars['Boolean']['input']>;
  company_contains: InputMaybe<Scalars['String']['input']>;
  company_exists: InputMaybe<Scalars['Boolean']['input']>;
  company_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  company_not: InputMaybe<Scalars['String']['input']>;
  company_not_contains: InputMaybe<Scalars['String']['input']>;
  company_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  currentlyWorking: InputMaybe<Scalars['Boolean']['input']>;
  currentlyWorking_exists: InputMaybe<Scalars['Boolean']['input']>;
  currentlyWorking_not: InputMaybe<Scalars['Boolean']['input']>;
  description_contains: InputMaybe<Scalars['String']['input']>;
  description_exists: InputMaybe<Scalars['Boolean']['input']>;
  description_not_contains: InputMaybe<Scalars['String']['input']>;
  durationIcon_exists: InputMaybe<Scalars['Boolean']['input']>;
  endDate: InputMaybe<Scalars['DateTime']['input']>;
  endDate_exists: InputMaybe<Scalars['Boolean']['input']>;
  endDate_gt: InputMaybe<Scalars['DateTime']['input']>;
  endDate_gte: InputMaybe<Scalars['DateTime']['input']>;
  endDate_in: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  endDate_lt: InputMaybe<Scalars['DateTime']['input']>;
  endDate_lte: InputMaybe<Scalars['DateTime']['input']>;
  endDate_not: InputMaybe<Scalars['DateTime']['input']>;
  endDate_not_in: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  location: InputMaybe<Scalars['String']['input']>;
  locationIcon_exists: InputMaybe<Scalars['Boolean']['input']>;
  location_contains: InputMaybe<Scalars['String']['input']>;
  location_exists: InputMaybe<Scalars['Boolean']['input']>;
  location_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  location_not: InputMaybe<Scalars['String']['input']>;
  location_not_contains: InputMaybe<Scalars['String']['input']>;
  location_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  position: InputMaybe<Scalars['String']['input']>;
  position_contains: InputMaybe<Scalars['String']['input']>;
  position_exists: InputMaybe<Scalars['Boolean']['input']>;
  position_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  position_not: InputMaybe<Scalars['String']['input']>;
  position_not_contains: InputMaybe<Scalars['String']['input']>;
  position_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  roleIcon_exists: InputMaybe<Scalars['Boolean']['input']>;
  startDate: InputMaybe<Scalars['DateTime']['input']>;
  startDate_exists: InputMaybe<Scalars['Boolean']['input']>;
  startDate_gt: InputMaybe<Scalars['DateTime']['input']>;
  startDate_gte: InputMaybe<Scalars['DateTime']['input']>;
  startDate_in: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  startDate_lt: InputMaybe<Scalars['DateTime']['input']>;
  startDate_lte: InputMaybe<Scalars['DateTime']['input']>;
  startDate_not: InputMaybe<Scalars['DateTime']['input']>;
  startDate_not_in: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  sys: InputMaybe<SysFilter>;
  techStackIcon_exists: InputMaybe<Scalars['Boolean']['input']>;
  techStack_exists: InputMaybe<Scalars['Boolean']['input']>;
  workedRemotely: InputMaybe<Scalars['Boolean']['input']>;
  workedRemotely_exists: InputMaybe<Scalars['Boolean']['input']>;
  workedRemotely_not: InputMaybe<Scalars['Boolean']['input']>;
};

export type CfLayoutSettingsNestedFilter = {
  AND: InputMaybe<Array<InputMaybe<CfLayoutSettingsNestedFilter>>>;
  OR: InputMaybe<Array<InputMaybe<CfLayoutSettingsNestedFilter>>>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  drawerSide: InputMaybe<Scalars['String']['input']>;
  drawerSide_contains: InputMaybe<Scalars['String']['input']>;
  drawerSide_exists: InputMaybe<Scalars['Boolean']['input']>;
  drawerSide_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  drawerSide_not: InputMaybe<Scalars['String']['input']>;
  drawerSide_not_contains: InputMaybe<Scalars['String']['input']>;
  drawerSide_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  drawerVariant: InputMaybe<Scalars['String']['input']>;
  drawerVariant_contains: InputMaybe<Scalars['String']['input']>;
  drawerVariant_exists: InputMaybe<Scalars['Boolean']['input']>;
  drawerVariant_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  drawerVariant_not: InputMaybe<Scalars['String']['input']>;
  drawerVariant_not_contains: InputMaybe<Scalars['String']['input']>;
  drawerVariant_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys: InputMaybe<SysFilter>;
  title: InputMaybe<Scalars['String']['input']>;
  title_contains: InputMaybe<Scalars['String']['input']>;
  title_exists: InputMaybe<Scalars['Boolean']['input']>;
  title_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not: InputMaybe<Scalars['String']['input']>;
  title_not_contains: InputMaybe<Scalars['String']['input']>;
  title_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CfMetaPageNestedFilter = {
  AND: InputMaybe<Array<InputMaybe<CfMetaPageNestedFilter>>>;
  OR: InputMaybe<Array<InputMaybe<CfMetaPageNestedFilter>>>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  isDefaultPage: InputMaybe<Scalars['Boolean']['input']>;
  isDefaultPage_exists: InputMaybe<Scalars['Boolean']['input']>;
  isDefaultPage_not: InputMaybe<Scalars['Boolean']['input']>;
  pageIcon_exists: InputMaybe<Scalars['Boolean']['input']>;
  pageUrl: InputMaybe<Scalars['String']['input']>;
  pageUrl_contains: InputMaybe<Scalars['String']['input']>;
  pageUrl_exists: InputMaybe<Scalars['Boolean']['input']>;
  pageUrl_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pageUrl_not: InputMaybe<Scalars['String']['input']>;
  pageUrl_not_contains: InputMaybe<Scalars['String']['input']>;
  pageUrl_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys: InputMaybe<SysFilter>;
  title: InputMaybe<Scalars['String']['input']>;
  title_contains: InputMaybe<Scalars['String']['input']>;
  title_exists: InputMaybe<Scalars['Boolean']['input']>;
  title_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not: InputMaybe<Scalars['String']['input']>;
  title_not_contains: InputMaybe<Scalars['String']['input']>;
  title_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CfPageNestedFilter = {
  AND: InputMaybe<Array<InputMaybe<CfPageNestedFilter>>>;
  OR: InputMaybe<Array<InputMaybe<CfPageNestedFilter>>>;
  contentAnimation: InputMaybe<Scalars['String']['input']>;
  contentAnimation_contains: InputMaybe<Scalars['String']['input']>;
  contentAnimation_exists: InputMaybe<Scalars['Boolean']['input']>;
  contentAnimation_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentAnimation_not: InputMaybe<Scalars['String']['input']>;
  contentAnimation_not_contains: InputMaybe<Scalars['String']['input']>;
  contentAnimation_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  headingAnimation: InputMaybe<Scalars['String']['input']>;
  headingAnimation_contains: InputMaybe<Scalars['String']['input']>;
  headingAnimation_exists: InputMaybe<Scalars['Boolean']['input']>;
  headingAnimation_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  headingAnimation_not: InputMaybe<Scalars['String']['input']>;
  headingAnimation_not_contains: InputMaybe<Scalars['String']['input']>;
  headingAnimation_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  pageData_exists: InputMaybe<Scalars['Boolean']['input']>;
  pageIcon_exists: InputMaybe<Scalars['Boolean']['input']>;
  pageSeo_exists: InputMaybe<Scalars['Boolean']['input']>;
  path: InputMaybe<Scalars['String']['input']>;
  path_contains: InputMaybe<Scalars['String']['input']>;
  path_exists: InputMaybe<Scalars['Boolean']['input']>;
  path_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  path_not: InputMaybe<Scalars['String']['input']>;
  path_not_contains: InputMaybe<Scalars['String']['input']>;
  path_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys: InputMaybe<SysFilter>;
  title: InputMaybe<Scalars['String']['input']>;
  title_contains: InputMaybe<Scalars['String']['input']>;
  title_exists: InputMaybe<Scalars['Boolean']['input']>;
  title_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not: InputMaybe<Scalars['String']['input']>;
  title_not_contains: InputMaybe<Scalars['String']['input']>;
  title_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CfProjectCardNestedFilter = {
  AND: InputMaybe<Array<InputMaybe<CfProjectCardNestedFilter>>>;
  OR: InputMaybe<Array<InputMaybe<CfProjectCardNestedFilter>>>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  deployedLink: InputMaybe<Scalars['String']['input']>;
  deployedLinkIcon_exists: InputMaybe<Scalars['Boolean']['input']>;
  deployedLink_contains: InputMaybe<Scalars['String']['input']>;
  deployedLink_exists: InputMaybe<Scalars['Boolean']['input']>;
  deployedLink_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  deployedLink_not: InputMaybe<Scalars['String']['input']>;
  deployedLink_not_contains: InputMaybe<Scalars['String']['input']>;
  deployedLink_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description: InputMaybe<Scalars['String']['input']>;
  description_contains: InputMaybe<Scalars['String']['input']>;
  description_exists: InputMaybe<Scalars['Boolean']['input']>;
  description_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not: InputMaybe<Scalars['String']['input']>;
  description_not_contains: InputMaybe<Scalars['String']['input']>;
  description_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys: InputMaybe<SysFilter>;
  thumbnail_exists: InputMaybe<Scalars['Boolean']['input']>;
  title: InputMaybe<Scalars['String']['input']>;
  title_contains: InputMaybe<Scalars['String']['input']>;
  title_exists: InputMaybe<Scalars['Boolean']['input']>;
  title_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not: InputMaybe<Scalars['String']['input']>;
  title_not_contains: InputMaybe<Scalars['String']['input']>;
  title_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CfSeoDataNestedFilter = {
  AND: InputMaybe<Array<InputMaybe<CfSeoDataNestedFilter>>>;
  OR: InputMaybe<Array<InputMaybe<CfSeoDataNestedFilter>>>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  countryName: InputMaybe<Scalars['String']['input']>;
  countryName_contains: InputMaybe<Scalars['String']['input']>;
  countryName_exists: InputMaybe<Scalars['Boolean']['input']>;
  countryName_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  countryName_not: InputMaybe<Scalars['String']['input']>;
  countryName_not_contains: InputMaybe<Scalars['String']['input']>;
  countryName_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  creator: InputMaybe<Scalars['String']['input']>;
  creator_contains: InputMaybe<Scalars['String']['input']>;
  creator_exists: InputMaybe<Scalars['Boolean']['input']>;
  creator_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  creator_not: InputMaybe<Scalars['String']['input']>;
  creator_not_contains: InputMaybe<Scalars['String']['input']>;
  creator_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description: InputMaybe<Scalars['String']['input']>;
  description_contains: InputMaybe<Scalars['String']['input']>;
  description_exists: InputMaybe<Scalars['Boolean']['input']>;
  description_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not: InputMaybe<Scalars['String']['input']>;
  description_not_contains: InputMaybe<Scalars['String']['input']>;
  description_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  favicon_exists: InputMaybe<Scalars['Boolean']['input']>;
  imagesCollection_exists: InputMaybe<Scalars['Boolean']['input']>;
  keywords_contains_all: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  keywords_contains_none: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  keywords_contains_some: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  keywords_exists: InputMaybe<Scalars['Boolean']['input']>;
  publisher: InputMaybe<Scalars['String']['input']>;
  publisher_contains: InputMaybe<Scalars['String']['input']>;
  publisher_exists: InputMaybe<Scalars['Boolean']['input']>;
  publisher_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  publisher_not: InputMaybe<Scalars['String']['input']>;
  publisher_not_contains: InputMaybe<Scalars['String']['input']>;
  publisher_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  siteName: InputMaybe<Scalars['String']['input']>;
  siteName_contains: InputMaybe<Scalars['String']['input']>;
  siteName_exists: InputMaybe<Scalars['Boolean']['input']>;
  siteName_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  siteName_not: InputMaybe<Scalars['String']['input']>;
  siteName_not_contains: InputMaybe<Scalars['String']['input']>;
  siteName_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys: InputMaybe<SysFilter>;
  title: InputMaybe<Scalars['String']['input']>;
  title_contains: InputMaybe<Scalars['String']['input']>;
  title_exists: InputMaybe<Scalars['Boolean']['input']>;
  title_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not: InputMaybe<Scalars['String']['input']>;
  title_not_contains: InputMaybe<Scalars['String']['input']>;
  title_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url: InputMaybe<Scalars['String']['input']>;
  url_contains: InputMaybe<Scalars['String']['input']>;
  url_exists: InputMaybe<Scalars['Boolean']['input']>;
  url_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url_not: InputMaybe<Scalars['String']['input']>;
  url_not_contains: InputMaybe<Scalars['String']['input']>;
  url_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CfSkillGroupNestedFilter = {
  AND: InputMaybe<Array<InputMaybe<CfSkillGroupNestedFilter>>>;
  OR: InputMaybe<Array<InputMaybe<CfSkillGroupNestedFilter>>>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  skillIconsCollection_exists: InputMaybe<Scalars['Boolean']['input']>;
  skillProgress: InputMaybe<Scalars['Int']['input']>;
  skillProgress_exists: InputMaybe<Scalars['Boolean']['input']>;
  skillProgress_gt: InputMaybe<Scalars['Int']['input']>;
  skillProgress_gte: InputMaybe<Scalars['Int']['input']>;
  skillProgress_in: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  skillProgress_lt: InputMaybe<Scalars['Int']['input']>;
  skillProgress_lte: InputMaybe<Scalars['Int']['input']>;
  skillProgress_not: InputMaybe<Scalars['Int']['input']>;
  skillProgress_not_in: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  sys: InputMaybe<SysFilter>;
  title: InputMaybe<Scalars['String']['input']>;
  title_contains: InputMaybe<Scalars['String']['input']>;
  title_exists: InputMaybe<Scalars['Boolean']['input']>;
  title_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not: InputMaybe<Scalars['String']['input']>;
  title_not_contains: InputMaybe<Scalars['String']['input']>;
  title_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CfSkillSetNestedFilter = {
  AND: InputMaybe<Array<InputMaybe<CfSkillSetNestedFilter>>>;
  OR: InputMaybe<Array<InputMaybe<CfSkillSetNestedFilter>>>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  icon_exists: InputMaybe<Scalars['Boolean']['input']>;
  skillsArrayCollection_exists: InputMaybe<Scalars['Boolean']['input']>;
  skillsetIcon_exists: InputMaybe<Scalars['Boolean']['input']>;
  sys: InputMaybe<SysFilter>;
  title: InputMaybe<Scalars['String']['input']>;
  title_contains: InputMaybe<Scalars['String']['input']>;
  title_exists: InputMaybe<Scalars['Boolean']['input']>;
  title_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not: InputMaybe<Scalars['String']['input']>;
  title_not_contains: InputMaybe<Scalars['String']['input']>;
  title_not_in: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type CfcontentMultiTypeNestedFilter = {
  AND: InputMaybe<Array<InputMaybe<CfcontentMultiTypeNestedFilter>>>;
  OR: InputMaybe<Array<InputMaybe<CfcontentMultiTypeNestedFilter>>>;
  contentfulMetadata: InputMaybe<ContentfulMetadataFilter>;
  sys: InputMaybe<SysFilter>;
};

export type AssetFragment = { __typename: 'Asset', width: number | null, url: string | null, title: string | null, size: number | null, height: number | null, description: string | null, fileName: string | null, contentType: string | null, sys: { __typename?: 'Sys', id: string } } & { ' $fragmentName'?: 'AssetFragment' };

export type BioCardFragment = { __typename: 'BioCard', title: string | null, value: string | null, _id: string, icon: (
    { __typename?: 'Icon' }
    & { ' $fragmentRefs'?: { 'IconFragment': IconFragment } }
  ) | null } & { ' $fragmentName'?: 'BioCardFragment' };

export type ExperiencePageDataFragment = { __typename: 'ExperiencePageData', title: string | null, _id: string, experiencesCollection: { __typename?: 'ExperiencePageDataExperiencesCollection', items: Array<(
      { __typename?: 'JobExperience' }
      & { ' $fragmentRefs'?: { 'JobExperienceFragment': JobExperienceFragment } }
    ) | null> } | null } & { ' $fragmentName'?: 'ExperiencePageDataFragment' };

export type HomePageDataFragment = { __typename: 'HomePageData', _id: string, title: string | null, description: { __typename?: 'HomePageDataDescription', json: any } | null, infoCollection: { __typename?: 'HomePageDataInfoCollection', items: Array<{ __typename: 'BioCard', title: string | null, value: string | null, icon: (
        { __typename?: 'Icon' }
        & { ' $fragmentRefs'?: { 'IconFragment': IconFragment } }
      ) | null } | null> } | null } & { ' $fragmentName'?: 'HomePageDataFragment' };

export type IconFragment = { __typename: 'Icon', _id: string, classes: Array<string | null> | null, name: string | null, iconCode: string | null, showTooltip: boolean | null } & { ' $fragmentName'?: 'IconFragment' };

export type JobExperienceFragment = { __typename: 'JobExperience', company: string | null, currentlyWorking: boolean | null, workedRemotely: boolean | null, endDate: any | null, position: string | null, startDate: any | null, location: string | null, companyIcon: (
    { __typename?: 'Icon' }
    & { ' $fragmentRefs'?: { 'IconFragment': IconFragment } }
  ) | null, techStackIcon: (
    { __typename?: 'Icon' }
    & { ' $fragmentRefs'?: { 'IconFragment': IconFragment } }
  ) | null, description: { __typename?: 'JobExperienceDescription', json: any } | null, durationIcon: (
    { __typename?: 'Icon' }
    & { ' $fragmentRefs'?: { 'IconFragment': IconFragment } }
  ) | null, locationIcon: (
    { __typename?: 'Icon' }
    & { ' $fragmentRefs'?: { 'IconFragment': IconFragment } }
  ) | null, roleIcon: (
    { __typename?: 'Icon' }
    & { ' $fragmentRefs'?: { 'IconFragment': IconFragment } }
  ) | null, techStack: { __typename?: 'SkillGroup', skillProgress: number | null, _id: string, title: string | null, skillIconsCollection: { __typename?: 'SkillGroupSkillIconsCollection', items: Array<(
        { __typename?: 'Icon' }
        & { ' $fragmentRefs'?: { 'IconFragment': IconFragment } }
      ) | null> } | null } | null } & { ' $fragmentName'?: 'JobExperienceFragment' };

export type ProjectsPageDataFragment = { __typename: 'ProjectsPageData', _id: string, title: string | null, projectsCollection: { __typename?: 'ProjectsPageDataProjectsCollection', items: Array<{ __typename: 'ProjectCard', _id: string, deployedLink: string | null, title: string | null, description: string | null, deployedLinkIcon: (
        { __typename?: 'Icon' }
        & { ' $fragmentRefs'?: { 'IconFragment': IconFragment } }
      ) | null, thumbnail: (
        { __typename?: 'Asset' }
        & { ' $fragmentRefs'?: { 'AssetFragment': AssetFragment } }
      ) | null } | null> } | null } & { ' $fragmentName'?: 'ProjectsPageDataFragment' };

export type SkillsPageDataFragment = { __typename: 'SkillsPageData', _id: string, title: string | null, skillsSetCollection: { __typename?: 'SkillsPageDataSkillsSetCollection', items: Array<{ __typename?: 'SkillSet', title: string | null, icon: (
        { __typename?: 'Icon' }
        & { ' $fragmentRefs'?: { 'IconFragment': IconFragment } }
      ) | null, skillsArrayCollection: { __typename?: 'SkillSetSkillsArrayCollection', items: Array<{ __typename: 'SkillGroup', _id: string, title: string | null, skillProgress: number | null, skillIconsCollection: { __typename: 'SkillGroupSkillIconsCollection', items: Array<(
              { __typename?: 'Icon' }
              & { ' $fragmentRefs'?: { 'IconFragment': IconFragment } }
            ) | null> } | null } | null> } | null } | null> } | null } & { ' $fragmentName'?: 'SkillsPageDataFragment' };

export type SeoDataFragment = { __typename: 'SeoData', countryName: string | null, creator: string | null, description: string | null, keywords: Array<string | null> | null, url: string | null, siteName: string | null, publisher: string | null, title: string | null, imagesCollection: { __typename?: 'AssetCollection', items: Array<(
      { __typename?: 'Asset' }
      & { ' $fragmentRefs'?: { 'AssetFragment': AssetFragment } }
    ) | null> } | null, favicon: (
    { __typename?: 'Asset' }
    & { ' $fragmentRefs'?: { 'AssetFragment': AssetFragment } }
  ) | null, sys: { __typename?: 'Sys', id: string } } & { ' $fragmentName'?: 'SeoDataFragment' };

export type GetAppDataQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetAppDataQuery = { __typename?: 'Query', userInfo: { __typename?: 'UserInfo', title: string | null, name: string | null, defaultTheme: string | null, themeList: Array<string | null> | null, role: string | null, bannerData: { __typename?: 'Banner', bannerAnimation: string | null, title: string | null, profilePicture: { __typename?: 'Asset', description: string | null, fileName: string | null, width: number | null, height: number | null, title: string | null, url: string | null } | null, socialLinksCollection: { __typename?: 'AssetCollection', items: Array<{ __typename?: 'Asset', description: string | null, fileName: string | null, width: number | null, height: number | null, title: string | null, url: string | null } | null> } | null, bannerImage: { __typename?: 'Asset', title: string | null, url: string | null, description: string | null, fileName: string | null, height: number | null, width: number | null } | null } | null, resume: { __typename?: 'Asset', description: string | null, fileName: string | null, title: string | null, url: string | null, width: number | null, height: number | null } | null, pagesCollection: { __typename?: 'UserInfoPagesCollection', items: Array<{ __typename?: 'MetaPage', pageUrl: string | null, isDefaultPage: boolean | null, title: string | null, pageIcon: { __typename?: 'Icon', _id: string, classes: Array<string | null> | null, iconCode: string | null, name: string | null, showTooltip: boolean | null } | null } | null> } | null, resumeIcon: { __typename?: 'Icon', _id: string, classes: Array<string | null> | null, showTooltip: boolean | null, name: string | null, iconCode: string | null } | null, themeIcon: { __typename?: 'Icon', _id: string, classes: Array<string | null> | null, showTooltip: boolean | null, name: string | null, iconCode: string | null } | null, layoutSettings: { __typename?: 'LayoutSettings', drawerSide: string | null, drawerVariant: string | null, title: string | null } | null } | null };

export type FetchAllPagePathsQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchAllPagePathsQuery = { __typename?: 'Query', pageCollection: { __typename?: 'PageCollection', items: Array<{ __typename?: 'Page', path: string | null } | null> } | null };

export type FetchPageByPathQueryVariables = Exact<{
  path: Scalars['String']['input'];
}>;


export type FetchPageByPathQuery = { __typename?: 'Query', pageCollection: { __typename?: 'PageCollection', items: Array<{ __typename?: 'Page', _id: string, path: string | null, title: string | null, contentAnimation: string | null, headingAnimation: string | null, pageSeo: (
        { __typename?: 'SeoData' }
        & { ' $fragmentRefs'?: { 'SeoDataFragment': SeoDataFragment } }
      ) | null, pageData: (
        { __typename: 'ExperiencePageData' }
        & { ' $fragmentRefs'?: { 'ExperiencePageDataFragment': ExperiencePageDataFragment } }
      ) | (
        { __typename: 'HomePageData' }
        & { ' $fragmentRefs'?: { 'HomePageDataFragment': HomePageDataFragment } }
      ) | (
        { __typename: 'ProjectsPageData' }
        & { ' $fragmentRefs'?: { 'ProjectsPageDataFragment': ProjectsPageDataFragment } }
      ) | (
        { __typename: 'SkillsPageData' }
        & { ' $fragmentRefs'?: { 'SkillsPageDataFragment': SkillsPageDataFragment } }
      ) | null, pageIcon: (
        { __typename?: 'Icon' }
        & { ' $fragmentRefs'?: { 'IconFragment': IconFragment } }
      ) | null } | null> } | null };

export const IconFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Icon"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Icon"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"classes"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"iconCode"}},{"kind":"Field","name":{"kind":"Name","value":"showTooltip"}}]}}]} as unknown as DocumentNode<IconFragment, unknown>;
export const BioCardFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BioCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BioCard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"icon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Icon"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Icon"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Icon"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"classes"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"iconCode"}},{"kind":"Field","name":{"kind":"Name","value":"showTooltip"}}]}}]} as unknown as DocumentNode<BioCardFragment, unknown>;
export const JobExperienceFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"JobExperience"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"JobExperience"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"companyIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"currentlyWorking"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"workedRemotely"}},{"kind":"Field","name":{"kind":"Name","value":"techStackIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"json"}}]}},{"kind":"Field","name":{"kind":"Name","value":"durationIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"locationIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roleIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"techStack"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"skillProgress"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"skillIconsCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Icon"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Icon"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Icon"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"classes"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"iconCode"}},{"kind":"Field","name":{"kind":"Name","value":"showTooltip"}}]}}]} as unknown as DocumentNode<JobExperienceFragment, unknown>;
export const ExperiencePageDataFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExperiencePageData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExperiencePageData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"experiencesCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"JobExperience"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Icon"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Icon"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"classes"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"iconCode"}},{"kind":"Field","name":{"kind":"Name","value":"showTooltip"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"JobExperience"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"JobExperience"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"companyIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"currentlyWorking"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"workedRemotely"}},{"kind":"Field","name":{"kind":"Name","value":"techStackIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"json"}}]}},{"kind":"Field","name":{"kind":"Name","value":"durationIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"locationIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roleIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"techStack"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"skillProgress"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"skillIconsCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Icon"}}]}}]}}]}}]}}]} as unknown as DocumentNode<ExperiencePageDataFragment, unknown>;
export const HomePageDataFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HomePageData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HomePageData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"json"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"infoCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"icon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Icon"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Icon"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Icon"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"classes"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"iconCode"}},{"kind":"Field","name":{"kind":"Name","value":"showTooltip"}}]}}]} as unknown as DocumentNode<HomePageDataFragment, unknown>;
export const AssetFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Asset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"sys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"fileName"}},{"kind":"Field","name":{"kind":"Name","value":"contentType"}}]}}]} as unknown as DocumentNode<AssetFragment, unknown>;
export const ProjectsPageDataFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectsPageData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectsPageData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"projectsCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"deployedLink"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"deployedLinkIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Asset"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Icon"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Icon"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"classes"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"iconCode"}},{"kind":"Field","name":{"kind":"Name","value":"showTooltip"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Asset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"sys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"fileName"}},{"kind":"Field","name":{"kind":"Name","value":"contentType"}}]}}]} as unknown as DocumentNode<ProjectsPageDataFragment, unknown>;
export const SkillsPageDataFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SkillsPageData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SkillsPageData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"skillsSetCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"icon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"skillsArrayCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"skillIconsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Icon"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"skillProgress"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Icon"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Icon"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"classes"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"iconCode"}},{"kind":"Field","name":{"kind":"Name","value":"showTooltip"}}]}}]} as unknown as DocumentNode<SkillsPageDataFragment, unknown>;
export const SeoDataFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SeoData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SeoData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countryName"}},{"kind":"Field","name":{"kind":"Name","value":"creator"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"keywords"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"siteName"}},{"kind":"Field","name":{"kind":"Name","value":"publisher"}},{"kind":"Field","name":{"kind":"Name","value":"imagesCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Asset"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"favicon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Asset"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"sys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Asset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"sys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"fileName"}},{"kind":"Field","name":{"kind":"Name","value":"contentType"}}]}}]} as unknown as DocumentNode<SeoDataFragment, unknown>;
export const GetAppDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAppData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"userInfo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"bannerData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bannerAnimation"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"profilePicture"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"fileName"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"bannerAnimation"}},{"kind":"Field","name":{"kind":"Name","value":"socialLinksCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"fileName"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"bannerImage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"fileName"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"width"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"defaultTheme"}},{"kind":"Field","name":{"kind":"Name","value":"themeList"}},{"kind":"Field","name":{"kind":"Name","value":"resume"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"fileName"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"height"}}]}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"pagesCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageUrl"}},{"kind":"Field","name":{"kind":"Name","value":"isDefaultPage"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"pageIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"classes"}},{"kind":"Field","name":{"kind":"Name","value":"iconCode"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"showTooltip"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"resumeIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"classes"}},{"kind":"Field","name":{"kind":"Name","value":"showTooltip"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"iconCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"resume"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"fileName"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"themeIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"classes"}},{"kind":"Field","name":{"kind":"Name","value":"showTooltip"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"iconCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"themeList"}},{"kind":"Field","name":{"kind":"Name","value":"defaultTheme"}},{"kind":"Field","name":{"kind":"Name","value":"layoutSettings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"drawerSide"}},{"kind":"Field","name":{"kind":"Name","value":"drawerVariant"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]}}]} as unknown as DocumentNode<GetAppDataQuery, GetAppDataQueryVariables>;
export const FetchAllPagePathsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchAllPagePaths"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"100"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"path"}}]}}]}}]}}]} as unknown as DocumentNode<FetchAllPagePathsQuery, FetchAllPagePathsQueryVariables>;
export const FetchPageByPathDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchPageByPath"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"path"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"path"},"value":{"kind":"Variable","name":{"kind":"Name","value":"path"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"path"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contentAnimation"}},{"kind":"Field","name":{"kind":"Name","value":"pageSeo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SeoData"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pageData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HomePageData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"HomePageData"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExperiencePageData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExperiencePageData"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SkillsPageData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SkillsPageData"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectsPageData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectsPageData"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"headingAnimation"}},{"kind":"Field","name":{"kind":"Name","value":"pageIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Icon"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Asset"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Asset"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"sys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"width"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"size"}},{"kind":"Field","name":{"kind":"Name","value":"height"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"fileName"}},{"kind":"Field","name":{"kind":"Name","value":"contentType"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Icon"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Icon"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"classes"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"iconCode"}},{"kind":"Field","name":{"kind":"Name","value":"showTooltip"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"JobExperience"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"JobExperience"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"companyIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"currentlyWorking"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"workedRemotely"}},{"kind":"Field","name":{"kind":"Name","value":"techStackIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"json"}}]}},{"kind":"Field","name":{"kind":"Name","value":"durationIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"locationIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roleIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"techStack"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"skillProgress"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"skillIconsCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Icon"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SeoData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SeoData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"countryName"}},{"kind":"Field","name":{"kind":"Name","value":"creator"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"keywords"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"siteName"}},{"kind":"Field","name":{"kind":"Name","value":"publisher"}},{"kind":"Field","name":{"kind":"Name","value":"imagesCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Asset"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"favicon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Asset"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"sys"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HomePageData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HomePageData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"description"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"json"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"infoCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"icon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Icon"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExperiencePageData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ExperiencePageData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"experiencesCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"JobExperience"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SkillsPageData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SkillsPageData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"skillsSetCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"icon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"skillsArrayCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"skillIconsCollection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"10"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Icon"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"skillProgress"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}}]}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectsPageData"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectsPageData"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"projectsCollection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"_id"}},{"kind":"Field","name":{"kind":"Name","value":"deployedLink"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"deployedLinkIcon"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Icon"}}]}},{"kind":"Field","name":{"kind":"Name","value":"thumbnail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Asset"}}]}}]}}]}}]}}]} as unknown as DocumentNode<FetchPageByPathQuery, FetchPageByPathQueryVariables>;