/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
// @ts-nocheck
import { GraphQLClient, type RequestOptions } from 'graphql-request';
import { GraphQLError, print } from 'graphql'
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
type GraphQLClientRequestHeaders = RequestOptions['requestHeaders'];
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: unknown; output: unknown; }
  Dimension: { input: unknown; output: unknown; }
  HexColor: { input: unknown; output: unknown; }
  JSON: { input: unknown; output: unknown; }
  Quality: { input: unknown; output: unknown; }
};

/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/article) */
export type Article = Entry & _Node & {
  __typename?: 'Article';
  _id: Scalars['ID']['output'];
  body?: Maybe<ArticleBody>;
  contentfulMetadata: ContentfulMetadata;
  date?: Maybe<Scalars['DateTime']['output']>;
  image?: Maybe<Image>;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<ArticleLinkingCollections>;
  slug?: Maybe<Scalars['String']['output']>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/article) */
export type ArticlebodyArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/article) */
export type ArticledateArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/article) */
export type ArticleimageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ImageFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/article) */
export type ArticleinternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/article) */
export type ArticlelinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/article) */
export type ArticleslugArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/article) */
export type ArticletitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ArticleBody = {
  __typename?: 'ArticleBody';
  json: Scalars['JSON']['output'];
  links: ArticleBodyLinks;
};

export type ArticleBodyAssets = {
  __typename?: 'ArticleBodyAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type ArticleBodyEntries = {
  __typename?: 'ArticleBodyEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type ArticleBodyLinks = {
  __typename?: 'ArticleBodyLinks';
  assets: ArticleBodyAssets;
  entries: ArticleBodyEntries;
  resources: ArticleBodyResources;
};

export type ArticleBodyResources = {
  __typename?: 'ArticleBodyResources';
  block: Array<ArticleBodyResourcesBlock>;
  hyperlink: Array<ArticleBodyResourcesHyperlink>;
  inline: Array<ArticleBodyResourcesInline>;
};

export type ArticleBodyResourcesBlock = ResourceLink & {
  __typename?: 'ArticleBodyResourcesBlock';
  sys: ResourceSys;
};

export type ArticleBodyResourcesHyperlink = ResourceLink & {
  __typename?: 'ArticleBodyResourcesHyperlink';
  sys: ResourceSys;
};

export type ArticleBodyResourcesInline = ResourceLink & {
  __typename?: 'ArticleBodyResourcesInline';
  sys: ResourceSys;
};

export type ArticleCollection = {
  __typename?: 'ArticleCollection';
  items: Array<Maybe<Article>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ArticleCursorCollection = {
  __typename?: 'ArticleCursorCollection';
  items: Array<Maybe<Article>>;
  limit: Scalars['Int']['output'];
  pages: CursorPages;
};

export type ArticleFilter = {
  AND?: InputMaybe<Array<InputMaybe<ArticleFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ArticleFilter>>>;
  body_contains?: InputMaybe<Scalars['String']['input']>;
  body_exists?: InputMaybe<Scalars['Boolean']['input']>;
  body_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  date?: InputMaybe<Scalars['DateTime']['input']>;
  date_exists?: InputMaybe<Scalars['Boolean']['input']>;
  date_gt?: InputMaybe<Scalars['DateTime']['input']>;
  date_gte?: InputMaybe<Scalars['DateTime']['input']>;
  date_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  date_lt?: InputMaybe<Scalars['DateTime']['input']>;
  date_lte?: InputMaybe<Scalars['DateTime']['input']>;
  date_not?: InputMaybe<Scalars['DateTime']['input']>;
  date_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  image?: InputMaybe<cfImageNestedFilter>;
  image_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug?: InputMaybe<Scalars['String']['input']>;
  slug_contains?: InputMaybe<Scalars['String']['input']>;
  slug_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slug_not?: InputMaybe<Scalars['String']['input']>;
  slug_not_contains?: InputMaybe<Scalars['String']['input']>;
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ArticleLinkingCollections = {
  __typename?: 'ArticleLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  entryCursorCollection?: Maybe<EntryCursorCollection>;
};


export type ArticleLinkingCollectionsentryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ArticleLinkingCollectionsentryCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum ArticleOrder {
  date_ASC = 'date_ASC',
  date_DESC = 'date_DESC',
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  slug_ASC = 'slug_ASC',
  slug_DESC = 'slug_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

/** Represents a binary file in a space. An asset can be any file type. */
export type Asset = {
  __typename?: 'Asset';
  contentType?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']['output']>;
  fileName?: Maybe<Scalars['String']['output']>;
  height?: Maybe<Scalars['Int']['output']>;
  linkedFrom?: Maybe<AssetLinkingCollections>;
  size?: Maybe<Scalars['Int']['output']>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
  width?: Maybe<Scalars['Int']['output']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetcontentTypeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetdescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetfileNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetheightArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetlinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetsizeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssettitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AsseturlArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  transform?: InputMaybe<ImageTransformOptions>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** Represents a binary file in a space. An asset can be any file type. */
export type AssetwidthArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AssetCollection = {
  __typename?: 'AssetCollection';
  items: Array<Maybe<Asset>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type AssetCursorCollection = {
  __typename?: 'AssetCursorCollection';
  items: Array<Maybe<Asset>>;
  limit: Scalars['Int']['output'];
  pages: CursorPages;
};

export type AssetFilter = {
  AND?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<AssetFilter>>>;
  contentType?: InputMaybe<Scalars['String']['input']>;
  contentType_contains?: InputMaybe<Scalars['String']['input']>;
  contentType_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentType_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentType_not?: InputMaybe<Scalars['String']['input']>;
  contentType_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fileName?: InputMaybe<Scalars['String']['input']>;
  fileName_contains?: InputMaybe<Scalars['String']['input']>;
  fileName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  fileName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  fileName_not?: InputMaybe<Scalars['String']['input']>;
  fileName_not_contains?: InputMaybe<Scalars['String']['input']>;
  fileName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  height?: InputMaybe<Scalars['Int']['input']>;
  height_exists?: InputMaybe<Scalars['Boolean']['input']>;
  height_gt?: InputMaybe<Scalars['Int']['input']>;
  height_gte?: InputMaybe<Scalars['Int']['input']>;
  height_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  height_lt?: InputMaybe<Scalars['Int']['input']>;
  height_lte?: InputMaybe<Scalars['Int']['input']>;
  height_not?: InputMaybe<Scalars['Int']['input']>;
  height_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  size?: InputMaybe<Scalars['Int']['input']>;
  size_exists?: InputMaybe<Scalars['Boolean']['input']>;
  size_gt?: InputMaybe<Scalars['Int']['input']>;
  size_gte?: InputMaybe<Scalars['Int']['input']>;
  size_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  size_lt?: InputMaybe<Scalars['Int']['input']>;
  size_lte?: InputMaybe<Scalars['Int']['input']>;
  size_not?: InputMaybe<Scalars['Int']['input']>;
  size_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url?: InputMaybe<Scalars['String']['input']>;
  url_contains?: InputMaybe<Scalars['String']['input']>;
  url_exists?: InputMaybe<Scalars['Boolean']['input']>;
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url_not?: InputMaybe<Scalars['String']['input']>;
  url_not_contains?: InputMaybe<Scalars['String']['input']>;
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  width?: InputMaybe<Scalars['Int']['input']>;
  width_exists?: InputMaybe<Scalars['Boolean']['input']>;
  width_gt?: InputMaybe<Scalars['Int']['input']>;
  width_gte?: InputMaybe<Scalars['Int']['input']>;
  width_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  width_lt?: InputMaybe<Scalars['Int']['input']>;
  width_lte?: InputMaybe<Scalars['Int']['input']>;
  width_not?: InputMaybe<Scalars['Int']['input']>;
  width_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
};

export type AssetLinkingCollections = {
  __typename?: 'AssetLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  entryCursorCollection?: Maybe<EntryCursorCollection>;
  imageCollection?: Maybe<ImageCollection>;
  imageCursorCollection?: Maybe<ImageCursorCollection>;
  layoutCollection?: Maybe<LayoutCollection>;
  layoutCursorCollection?: Maybe<LayoutCursorCollection>;
  videoCollection?: Maybe<VideoCollection>;
  videoCursorCollection?: Maybe<VideoCursorCollection>;
};


export type AssetLinkingCollectionsentryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionsentryCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionsimageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionsimageCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionslayoutCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionslayoutCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionsvideoCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type AssetLinkingCollectionsvideoCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum AssetOrder {
  contentType_ASC = 'contentType_ASC',
  contentType_DESC = 'contentType_DESC',
  fileName_ASC = 'fileName_ASC',
  fileName_DESC = 'fileName_DESC',
  height_ASC = 'height_ASC',
  height_DESC = 'height_DESC',
  size_ASC = 'size_ASC',
  size_DESC = 'size_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  url_ASC = 'url_ASC',
  url_DESC = 'url_DESC',
  width_ASC = 'width_ASC',
  width_DESC = 'width_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/config) */
export type Config = Entry & _Node & {
  __typename?: 'Config';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<ConfigLinkingCollections>;
  slugArticleDetailPage?: Maybe<Scalars['String']['output']>;
  slugProductDetailPage?: Maybe<Scalars['String']['output']>;
  slugProductListingPage?: Maybe<Scalars['String']['output']>;
  sys: Sys;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/config) */
export type ConfiginternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/config) */
export type ConfiglinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/config) */
export type ConfigslugArticleDetailPageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/config) */
export type ConfigslugProductDetailPageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/config) */
export type ConfigslugProductListingPageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ConfigCollection = {
  __typename?: 'ConfigCollection';
  items: Array<Maybe<Config>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ConfigCursorCollection = {
  __typename?: 'ConfigCursorCollection';
  items: Array<Maybe<Config>>;
  limit: Scalars['Int']['output'];
  pages: CursorPages;
};

export type ConfigFilter = {
  AND?: InputMaybe<Array<InputMaybe<ConfigFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ConfigFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slugArticleDetailPage?: InputMaybe<Scalars['String']['input']>;
  slugArticleDetailPage_contains?: InputMaybe<Scalars['String']['input']>;
  slugArticleDetailPage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slugArticleDetailPage_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slugArticleDetailPage_not?: InputMaybe<Scalars['String']['input']>;
  slugArticleDetailPage_not_contains?: InputMaybe<Scalars['String']['input']>;
  slugArticleDetailPage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slugProductDetailPage?: InputMaybe<Scalars['String']['input']>;
  slugProductDetailPage_contains?: InputMaybe<Scalars['String']['input']>;
  slugProductDetailPage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slugProductDetailPage_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slugProductDetailPage_not?: InputMaybe<Scalars['String']['input']>;
  slugProductDetailPage_not_contains?: InputMaybe<Scalars['String']['input']>;
  slugProductDetailPage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slugProductListingPage?: InputMaybe<Scalars['String']['input']>;
  slugProductListingPage_contains?: InputMaybe<Scalars['String']['input']>;
  slugProductListingPage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  slugProductListingPage_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  slugProductListingPage_not?: InputMaybe<Scalars['String']['input']>;
  slugProductListingPage_not_contains?: InputMaybe<Scalars['String']['input']>;
  slugProductListingPage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type ConfigLinkingCollections = {
  __typename?: 'ConfigLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  entryCursorCollection?: Maybe<EntryCursorCollection>;
};


export type ConfigLinkingCollectionsentryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ConfigLinkingCollectionsentryCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum ConfigOrder {
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  slugArticleDetailPage_ASC = 'slugArticleDetailPage_ASC',
  slugArticleDetailPage_DESC = 'slugArticleDetailPage_DESC',
  slugProductDetailPage_ASC = 'slugProductDetailPage_ASC',
  slugProductDetailPage_DESC = 'slugProductDetailPage_DESC',
  slugProductListingPage_ASC = 'slugProductListingPage_ASC',
  slugProductListingPage_DESC = 'slugProductListingPage_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/contentItem) */
export type ContentItem = Entry & _Node & {
  __typename?: 'ContentItem';
  _id: Scalars['ID']['output'];
  body?: Maybe<ContentItemBody>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']['output']>;
  endDate?: Maybe<Scalars['DateTime']['output']>;
  entryField?: Maybe<Scalars['String']['output']>;
  icon?: Maybe<Icon>;
  image?: Maybe<Image>;
  linkedFrom?: Maybe<ContentItemLinkingCollections>;
  linksCollection?: Maybe<ContentItemLinksCollection>;
  linksCursorCollection?: Maybe<ContentItemLinksCursorCollection>;
  progress?: Maybe<Scalars['Int']['output']>;
  startDate?: Maybe<Scalars['DateTime']['output']>;
  subItemsCollection?: Maybe<ContentItemSubItemsCollection>;
  subItemsCursorCollection?: Maybe<ContentItemSubItemsCursorCollection>;
  subtitle?: Maybe<Scalars['String']['output']>;
  sys: Sys;
  tags?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  title?: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/contentItem) */
export type ContentItembodyArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/contentItem) */
export type ContentItemdescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/contentItem) */
export type ContentItemendDateArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/contentItem) */
export type ContentItementryFieldArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/contentItem) */
export type ContentItemiconArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<IconFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/contentItem) */
export type ContentItemimageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ImageFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/contentItem) */
export type ContentItemlinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/contentItem) */
export type ContentItemlinksCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ContentItemLinksCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<LinkFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/contentItem) */
export type ContentItemlinksCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ContentItemLinksCursorCollectionOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<LinkFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/contentItem) */
export type ContentItemprogressArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/contentItem) */
export type ContentItemstartDateArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/contentItem) */
export type ContentItemsubItemsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ContentItemSubItemsCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<StatItemFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/contentItem) */
export type ContentItemsubItemsCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ContentItemSubItemsCursorCollectionOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<StatItemFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/contentItem) */
export type ContentItemsubtitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/contentItem) */
export type ContentItemtagsArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/contentItem) */
export type ContentItemtitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ContentItemBody = {
  __typename?: 'ContentItemBody';
  json: Scalars['JSON']['output'];
  links: ContentItemBodyLinks;
};

export type ContentItemBodyAssets = {
  __typename?: 'ContentItemBodyAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type ContentItemBodyEntries = {
  __typename?: 'ContentItemBodyEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type ContentItemBodyLinks = {
  __typename?: 'ContentItemBodyLinks';
  assets: ContentItemBodyAssets;
  entries: ContentItemBodyEntries;
  resources: ContentItemBodyResources;
};

export type ContentItemBodyResources = {
  __typename?: 'ContentItemBodyResources';
  block: Array<ContentItemBodyResourcesBlock>;
  hyperlink: Array<ContentItemBodyResourcesHyperlink>;
  inline: Array<ContentItemBodyResourcesInline>;
};

export type ContentItemBodyResourcesBlock = ResourceLink & {
  __typename?: 'ContentItemBodyResourcesBlock';
  sys: ResourceSys;
};

export type ContentItemBodyResourcesHyperlink = ResourceLink & {
  __typename?: 'ContentItemBodyResourcesHyperlink';
  sys: ResourceSys;
};

export type ContentItemBodyResourcesInline = ResourceLink & {
  __typename?: 'ContentItemBodyResourcesInline';
  sys: ResourceSys;
};

export type ContentItemCollection = {
  __typename?: 'ContentItemCollection';
  items: Array<Maybe<ContentItem>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ContentItemCursorCollection = {
  __typename?: 'ContentItemCursorCollection';
  items: Array<Maybe<ContentItem>>;
  limit: Scalars['Int']['output'];
  pages: CursorPages;
};

export type ContentItemFilter = {
  AND?: InputMaybe<Array<InputMaybe<ContentItemFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ContentItemFilter>>>;
  body_contains?: InputMaybe<Scalars['String']['input']>;
  body_exists?: InputMaybe<Scalars['Boolean']['input']>;
  body_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  endDate_exists?: InputMaybe<Scalars['Boolean']['input']>;
  endDate_gt?: InputMaybe<Scalars['DateTime']['input']>;
  endDate_gte?: InputMaybe<Scalars['DateTime']['input']>;
  endDate_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  endDate_lt?: InputMaybe<Scalars['DateTime']['input']>;
  endDate_lte?: InputMaybe<Scalars['DateTime']['input']>;
  endDate_not?: InputMaybe<Scalars['DateTime']['input']>;
  endDate_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  entryField?: InputMaybe<Scalars['String']['input']>;
  entryField_contains?: InputMaybe<Scalars['String']['input']>;
  entryField_exists?: InputMaybe<Scalars['Boolean']['input']>;
  entryField_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  entryField_not?: InputMaybe<Scalars['String']['input']>;
  entryField_not_contains?: InputMaybe<Scalars['String']['input']>;
  entryField_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  icon?: InputMaybe<cfIconNestedFilter>;
  icon_exists?: InputMaybe<Scalars['Boolean']['input']>;
  image?: InputMaybe<cfImageNestedFilter>;
  image_exists?: InputMaybe<Scalars['Boolean']['input']>;
  links?: InputMaybe<cfLinkNestedFilter>;
  linksCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  progress?: InputMaybe<Scalars['Int']['input']>;
  progress_exists?: InputMaybe<Scalars['Boolean']['input']>;
  progress_gt?: InputMaybe<Scalars['Int']['input']>;
  progress_gte?: InputMaybe<Scalars['Int']['input']>;
  progress_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  progress_lt?: InputMaybe<Scalars['Int']['input']>;
  progress_lte?: InputMaybe<Scalars['Int']['input']>;
  progress_not?: InputMaybe<Scalars['Int']['input']>;
  progress_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  startDate_exists?: InputMaybe<Scalars['Boolean']['input']>;
  startDate_gt?: InputMaybe<Scalars['DateTime']['input']>;
  startDate_gte?: InputMaybe<Scalars['DateTime']['input']>;
  startDate_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  startDate_lt?: InputMaybe<Scalars['DateTime']['input']>;
  startDate_lte?: InputMaybe<Scalars['DateTime']['input']>;
  startDate_not?: InputMaybe<Scalars['DateTime']['input']>;
  startDate_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  subItems?: InputMaybe<cfStatItemNestedFilter>;
  subItemsCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  subtitle?: InputMaybe<Scalars['String']['input']>;
  subtitle_contains?: InputMaybe<Scalars['String']['input']>;
  subtitle_exists?: InputMaybe<Scalars['Boolean']['input']>;
  subtitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  subtitle_not?: InputMaybe<Scalars['String']['input']>;
  subtitle_not_contains?: InputMaybe<Scalars['String']['input']>;
  subtitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  tags_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tags_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tags_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tags_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ContentItemLinkingCollections = {
  __typename?: 'ContentItemLinkingCollections';
  contentListCollection?: Maybe<ContentListCollection>;
  contentListCursorCollection?: Maybe<ContentListCursorCollection>;
  contentSectionCollection?: Maybe<ContentSectionCollection>;
  contentSectionCursorCollection?: Maybe<ContentSectionCursorCollection>;
  entryCollection?: Maybe<EntryCollection>;
  entryCursorCollection?: Maybe<EntryCursorCollection>;
};


export type ContentItemLinkingCollectionscontentListCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ContentItemLinkingCollectionsContentListCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ContentItemLinkingCollectionscontentListCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ContentItemLinkingCollectionsContentListCursorCollectionOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ContentItemLinkingCollectionscontentSectionCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ContentItemLinkingCollectionsContentSectionCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ContentItemLinkingCollectionscontentSectionCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ContentItemLinkingCollectionsContentSectionCursorCollectionOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ContentItemLinkingCollectionsentryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ContentItemLinkingCollectionsentryCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum ContentItemLinkingCollectionsContentListCollectionOrder {
  entries_ASC = 'entries_ASC',
  entries_DESC = 'entries_DESC',
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC',
  ui_ASC = 'ui_ASC',
  ui_DESC = 'ui_DESC'
}

export enum ContentItemLinkingCollectionsContentListCursorCollectionOrder {
  entries_ASC = 'entries_ASC',
  entries_DESC = 'entries_DESC',
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC',
  ui_ASC = 'ui_ASC',
  ui_DESC = 'ui_DESC'
}

export enum ContentItemLinkingCollectionsContentSectionCollectionOrder {
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  ui_ASC = 'ui_ASC',
  ui_DESC = 'ui_DESC'
}

export enum ContentItemLinkingCollectionsContentSectionCursorCollectionOrder {
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  ui_ASC = 'ui_ASC',
  ui_DESC = 'ui_DESC'
}

export type ContentItemLinksCollection = {
  __typename?: 'ContentItemLinksCollection';
  items: Array<Maybe<Link>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum ContentItemLinksCollectionOrder {
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  text_ASC = 'text_ASC',
  text_DESC = 'text_DESC',
  url_ASC = 'url_ASC',
  url_DESC = 'url_DESC'
}

export type ContentItemLinksCursorCollection = {
  __typename?: 'ContentItemLinksCursorCollection';
  items: Array<Maybe<Link>>;
  limit: Scalars['Int']['output'];
  pages: CursorPages;
};

export enum ContentItemLinksCursorCollectionOrder {
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  text_ASC = 'text_ASC',
  text_DESC = 'text_DESC',
  url_ASC = 'url_ASC',
  url_DESC = 'url_DESC'
}

export enum ContentItemOrder {
  endDate_ASC = 'endDate_ASC',
  endDate_DESC = 'endDate_DESC',
  entryField_ASC = 'entryField_ASC',
  entryField_DESC = 'entryField_DESC',
  progress_ASC = 'progress_ASC',
  progress_DESC = 'progress_DESC',
  startDate_ASC = 'startDate_ASC',
  startDate_DESC = 'startDate_DESC',
  subtitle_ASC = 'subtitle_ASC',
  subtitle_DESC = 'subtitle_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export type ContentItemSubItemsCollection = {
  __typename?: 'ContentItemSubItemsCollection';
  items: Array<Maybe<StatItem>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum ContentItemSubItemsCollectionOrder {
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  progress_ASC = 'progress_ASC',
  progress_DESC = 'progress_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export type ContentItemSubItemsCursorCollection = {
  __typename?: 'ContentItemSubItemsCursorCollection';
  items: Array<Maybe<StatItem>>;
  limit: Scalars['Int']['output'];
  pages: CursorPages;
};

export enum ContentItemSubItemsCursorCollectionOrder {
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  progress_ASC = 'progress_ASC',
  progress_DESC = 'progress_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/contentList) */
export type ContentList = Entry & _Node & {
  __typename?: 'ContentList';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  customEntriesCollection?: Maybe<ContentListCustomEntriesCollection>;
  customEntriesCursorCollection?: Maybe<ContentListCustomEntriesCursorCollection>;
  description?: Maybe<ContentListDescription>;
  entries?: Maybe<Scalars['String']['output']>;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<ContentListLinkingCollections>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
  ui?: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/contentList) */
export type ContentListcustomEntriesCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ContentListCustomEntriesCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ContentItemFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/contentList) */
export type ContentListcustomEntriesCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ContentListCustomEntriesCursorCollectionOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ContentItemFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/contentList) */
export type ContentListdescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/contentList) */
export type ContentListentriesArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/contentList) */
export type ContentListinternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/contentList) */
export type ContentListlinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/contentList) */
export type ContentListtitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/contentList) */
export type ContentListuiArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ContentListCollection = {
  __typename?: 'ContentListCollection';
  items: Array<Maybe<ContentList>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ContentListCursorCollection = {
  __typename?: 'ContentListCursorCollection';
  items: Array<Maybe<ContentList>>;
  limit: Scalars['Int']['output'];
  pages: CursorPages;
};

export type ContentListCustomEntriesCollection = {
  __typename?: 'ContentListCustomEntriesCollection';
  items: Array<Maybe<ContentItem>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum ContentListCustomEntriesCollectionOrder {
  endDate_ASC = 'endDate_ASC',
  endDate_DESC = 'endDate_DESC',
  entryField_ASC = 'entryField_ASC',
  entryField_DESC = 'entryField_DESC',
  progress_ASC = 'progress_ASC',
  progress_DESC = 'progress_DESC',
  startDate_ASC = 'startDate_ASC',
  startDate_DESC = 'startDate_DESC',
  subtitle_ASC = 'subtitle_ASC',
  subtitle_DESC = 'subtitle_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export type ContentListCustomEntriesCursorCollection = {
  __typename?: 'ContentListCustomEntriesCursorCollection';
  items: Array<Maybe<ContentItem>>;
  limit: Scalars['Int']['output'];
  pages: CursorPages;
};

export enum ContentListCustomEntriesCursorCollectionOrder {
  endDate_ASC = 'endDate_ASC',
  endDate_DESC = 'endDate_DESC',
  entryField_ASC = 'entryField_ASC',
  entryField_DESC = 'entryField_DESC',
  progress_ASC = 'progress_ASC',
  progress_DESC = 'progress_DESC',
  startDate_ASC = 'startDate_ASC',
  startDate_DESC = 'startDate_DESC',
  subtitle_ASC = 'subtitle_ASC',
  subtitle_DESC = 'subtitle_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export type ContentListDescription = {
  __typename?: 'ContentListDescription';
  json: Scalars['JSON']['output'];
  links: ContentListDescriptionLinks;
};

export type ContentListDescriptionAssets = {
  __typename?: 'ContentListDescriptionAssets';
  block: Array<Maybe<Asset>>;
  hyperlink: Array<Maybe<Asset>>;
};

export type ContentListDescriptionEntries = {
  __typename?: 'ContentListDescriptionEntries';
  block: Array<Maybe<Entry>>;
  hyperlink: Array<Maybe<Entry>>;
  inline: Array<Maybe<Entry>>;
};

export type ContentListDescriptionLinks = {
  __typename?: 'ContentListDescriptionLinks';
  assets: ContentListDescriptionAssets;
  entries: ContentListDescriptionEntries;
  resources: ContentListDescriptionResources;
};

export type ContentListDescriptionResources = {
  __typename?: 'ContentListDescriptionResources';
  block: Array<ContentListDescriptionResourcesBlock>;
  hyperlink: Array<ContentListDescriptionResourcesHyperlink>;
  inline: Array<ContentListDescriptionResourcesInline>;
};

export type ContentListDescriptionResourcesBlock = ResourceLink & {
  __typename?: 'ContentListDescriptionResourcesBlock';
  sys: ResourceSys;
};

export type ContentListDescriptionResourcesHyperlink = ResourceLink & {
  __typename?: 'ContentListDescriptionResourcesHyperlink';
  sys: ResourceSys;
};

export type ContentListDescriptionResourcesInline = ResourceLink & {
  __typename?: 'ContentListDescriptionResourcesInline';
  sys: ResourceSys;
};

export type ContentListFilter = {
  AND?: InputMaybe<Array<InputMaybe<ContentListFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ContentListFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  customEntries?: InputMaybe<cfContentItemNestedFilter>;
  customEntriesCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  entries?: InputMaybe<Scalars['String']['input']>;
  entries_contains?: InputMaybe<Scalars['String']['input']>;
  entries_exists?: InputMaybe<Scalars['Boolean']['input']>;
  entries_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  entries_not?: InputMaybe<Scalars['String']['input']>;
  entries_not_contains?: InputMaybe<Scalars['String']['input']>;
  entries_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ui?: InputMaybe<Scalars['String']['input']>;
  ui_contains?: InputMaybe<Scalars['String']['input']>;
  ui_exists?: InputMaybe<Scalars['Boolean']['input']>;
  ui_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ui_not?: InputMaybe<Scalars['String']['input']>;
  ui_not_contains?: InputMaybe<Scalars['String']['input']>;
  ui_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ContentListLinkingCollections = {
  __typename?: 'ContentListLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  entryCursorCollection?: Maybe<EntryCursorCollection>;
  pageCollection?: Maybe<PageCollection>;
  pageCursorCollection?: Maybe<PageCursorCollection>;
};


export type ContentListLinkingCollectionsentryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ContentListLinkingCollectionsentryCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ContentListLinkingCollectionspageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ContentListLinkingCollectionsPageCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ContentListLinkingCollectionspageCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ContentListLinkingCollectionsPageCursorCollectionOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum ContentListLinkingCollectionsPageCollectionOrder {
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  path_ASC = 'path_ASC',
  path_DESC = 'path_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export enum ContentListLinkingCollectionsPageCursorCollectionOrder {
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  path_ASC = 'path_ASC',
  path_DESC = 'path_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export enum ContentListOrder {
  entries_ASC = 'entries_ASC',
  entries_DESC = 'entries_DESC',
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC',
  ui_ASC = 'ui_ASC',
  ui_DESC = 'ui_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/contentSection) */
export type ContentSection = Entry & _Node & {
  __typename?: 'ContentSection';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  entry?: Maybe<ContentSectionEntry>;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<ContentSectionLinkingCollections>;
  sys: Sys;
  ui?: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/contentSection) */
export type ContentSectionentryArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/contentSection) */
export type ContentSectioninternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/contentSection) */
export type ContentSectionlinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/contentSection) */
export type ContentSectionuiArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ContentSectionCollection = {
  __typename?: 'ContentSectionCollection';
  items: Array<Maybe<ContentSection>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ContentSectionCursorCollection = {
  __typename?: 'ContentSectionCursorCollection';
  items: Array<Maybe<ContentSection>>;
  limit: Scalars['Int']['output'];
  pages: CursorPages;
};

export type ContentSectionEntry = ContentItem | StatItem;

export type ContentSectionFilter = {
  AND?: InputMaybe<Array<InputMaybe<ContentSectionFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ContentSectionFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  entry_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  ui?: InputMaybe<Scalars['String']['input']>;
  ui_contains?: InputMaybe<Scalars['String']['input']>;
  ui_exists?: InputMaybe<Scalars['Boolean']['input']>;
  ui_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ui_not?: InputMaybe<Scalars['String']['input']>;
  ui_not_contains?: InputMaybe<Scalars['String']['input']>;
  ui_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ContentSectionLinkingCollections = {
  __typename?: 'ContentSectionLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  entryCursorCollection?: Maybe<EntryCursorCollection>;
  pageCollection?: Maybe<PageCollection>;
  pageCursorCollection?: Maybe<PageCursorCollection>;
};


export type ContentSectionLinkingCollectionsentryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ContentSectionLinkingCollectionsentryCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ContentSectionLinkingCollectionspageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ContentSectionLinkingCollectionsPageCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ContentSectionLinkingCollectionspageCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ContentSectionLinkingCollectionsPageCursorCollectionOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum ContentSectionLinkingCollectionsPageCollectionOrder {
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  path_ASC = 'path_ASC',
  path_DESC = 'path_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export enum ContentSectionLinkingCollectionsPageCursorCollectionOrder {
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  path_ASC = 'path_ASC',
  path_DESC = 'path_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export enum ContentSectionOrder {
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  ui_ASC = 'ui_ASC',
  ui_DESC = 'ui_DESC'
}

export type ContentfulMetadata = {
  __typename?: 'ContentfulMetadata';
  concepts: Array<Maybe<TaxonomyConcept>>;
  tags: Array<Maybe<ContentfulTag>>;
};

export type ContentfulMetadataConceptsDescendantsFilter = {
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ContentfulMetadataConceptsFilter = {
  descendants?: InputMaybe<ContentfulMetadataConceptsDescendantsFilter>;
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ContentfulMetadataFilter = {
  concepts?: InputMaybe<ContentfulMetadataConceptsFilter>;
  concepts_exists?: InputMaybe<Scalars['Boolean']['input']>;
  tags?: InputMaybe<ContentfulMetadataTagsFilter>;
  tags_exists?: InputMaybe<Scalars['Boolean']['input']>;
};

export type ContentfulMetadataTagsFilter = {
  id_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

/**
 * Represents a tag entity for finding and organizing content easily.
 *       Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-tags
 */
export type ContentfulTag = {
  __typename?: 'ContentfulTag';
  id?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type CursorPages = {
  __typename?: 'CursorPages';
  next?: Maybe<Scalars['String']['output']>;
  prev?: Maybe<Scalars['String']['output']>;
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

export type EntryCursorCollection = {
  __typename?: 'EntryCursorCollection';
  items: Array<Maybe<Entry>>;
  limit: Scalars['Int']['output'];
  pages: CursorPages;
};

export type EntryFilter = {
  AND?: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<EntryFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  sys?: InputMaybe<SysFilter>;
};

export enum EntryOrder {
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/icon) */
export type Icon = Entry & _Node & {
  __typename?: 'Icon';
  _id: Scalars['ID']['output'];
  color?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  iconCode?: Maybe<Scalars['String']['output']>;
  internalName?: Maybe<Scalars['String']['output']>;
  library?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<IconLinkingCollections>;
  name?: Maybe<Scalars['String']['output']>;
  showTooltip?: Maybe<Scalars['Boolean']['output']>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/icon) */
export type IconcolorArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/icon) */
export type IconiconCodeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/icon) */
export type IconinternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/icon) */
export type IconlibraryArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/icon) */
export type IconlinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/icon) */
export type IconnameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/icon) */
export type IconshowTooltipArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/icon) */
export type IcontitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type IconCollection = {
  __typename?: 'IconCollection';
  items: Array<Maybe<Icon>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type IconCursorCollection = {
  __typename?: 'IconCursorCollection';
  items: Array<Maybe<Icon>>;
  limit: Scalars['Int']['output'];
  pages: CursorPages;
};

export type IconFilter = {
  AND?: InputMaybe<Array<InputMaybe<IconFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<IconFilter>>>;
  color?: InputMaybe<Scalars['String']['input']>;
  color_contains?: InputMaybe<Scalars['String']['input']>;
  color_exists?: InputMaybe<Scalars['Boolean']['input']>;
  color_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  color_not?: InputMaybe<Scalars['String']['input']>;
  color_not_contains?: InputMaybe<Scalars['String']['input']>;
  color_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  iconCode?: InputMaybe<Scalars['String']['input']>;
  iconCode_contains?: InputMaybe<Scalars['String']['input']>;
  iconCode_exists?: InputMaybe<Scalars['Boolean']['input']>;
  iconCode_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  iconCode_not?: InputMaybe<Scalars['String']['input']>;
  iconCode_not_contains?: InputMaybe<Scalars['String']['input']>;
  iconCode_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  library?: InputMaybe<Scalars['String']['input']>;
  library_contains?: InputMaybe<Scalars['String']['input']>;
  library_exists?: InputMaybe<Scalars['Boolean']['input']>;
  library_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  library_not?: InputMaybe<Scalars['String']['input']>;
  library_not_contains?: InputMaybe<Scalars['String']['input']>;
  library_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_exists?: InputMaybe<Scalars['Boolean']['input']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  showTooltip?: InputMaybe<Scalars['Boolean']['input']>;
  showTooltip_exists?: InputMaybe<Scalars['Boolean']['input']>;
  showTooltip_not?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type IconLinkingCollections = {
  __typename?: 'IconLinkingCollections';
  contentItemCollection?: Maybe<ContentItemCollection>;
  contentItemCursorCollection?: Maybe<ContentItemCursorCollection>;
  entryCollection?: Maybe<EntryCollection>;
  entryCursorCollection?: Maybe<EntryCursorCollection>;
  layoutCollection?: Maybe<LayoutCollection>;
  layoutCursorCollection?: Maybe<LayoutCursorCollection>;
  linkCollection?: Maybe<LinkCollection>;
  linkCursorCollection?: Maybe<LinkCursorCollection>;
  statItemCollection?: Maybe<StatItemCollection>;
  statItemCursorCollection?: Maybe<StatItemCursorCollection>;
};


export type IconLinkingCollectionscontentItemCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<IconLinkingCollectionsContentItemCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type IconLinkingCollectionscontentItemCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<IconLinkingCollectionsContentItemCursorCollectionOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type IconLinkingCollectionsentryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type IconLinkingCollectionsentryCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type IconLinkingCollectionslayoutCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<IconLinkingCollectionsLayoutCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type IconLinkingCollectionslayoutCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<IconLinkingCollectionsLayoutCursorCollectionOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type IconLinkingCollectionslinkCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<IconLinkingCollectionsLinkCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type IconLinkingCollectionslinkCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<IconLinkingCollectionsLinkCursorCollectionOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type IconLinkingCollectionsstatItemCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<IconLinkingCollectionsStatItemCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type IconLinkingCollectionsstatItemCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<IconLinkingCollectionsStatItemCursorCollectionOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum IconLinkingCollectionsContentItemCollectionOrder {
  endDate_ASC = 'endDate_ASC',
  endDate_DESC = 'endDate_DESC',
  entryField_ASC = 'entryField_ASC',
  entryField_DESC = 'entryField_DESC',
  progress_ASC = 'progress_ASC',
  progress_DESC = 'progress_DESC',
  startDate_ASC = 'startDate_ASC',
  startDate_DESC = 'startDate_DESC',
  subtitle_ASC = 'subtitle_ASC',
  subtitle_DESC = 'subtitle_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export enum IconLinkingCollectionsContentItemCursorCollectionOrder {
  endDate_ASC = 'endDate_ASC',
  endDate_DESC = 'endDate_DESC',
  entryField_ASC = 'entryField_ASC',
  entryField_DESC = 'entryField_DESC',
  progress_ASC = 'progress_ASC',
  progress_DESC = 'progress_DESC',
  startDate_ASC = 'startDate_ASC',
  startDate_DESC = 'startDate_DESC',
  subtitle_ASC = 'subtitle_ASC',
  subtitle_DESC = 'subtitle_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export enum IconLinkingCollectionsLayoutCollectionOrder {
  defaultTheme_ASC = 'defaultTheme_ASC',
  defaultTheme_DESC = 'defaultTheme_DESC',
  drawerSide_ASC = 'drawerSide_ASC',
  drawerSide_DESC = 'drawerSide_DESC',
  drawerVariant_ASC = 'drawerVariant_ASC',
  drawerVariant_DESC = 'drawerVariant_DESC',
  email_ASC = 'email_ASC',
  email_DESC = 'email_DESC',
  footerText_ASC = 'footerText_ASC',
  footerText_DESC = 'footerText_DESC',
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  role_ASC = 'role_ASC',
  role_DESC = 'role_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export enum IconLinkingCollectionsLayoutCursorCollectionOrder {
  defaultTheme_ASC = 'defaultTheme_ASC',
  defaultTheme_DESC = 'defaultTheme_DESC',
  drawerSide_ASC = 'drawerSide_ASC',
  drawerSide_DESC = 'drawerSide_DESC',
  drawerVariant_ASC = 'drawerVariant_ASC',
  drawerVariant_DESC = 'drawerVariant_DESC',
  email_ASC = 'email_ASC',
  email_DESC = 'email_DESC',
  footerText_ASC = 'footerText_ASC',
  footerText_DESC = 'footerText_DESC',
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  role_ASC = 'role_ASC',
  role_DESC = 'role_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export enum IconLinkingCollectionsLinkCollectionOrder {
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  text_ASC = 'text_ASC',
  text_DESC = 'text_DESC',
  url_ASC = 'url_ASC',
  url_DESC = 'url_DESC'
}

export enum IconLinkingCollectionsLinkCursorCollectionOrder {
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  text_ASC = 'text_ASC',
  text_DESC = 'text_DESC',
  url_ASC = 'url_ASC',
  url_DESC = 'url_DESC'
}

export enum IconLinkingCollectionsStatItemCollectionOrder {
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  progress_ASC = 'progress_ASC',
  progress_DESC = 'progress_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export enum IconLinkingCollectionsStatItemCursorCollectionOrder {
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  progress_ASC = 'progress_ASC',
  progress_DESC = 'progress_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export enum IconOrder {
  color_ASC = 'color_ASC',
  color_DESC = 'color_DESC',
  iconCode_ASC = 'iconCode_ASC',
  iconCode_DESC = 'iconCode_DESC',
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  library_ASC = 'library_ASC',
  library_DESC = 'library_DESC',
  name_ASC = 'name_ASC',
  name_DESC = 'name_DESC',
  showTooltip_ASC = 'showTooltip_ASC',
  showTooltip_DESC = 'showTooltip_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/image) */
export type Image = Entry & _Node & {
  __typename?: 'Image';
  _id: Scalars['ID']['output'];
  alternativeText?: Maybe<Scalars['String']['output']>;
  caption?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  image?: Maybe<Asset>;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<ImageLinkingCollections>;
  sys: Sys;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/image) */
export type ImagealternativeTextArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/image) */
export type ImagecaptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/image) */
export type ImageimageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/image) */
export type ImageinternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/image) */
export type ImagelinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type ImageCollection = {
  __typename?: 'ImageCollection';
  items: Array<Maybe<Image>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ImageCursorCollection = {
  __typename?: 'ImageCursorCollection';
  items: Array<Maybe<Image>>;
  limit: Scalars['Int']['output'];
  pages: CursorPages;
};

export type ImageFilter = {
  AND?: InputMaybe<Array<InputMaybe<ImageFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<ImageFilter>>>;
  alternativeText?: InputMaybe<Scalars['String']['input']>;
  alternativeText_contains?: InputMaybe<Scalars['String']['input']>;
  alternativeText_exists?: InputMaybe<Scalars['Boolean']['input']>;
  alternativeText_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  alternativeText_not?: InputMaybe<Scalars['String']['input']>;
  alternativeText_not_contains?: InputMaybe<Scalars['String']['input']>;
  alternativeText_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  caption?: InputMaybe<Scalars['String']['input']>;
  caption_contains?: InputMaybe<Scalars['String']['input']>;
  caption_exists?: InputMaybe<Scalars['Boolean']['input']>;
  caption_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  caption_not?: InputMaybe<Scalars['String']['input']>;
  caption_not_contains?: InputMaybe<Scalars['String']['input']>;
  caption_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  image_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export enum ImageFormat {
  /** AVIF image format. */
  AVIF = 'AVIF',
  /** JPG image format. */
  JPG = 'JPG',
  /**
   * Progressive JPG format stores multiple passes of an image in progressively higher detail.
   *         When a progressive image is loading, the viewer will first see a lower quality pixelated version which
   *         will gradually improve in detail, until the image is fully downloaded. This is to display an image as
   *         early as possible to make the layout look as designed.
   */
  JPG_PROGRESSIVE = 'JPG_PROGRESSIVE',
  /** PNG image format */
  PNG = 'PNG',
  /**
   * 8-bit PNG images support up to 256 colors and weigh less than the standard 24-bit PNG equivalent.
   *         The 8-bit PNG format is mostly used for simple images, such as icons or logos.
   */
  PNG8 = 'PNG8',
  /** WebP image format. */
  WEBP = 'WEBP'
}

export type ImageLinkingCollections = {
  __typename?: 'ImageLinkingCollections';
  articleCollection?: Maybe<ArticleCollection>;
  articleCursorCollection?: Maybe<ArticleCursorCollection>;
  contentItemCollection?: Maybe<ContentItemCollection>;
  contentItemCursorCollection?: Maybe<ContentItemCursorCollection>;
  entryCollection?: Maybe<EntryCollection>;
  entryCursorCollection?: Maybe<EntryCursorCollection>;
  layoutCollection?: Maybe<LayoutCollection>;
  layoutCursorCollection?: Maybe<LayoutCursorCollection>;
  seoMetadataCollection?: Maybe<SeoMetadataCollection>;
  seoMetadataCursorCollection?: Maybe<SeoMetadataCursorCollection>;
};


export type ImageLinkingCollectionsarticleCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ImageLinkingCollectionsArticleCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ImageLinkingCollectionsarticleCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ImageLinkingCollectionsArticleCursorCollectionOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ImageLinkingCollectionscontentItemCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ImageLinkingCollectionsContentItemCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ImageLinkingCollectionscontentItemCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ImageLinkingCollectionsContentItemCursorCollectionOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ImageLinkingCollectionsentryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ImageLinkingCollectionsentryCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ImageLinkingCollectionslayoutCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ImageLinkingCollectionsLayoutCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ImageLinkingCollectionslayoutCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ImageLinkingCollectionsLayoutCursorCollectionOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ImageLinkingCollectionsseoMetadataCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ImageLinkingCollectionsSeoMetadataCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type ImageLinkingCollectionsseoMetadataCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ImageLinkingCollectionsSeoMetadataCursorCollectionOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum ImageLinkingCollectionsArticleCollectionOrder {
  date_ASC = 'date_ASC',
  date_DESC = 'date_DESC',
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  slug_ASC = 'slug_ASC',
  slug_DESC = 'slug_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export enum ImageLinkingCollectionsArticleCursorCollectionOrder {
  date_ASC = 'date_ASC',
  date_DESC = 'date_DESC',
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  slug_ASC = 'slug_ASC',
  slug_DESC = 'slug_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export enum ImageLinkingCollectionsContentItemCollectionOrder {
  endDate_ASC = 'endDate_ASC',
  endDate_DESC = 'endDate_DESC',
  entryField_ASC = 'entryField_ASC',
  entryField_DESC = 'entryField_DESC',
  progress_ASC = 'progress_ASC',
  progress_DESC = 'progress_DESC',
  startDate_ASC = 'startDate_ASC',
  startDate_DESC = 'startDate_DESC',
  subtitle_ASC = 'subtitle_ASC',
  subtitle_DESC = 'subtitle_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export enum ImageLinkingCollectionsContentItemCursorCollectionOrder {
  endDate_ASC = 'endDate_ASC',
  endDate_DESC = 'endDate_DESC',
  entryField_ASC = 'entryField_ASC',
  entryField_DESC = 'entryField_DESC',
  progress_ASC = 'progress_ASC',
  progress_DESC = 'progress_DESC',
  startDate_ASC = 'startDate_ASC',
  startDate_DESC = 'startDate_DESC',
  subtitle_ASC = 'subtitle_ASC',
  subtitle_DESC = 'subtitle_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export enum ImageLinkingCollectionsLayoutCollectionOrder {
  defaultTheme_ASC = 'defaultTheme_ASC',
  defaultTheme_DESC = 'defaultTheme_DESC',
  drawerSide_ASC = 'drawerSide_ASC',
  drawerSide_DESC = 'drawerSide_DESC',
  drawerVariant_ASC = 'drawerVariant_ASC',
  drawerVariant_DESC = 'drawerVariant_DESC',
  email_ASC = 'email_ASC',
  email_DESC = 'email_DESC',
  footerText_ASC = 'footerText_ASC',
  footerText_DESC = 'footerText_DESC',
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  role_ASC = 'role_ASC',
  role_DESC = 'role_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export enum ImageLinkingCollectionsLayoutCursorCollectionOrder {
  defaultTheme_ASC = 'defaultTheme_ASC',
  defaultTheme_DESC = 'defaultTheme_DESC',
  drawerSide_ASC = 'drawerSide_ASC',
  drawerSide_DESC = 'drawerSide_DESC',
  drawerVariant_ASC = 'drawerVariant_ASC',
  drawerVariant_DESC = 'drawerVariant_DESC',
  email_ASC = 'email_ASC',
  email_DESC = 'email_DESC',
  footerText_ASC = 'footerText_ASC',
  footerText_DESC = 'footerText_DESC',
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  role_ASC = 'role_ASC',
  role_DESC = 'role_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export enum ImageLinkingCollectionsSeoMetadataCollectionOrder {
  canonicalUrl_ASC = 'canonicalUrl_ASC',
  canonicalUrl_DESC = 'canonicalUrl_DESC',
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  noFollow_ASC = 'noFollow_ASC',
  noFollow_DESC = 'noFollow_DESC',
  noIndex_ASC = 'noIndex_ASC',
  noIndex_DESC = 'noIndex_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export enum ImageLinkingCollectionsSeoMetadataCursorCollectionOrder {
  canonicalUrl_ASC = 'canonicalUrl_ASC',
  canonicalUrl_DESC = 'canonicalUrl_DESC',
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  noFollow_ASC = 'noFollow_ASC',
  noFollow_DESC = 'noFollow_DESC',
  noIndex_ASC = 'noIndex_ASC',
  noIndex_DESC = 'noIndex_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export enum ImageOrder {
  alternativeText_ASC = 'alternativeText_ASC',
  alternativeText_DESC = 'alternativeText_DESC',
  caption_ASC = 'caption_ASC',
  caption_DESC = 'caption_DESC',
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC'
}

export enum ImageResizeFocus {
  /** Focus the resizing on the bottom. */
  BOTTOM = 'BOTTOM',
  /** Focus the resizing on the bottom left. */
  BOTTOM_LEFT = 'BOTTOM_LEFT',
  /** Focus the resizing on the bottom right. */
  BOTTOM_RIGHT = 'BOTTOM_RIGHT',
  /** Focus the resizing on the center. */
  CENTER = 'CENTER',
  /** Focus the resizing on the largest face. */
  FACE = 'FACE',
  /** Focus the resizing on the area containing all the faces. */
  FACES = 'FACES',
  /** Focus the resizing on the left. */
  LEFT = 'LEFT',
  /** Focus the resizing on the right. */
  RIGHT = 'RIGHT',
  /** Focus the resizing on the top. */
  TOP = 'TOP',
  /** Focus the resizing on the top left. */
  TOP_LEFT = 'TOP_LEFT',
  /** Focus the resizing on the top right. */
  TOP_RIGHT = 'TOP_RIGHT'
}

export enum ImageResizeStrategy {
  /** Crops a part of the original image to fit into the specified dimensions. */
  CROP = 'CROP',
  /** Resizes the image to the specified dimensions, cropping the image if needed. */
  FILL = 'FILL',
  /** Resizes the image to fit into the specified dimensions. */
  FIT = 'FIT',
  /**
   * Resizes the image to the specified dimensions, padding the image if needed.
   *         Uses desired background color as padding color.
   */
  PAD = 'PAD',
  /** Resizes the image to the specified dimensions, changing the original aspect ratio if needed. */
  SCALE = 'SCALE',
  /** Creates a thumbnail from the image. */
  THUMB = 'THUMB'
}

export type ImageTransformOptions = {
  /**
   * Desired background color, used with corner radius or `PAD` resize strategy.
   *         Defaults to transparent (for `PNG`, `PNG8` and `WEBP`) or white (for `JPG` and `JPG_PROGRESSIVE`).
   */
  backgroundColor?: InputMaybe<Scalars['HexColor']['input']>;
  /**
   * Desired corner radius in pixels.
   *         Results in an image with rounded corners (pass `-1` for a full circle/ellipse).
   *         Defaults to `0`. Uses desired background color as padding color,
   *         unless the format is `JPG` or `JPG_PROGRESSIVE` and resize strategy is `PAD`, then defaults to white.
   */
  cornerRadius?: InputMaybe<Scalars['Int']['input']>;
  /** Desired image format. Defaults to the original image format. */
  format?: InputMaybe<ImageFormat>;
  /** Desired height in pixels. Defaults to the original image height. */
  height?: InputMaybe<Scalars['Dimension']['input']>;
  /**
   * Desired quality of the image in percents.
   *         Used for `PNG8`, `JPG`, `JPG_PROGRESSIVE` and `WEBP` formats.
   */
  quality?: InputMaybe<Scalars['Quality']['input']>;
  /** Desired resize focus area. Defaults to `CENTER`. */
  resizeFocus?: InputMaybe<ImageResizeFocus>;
  /** Desired resize strategy. Defaults to `FIT`. */
  resizeStrategy?: InputMaybe<ImageResizeStrategy>;
  /** Desired width in pixels. Defaults to the original image width. */
  width?: InputMaybe<Scalars['Dimension']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/layout) */
export type Layout = Entry & _Node & {
  __typename?: 'Layout';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  defaultTheme?: Maybe<Scalars['String']['output']>;
  drawerSide?: Maybe<Scalars['String']['output']>;
  drawerVariant?: Maybe<Scalars['String']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  footerText?: Maybe<Scalars['String']['output']>;
  globalSeo?: Maybe<SeoMetadata>;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<LayoutLinkingCollections>;
  navigationLinksCollection?: Maybe<LayoutNavigationLinksCollection>;
  navigationLinksCursorCollection?: Maybe<LayoutNavigationLinksCursorCollection>;
  resume?: Maybe<Asset>;
  resumeIcon?: Maybe<Icon>;
  role?: Maybe<Scalars['String']['output']>;
  siteLogo?: Maybe<Image>;
  sys: Sys;
  themeIcon?: Maybe<Icon>;
  themeList?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  title?: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/layout) */
export type LayoutdefaultThemeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/layout) */
export type LayoutdrawerSideArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/layout) */
export type LayoutdrawerVariantArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/layout) */
export type LayoutemailArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/layout) */
export type LayoutfooterTextArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/layout) */
export type LayoutglobalSeoArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<SeoMetadataFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/layout) */
export type LayoutinternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/layout) */
export type LayoutlinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/layout) */
export type LayoutnavigationLinksCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<LayoutNavigationLinksCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<LinkFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/layout) */
export type LayoutnavigationLinksCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<LayoutNavigationLinksCursorCollectionOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<LinkFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/layout) */
export type LayoutresumeArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/layout) */
export type LayoutresumeIconArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<IconFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/layout) */
export type LayoutroleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/layout) */
export type LayoutsiteLogoArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ImageFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/layout) */
export type LayoutthemeIconArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<IconFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/layout) */
export type LayoutthemeListArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/layout) */
export type LayouttitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type LayoutCollection = {
  __typename?: 'LayoutCollection';
  items: Array<Maybe<Layout>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type LayoutCursorCollection = {
  __typename?: 'LayoutCursorCollection';
  items: Array<Maybe<Layout>>;
  limit: Scalars['Int']['output'];
  pages: CursorPages;
};

export type LayoutFilter = {
  AND?: InputMaybe<Array<InputMaybe<LayoutFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<LayoutFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  defaultTheme?: InputMaybe<Scalars['String']['input']>;
  defaultTheme_contains?: InputMaybe<Scalars['String']['input']>;
  defaultTheme_exists?: InputMaybe<Scalars['Boolean']['input']>;
  defaultTheme_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  defaultTheme_not?: InputMaybe<Scalars['String']['input']>;
  defaultTheme_not_contains?: InputMaybe<Scalars['String']['input']>;
  defaultTheme_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  drawerSide?: InputMaybe<Scalars['String']['input']>;
  drawerSide_contains?: InputMaybe<Scalars['String']['input']>;
  drawerSide_exists?: InputMaybe<Scalars['Boolean']['input']>;
  drawerSide_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  drawerSide_not?: InputMaybe<Scalars['String']['input']>;
  drawerSide_not_contains?: InputMaybe<Scalars['String']['input']>;
  drawerSide_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  drawerVariant?: InputMaybe<Scalars['String']['input']>;
  drawerVariant_contains?: InputMaybe<Scalars['String']['input']>;
  drawerVariant_exists?: InputMaybe<Scalars['Boolean']['input']>;
  drawerVariant_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  drawerVariant_not?: InputMaybe<Scalars['String']['input']>;
  drawerVariant_not_contains?: InputMaybe<Scalars['String']['input']>;
  drawerVariant_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  email?: InputMaybe<Scalars['String']['input']>;
  email_contains?: InputMaybe<Scalars['String']['input']>;
  email_exists?: InputMaybe<Scalars['Boolean']['input']>;
  email_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  email_not?: InputMaybe<Scalars['String']['input']>;
  email_not_contains?: InputMaybe<Scalars['String']['input']>;
  email_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  footerText?: InputMaybe<Scalars['String']['input']>;
  footerText_contains?: InputMaybe<Scalars['String']['input']>;
  footerText_exists?: InputMaybe<Scalars['Boolean']['input']>;
  footerText_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  footerText_not?: InputMaybe<Scalars['String']['input']>;
  footerText_not_contains?: InputMaybe<Scalars['String']['input']>;
  footerText_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  globalSeo?: InputMaybe<cfSeoMetadataNestedFilter>;
  globalSeo_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  navigationLinks?: InputMaybe<cfLinkNestedFilter>;
  navigationLinksCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  resumeIcon?: InputMaybe<cfIconNestedFilter>;
  resumeIcon_exists?: InputMaybe<Scalars['Boolean']['input']>;
  resume_exists?: InputMaybe<Scalars['Boolean']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  role_contains?: InputMaybe<Scalars['String']['input']>;
  role_exists?: InputMaybe<Scalars['Boolean']['input']>;
  role_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  role_not?: InputMaybe<Scalars['String']['input']>;
  role_not_contains?: InputMaybe<Scalars['String']['input']>;
  role_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  siteLogo?: InputMaybe<cfImageNestedFilter>;
  siteLogo_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
  themeIcon?: InputMaybe<cfIconNestedFilter>;
  themeIcon_exists?: InputMaybe<Scalars['Boolean']['input']>;
  themeList_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  themeList_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  themeList_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  themeList_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type LayoutLinkingCollections = {
  __typename?: 'LayoutLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  entryCursorCollection?: Maybe<EntryCursorCollection>;
};


export type LayoutLinkingCollectionsentryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type LayoutLinkingCollectionsentryCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type LayoutNavigationLinksCollection = {
  __typename?: 'LayoutNavigationLinksCollection';
  items: Array<Maybe<Link>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum LayoutNavigationLinksCollectionOrder {
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  text_ASC = 'text_ASC',
  text_DESC = 'text_DESC',
  url_ASC = 'url_ASC',
  url_DESC = 'url_DESC'
}

export type LayoutNavigationLinksCursorCollection = {
  __typename?: 'LayoutNavigationLinksCursorCollection';
  items: Array<Maybe<Link>>;
  limit: Scalars['Int']['output'];
  pages: CursorPages;
};

export enum LayoutNavigationLinksCursorCollectionOrder {
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  text_ASC = 'text_ASC',
  text_DESC = 'text_DESC',
  url_ASC = 'url_ASC',
  url_DESC = 'url_DESC'
}

export enum LayoutOrder {
  defaultTheme_ASC = 'defaultTheme_ASC',
  defaultTheme_DESC = 'defaultTheme_DESC',
  drawerSide_ASC = 'drawerSide_ASC',
  drawerSide_DESC = 'drawerSide_DESC',
  drawerVariant_ASC = 'drawerVariant_ASC',
  drawerVariant_DESC = 'drawerVariant_DESC',
  email_ASC = 'email_ASC',
  email_DESC = 'email_DESC',
  footerText_ASC = 'footerText_ASC',
  footerText_DESC = 'footerText_DESC',
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  role_ASC = 'role_ASC',
  role_DESC = 'role_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/link) */
export type Link = Entry & _Node & {
  __typename?: 'Link';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  icon?: Maybe<Icon>;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<LinkLinkingCollections>;
  page?: Maybe<Page>;
  sys: Sys;
  text?: Maybe<Scalars['String']['output']>;
  url?: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/link) */
export type LinkiconArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<IconFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/link) */
export type LinkinternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/link) */
export type LinklinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/link) */
export type LinkpageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PageFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/link) */
export type LinktextArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/link) */
export type LinkurlArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type LinkCollection = {
  __typename?: 'LinkCollection';
  items: Array<Maybe<Link>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type LinkCursorCollection = {
  __typename?: 'LinkCursorCollection';
  items: Array<Maybe<Link>>;
  limit: Scalars['Int']['output'];
  pages: CursorPages;
};

export type LinkFilter = {
  AND?: InputMaybe<Array<InputMaybe<LinkFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<LinkFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  icon?: InputMaybe<cfIconNestedFilter>;
  icon_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  page?: InputMaybe<cfPageNestedFilter>;
  page_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
  text?: InputMaybe<Scalars['String']['input']>;
  text_contains?: InputMaybe<Scalars['String']['input']>;
  text_exists?: InputMaybe<Scalars['Boolean']['input']>;
  text_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  text_not?: InputMaybe<Scalars['String']['input']>;
  text_not_contains?: InputMaybe<Scalars['String']['input']>;
  text_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url?: InputMaybe<Scalars['String']['input']>;
  url_contains?: InputMaybe<Scalars['String']['input']>;
  url_exists?: InputMaybe<Scalars['Boolean']['input']>;
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url_not?: InputMaybe<Scalars['String']['input']>;
  url_not_contains?: InputMaybe<Scalars['String']['input']>;
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type LinkLinkingCollections = {
  __typename?: 'LinkLinkingCollections';
  contentItemCollection?: Maybe<ContentItemCollection>;
  contentItemCursorCollection?: Maybe<ContentItemCursorCollection>;
  entryCollection?: Maybe<EntryCollection>;
  entryCursorCollection?: Maybe<EntryCursorCollection>;
  layoutCollection?: Maybe<LayoutCollection>;
  layoutCursorCollection?: Maybe<LayoutCursorCollection>;
};


export type LinkLinkingCollectionscontentItemCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<LinkLinkingCollectionsContentItemCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type LinkLinkingCollectionscontentItemCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<LinkLinkingCollectionsContentItemCursorCollectionOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type LinkLinkingCollectionsentryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type LinkLinkingCollectionsentryCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type LinkLinkingCollectionslayoutCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<LinkLinkingCollectionsLayoutCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type LinkLinkingCollectionslayoutCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<LinkLinkingCollectionsLayoutCursorCollectionOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum LinkLinkingCollectionsContentItemCollectionOrder {
  endDate_ASC = 'endDate_ASC',
  endDate_DESC = 'endDate_DESC',
  entryField_ASC = 'entryField_ASC',
  entryField_DESC = 'entryField_DESC',
  progress_ASC = 'progress_ASC',
  progress_DESC = 'progress_DESC',
  startDate_ASC = 'startDate_ASC',
  startDate_DESC = 'startDate_DESC',
  subtitle_ASC = 'subtitle_ASC',
  subtitle_DESC = 'subtitle_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export enum LinkLinkingCollectionsContentItemCursorCollectionOrder {
  endDate_ASC = 'endDate_ASC',
  endDate_DESC = 'endDate_DESC',
  entryField_ASC = 'entryField_ASC',
  entryField_DESC = 'entryField_DESC',
  progress_ASC = 'progress_ASC',
  progress_DESC = 'progress_DESC',
  startDate_ASC = 'startDate_ASC',
  startDate_DESC = 'startDate_DESC',
  subtitle_ASC = 'subtitle_ASC',
  subtitle_DESC = 'subtitle_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export enum LinkLinkingCollectionsLayoutCollectionOrder {
  defaultTheme_ASC = 'defaultTheme_ASC',
  defaultTheme_DESC = 'defaultTheme_DESC',
  drawerSide_ASC = 'drawerSide_ASC',
  drawerSide_DESC = 'drawerSide_DESC',
  drawerVariant_ASC = 'drawerVariant_ASC',
  drawerVariant_DESC = 'drawerVariant_DESC',
  email_ASC = 'email_ASC',
  email_DESC = 'email_DESC',
  footerText_ASC = 'footerText_ASC',
  footerText_DESC = 'footerText_DESC',
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  role_ASC = 'role_ASC',
  role_DESC = 'role_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export enum LinkLinkingCollectionsLayoutCursorCollectionOrder {
  defaultTheme_ASC = 'defaultTheme_ASC',
  defaultTheme_DESC = 'defaultTheme_DESC',
  drawerSide_ASC = 'drawerSide_ASC',
  drawerSide_DESC = 'drawerSide_DESC',
  drawerVariant_ASC = 'drawerVariant_ASC',
  drawerVariant_DESC = 'drawerVariant_DESC',
  email_ASC = 'email_ASC',
  email_DESC = 'email_DESC',
  footerText_ASC = 'footerText_ASC',
  footerText_DESC = 'footerText_DESC',
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  role_ASC = 'role_ASC',
  role_DESC = 'role_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export enum LinkOrder {
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  text_ASC = 'text_ASC',
  text_DESC = 'text_DESC',
  url_ASC = 'url_ASC',
  url_DESC = 'url_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/page) */
export type Page = Entry & _Node & {
  __typename?: 'Page';
  _id: Scalars['ID']['output'];
  bottomContentAreaCollection?: Maybe<PageBottomContentAreaCollection>;
  bottomContentAreaCursorCollection?: Maybe<PageBottomContentAreaCursorCollection>;
  contentfulMetadata: ContentfulMetadata;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<PageLinkingCollections>;
  path?: Maybe<Scalars['String']['output']>;
  seo?: Maybe<SeoMetadata>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
  topContentAreaCollection?: Maybe<PageTopContentAreaCollection>;
  topContentAreaCursorCollection?: Maybe<PageTopContentAreaCursorCollection>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/page) */
export type PagebottomContentAreaCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PageBottomContentAreaFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/page) */
export type PagebottomContentAreaCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PageBottomContentAreaFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/page) */
export type PageinternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/page) */
export type PagelinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/page) */
export type PagepathArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/page) */
export type PageseoArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<SeoMetadataFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/page) */
export type PagetitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/page) */
export type PagetopContentAreaCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PageTopContentAreaFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/page) */
export type PagetopContentAreaCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PageTopContentAreaFilter>;
};

export type PageBottomContentAreaCollection = {
  __typename?: 'PageBottomContentAreaCollection';
  items: Array<Maybe<PageBottomContentAreaItem>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PageBottomContentAreaCursorCollection = {
  __typename?: 'PageBottomContentAreaCursorCollection';
  items: Array<Maybe<PageBottomContentAreaItem>>;
  limit: Scalars['Int']['output'];
  pages: CursorPages;
};

export type PageBottomContentAreaFilter = {
  AND?: InputMaybe<Array<InputMaybe<PageBottomContentAreaFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PageBottomContentAreaFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  ui?: InputMaybe<Scalars['String']['input']>;
  ui_contains?: InputMaybe<Scalars['String']['input']>;
  ui_exists?: InputMaybe<Scalars['Boolean']['input']>;
  ui_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ui_not?: InputMaybe<Scalars['String']['input']>;
  ui_not_contains?: InputMaybe<Scalars['String']['input']>;
  ui_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PageBottomContentAreaItem = ContentList | ContentSection;

export type PageCollection = {
  __typename?: 'PageCollection';
  items: Array<Maybe<Page>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PageCursorCollection = {
  __typename?: 'PageCursorCollection';
  items: Array<Maybe<Page>>;
  limit: Scalars['Int']['output'];
  pages: CursorPages;
};

export type PageFilter = {
  AND?: InputMaybe<Array<InputMaybe<PageFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PageFilter>>>;
  bottomContentArea?: InputMaybe<cfbottomContentAreaMultiTypeNestedFilter>;
  bottomContentAreaCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  path?: InputMaybe<Scalars['String']['input']>;
  path_contains?: InputMaybe<Scalars['String']['input']>;
  path_exists?: InputMaybe<Scalars['Boolean']['input']>;
  path_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  path_not?: InputMaybe<Scalars['String']['input']>;
  path_not_contains?: InputMaybe<Scalars['String']['input']>;
  path_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  seo?: InputMaybe<cfSeoMetadataNestedFilter>;
  seo_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  topContentArea?: InputMaybe<cftopContentAreaMultiTypeNestedFilter>;
  topContentAreaCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
};

export type PageLinkingCollections = {
  __typename?: 'PageLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  entryCursorCollection?: Maybe<EntryCursorCollection>;
  linkCollection?: Maybe<LinkCollection>;
  linkCursorCollection?: Maybe<LinkCursorCollection>;
};


export type PageLinkingCollectionsentryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type PageLinkingCollectionsentryCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type PageLinkingCollectionslinkCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<PageLinkingCollectionsLinkCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type PageLinkingCollectionslinkCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<PageLinkingCollectionsLinkCursorCollectionOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum PageLinkingCollectionsLinkCollectionOrder {
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  text_ASC = 'text_ASC',
  text_DESC = 'text_DESC',
  url_ASC = 'url_ASC',
  url_DESC = 'url_DESC'
}

export enum PageLinkingCollectionsLinkCursorCollectionOrder {
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  text_ASC = 'text_ASC',
  text_DESC = 'text_DESC',
  url_ASC = 'url_ASC',
  url_DESC = 'url_DESC'
}

export enum PageOrder {
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  path_ASC = 'path_ASC',
  path_DESC = 'path_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export type PageTopContentAreaCollection = {
  __typename?: 'PageTopContentAreaCollection';
  items: Array<Maybe<PageTopContentAreaItem>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PageTopContentAreaCursorCollection = {
  __typename?: 'PageTopContentAreaCursorCollection';
  items: Array<Maybe<PageTopContentAreaItem>>;
  limit: Scalars['Int']['output'];
  pages: CursorPages;
};

export type PageTopContentAreaFilter = {
  AND?: InputMaybe<Array<InputMaybe<PageTopContentAreaFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<PageTopContentAreaFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  ui?: InputMaybe<Scalars['String']['input']>;
  ui_contains?: InputMaybe<Scalars['String']['input']>;
  ui_exists?: InputMaybe<Scalars['Boolean']['input']>;
  ui_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ui_not?: InputMaybe<Scalars['String']['input']>;
  ui_not_contains?: InputMaybe<Scalars['String']['input']>;
  ui_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type PageTopContentAreaItem = ContentList | ContentSection;

export type Query = {
  __typename?: 'Query';
  _node?: Maybe<_Node>;
  _nodes: Array<Maybe<_Node>>;
  article?: Maybe<Article>;
  articleCollection?: Maybe<ArticleCollection>;
  articleCursorCollection?: Maybe<ArticleCursorCollection>;
  asset?: Maybe<Asset>;
  assetCollection?: Maybe<AssetCollection>;
  assetCursorCollection?: Maybe<AssetCursorCollection>;
  config?: Maybe<Config>;
  configCollection?: Maybe<ConfigCollection>;
  configCursorCollection?: Maybe<ConfigCursorCollection>;
  contentItem?: Maybe<ContentItem>;
  contentItemCollection?: Maybe<ContentItemCollection>;
  contentItemCursorCollection?: Maybe<ContentItemCursorCollection>;
  contentList?: Maybe<ContentList>;
  contentListCollection?: Maybe<ContentListCollection>;
  contentListCursorCollection?: Maybe<ContentListCursorCollection>;
  contentSection?: Maybe<ContentSection>;
  contentSectionCollection?: Maybe<ContentSectionCollection>;
  contentSectionCursorCollection?: Maybe<ContentSectionCursorCollection>;
  entryCollection?: Maybe<EntryCollection>;
  entryCursorCollection?: Maybe<EntryCursorCollection>;
  icon?: Maybe<Icon>;
  iconCollection?: Maybe<IconCollection>;
  iconCursorCollection?: Maybe<IconCursorCollection>;
  image?: Maybe<Image>;
  imageCollection?: Maybe<ImageCollection>;
  imageCursorCollection?: Maybe<ImageCursorCollection>;
  layout?: Maybe<Layout>;
  layoutCollection?: Maybe<LayoutCollection>;
  layoutCursorCollection?: Maybe<LayoutCursorCollection>;
  link?: Maybe<Link>;
  linkCollection?: Maybe<LinkCollection>;
  linkCursorCollection?: Maybe<LinkCursorCollection>;
  page?: Maybe<Page>;
  pageCollection?: Maybe<PageCollection>;
  pageCursorCollection?: Maybe<PageCursorCollection>;
  seoMetadata?: Maybe<SeoMetadata>;
  seoMetadataCollection?: Maybe<SeoMetadataCollection>;
  seoMetadataCursorCollection?: Maybe<SeoMetadataCursorCollection>;
  statItem?: Maybe<StatItem>;
  statItemCollection?: Maybe<StatItemCollection>;
  statItemCursorCollection?: Maybe<StatItemCursorCollection>;
  video?: Maybe<Video>;
  videoCollection?: Maybe<VideoCollection>;
  videoCursorCollection?: Maybe<VideoCursorCollection>;
};


export type Query_nodeArgs = {
  id: Scalars['ID']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type Query_nodesArgs = {
  ids: Array<Scalars['ID']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryarticleArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryarticleCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ArticleOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ArticleFilter>;
};


export type QueryarticleCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ArticleOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ArticleFilter>;
};


export type QueryassetArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryassetCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<AssetOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<AssetFilter>;
};


export type QueryassetCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<AssetOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<AssetFilter>;
};


export type QueryconfigArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryconfigCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ConfigOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ConfigFilter>;
};


export type QueryconfigCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ConfigOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ConfigFilter>;
};


export type QuerycontentItemArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QuerycontentItemCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ContentItemOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ContentItemFilter>;
};


export type QuerycontentItemCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ContentItemOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ContentItemFilter>;
};


export type QuerycontentListArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QuerycontentListCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ContentListOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ContentListFilter>;
};


export type QuerycontentListCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ContentListOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ContentListFilter>;
};


export type QuerycontentSectionArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QuerycontentSectionCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ContentSectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ContentSectionFilter>;
};


export type QuerycontentSectionCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ContentSectionOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ContentSectionFilter>;
};


export type QueryentryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<EntryOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<EntryFilter>;
};


export type QueryentryCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<EntryOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<EntryFilter>;
};


export type QueryiconArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryiconCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<IconOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<IconFilter>;
};


export type QueryiconCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<IconOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<IconFilter>;
};


export type QueryimageArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryimageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ImageOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ImageFilter>;
};


export type QueryimageCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<ImageOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ImageFilter>;
};


export type QuerylayoutArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QuerylayoutCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<LayoutOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<LayoutFilter>;
};


export type QuerylayoutCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<LayoutOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<LayoutFilter>;
};


export type QuerylinkArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QuerylinkCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<LinkOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<LinkFilter>;
};


export type QuerylinkCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<LinkOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<LinkFilter>;
};


export type QuerypageArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QuerypageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<PageOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PageFilter>;
};


export type QuerypageCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<PageOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<PageFilter>;
};


export type QueryseoMetadataArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryseoMetadataCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<SeoMetadataOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<SeoMetadataFilter>;
};


export type QueryseoMetadataCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<SeoMetadataOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<SeoMetadataFilter>;
};


export type QuerystatItemArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QuerystatItemCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<StatItemOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<StatItemFilter>;
};


export type QuerystatItemCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<StatItemOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<StatItemFilter>;
};


export type QueryvideoArgs = {
  id: Scalars['String']['input'];
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryvideoCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<VideoOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<VideoFilter>;
};


export type QueryvideoCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<VideoOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<VideoFilter>;
};

export type ResourceLink = {
  sys: ResourceSys;
};

export type ResourceSys = {
  __typename?: 'ResourceSys';
  linkType: Scalars['String']['output'];
  urn: Scalars['String']['output'];
};

/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/seoMetadata) */
export type SeoMetadata = Entry & _Node & {
  __typename?: 'SeoMetadata';
  _id: Scalars['ID']['output'];
  canonicalUrl?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  description?: Maybe<Scalars['String']['output']>;
  internalName?: Maybe<Scalars['String']['output']>;
  keywords?: Maybe<Array<Maybe<Scalars['String']['output']>>>;
  linkedFrom?: Maybe<SeoMetadataLinkingCollections>;
  noFollow?: Maybe<Scalars['Boolean']['output']>;
  noIndex?: Maybe<Scalars['Boolean']['output']>;
  ogImage?: Maybe<Image>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/seoMetadata) */
export type SeoMetadatacanonicalUrlArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/seoMetadata) */
export type SeoMetadatadescriptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/seoMetadata) */
export type SeoMetadatainternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/seoMetadata) */
export type SeoMetadatakeywordsArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/seoMetadata) */
export type SeoMetadatalinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/seoMetadata) */
export type SeoMetadatanoFollowArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/seoMetadata) */
export type SeoMetadatanoIndexArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/seoMetadata) */
export type SeoMetadataogImageArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<ImageFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/seoMetadata) */
export type SeoMetadatatitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type SeoMetadataCollection = {
  __typename?: 'SeoMetadataCollection';
  items: Array<Maybe<SeoMetadata>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type SeoMetadataCursorCollection = {
  __typename?: 'SeoMetadataCursorCollection';
  items: Array<Maybe<SeoMetadata>>;
  limit: Scalars['Int']['output'];
  pages: CursorPages;
};

export type SeoMetadataFilter = {
  AND?: InputMaybe<Array<InputMaybe<SeoMetadataFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<SeoMetadataFilter>>>;
  canonicalUrl?: InputMaybe<Scalars['String']['input']>;
  canonicalUrl_contains?: InputMaybe<Scalars['String']['input']>;
  canonicalUrl_exists?: InputMaybe<Scalars['Boolean']['input']>;
  canonicalUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  canonicalUrl_not?: InputMaybe<Scalars['String']['input']>;
  canonicalUrl_not_contains?: InputMaybe<Scalars['String']['input']>;
  canonicalUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  keywords_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  keywords_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  keywords_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  keywords_exists?: InputMaybe<Scalars['Boolean']['input']>;
  noFollow?: InputMaybe<Scalars['Boolean']['input']>;
  noFollow_exists?: InputMaybe<Scalars['Boolean']['input']>;
  noFollow_not?: InputMaybe<Scalars['Boolean']['input']>;
  noIndex?: InputMaybe<Scalars['Boolean']['input']>;
  noIndex_exists?: InputMaybe<Scalars['Boolean']['input']>;
  noIndex_not?: InputMaybe<Scalars['Boolean']['input']>;
  ogImage?: InputMaybe<cfImageNestedFilter>;
  ogImage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type SeoMetadataLinkingCollections = {
  __typename?: 'SeoMetadataLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  entryCursorCollection?: Maybe<EntryCursorCollection>;
  layoutCollection?: Maybe<LayoutCollection>;
  layoutCursorCollection?: Maybe<LayoutCursorCollection>;
  pageCollection?: Maybe<PageCollection>;
  pageCursorCollection?: Maybe<PageCursorCollection>;
};


export type SeoMetadataLinkingCollectionsentryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SeoMetadataLinkingCollectionsentryCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SeoMetadataLinkingCollectionslayoutCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<SeoMetadataLinkingCollectionsLayoutCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SeoMetadataLinkingCollectionslayoutCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<SeoMetadataLinkingCollectionsLayoutCursorCollectionOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SeoMetadataLinkingCollectionspageCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<SeoMetadataLinkingCollectionsPageCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type SeoMetadataLinkingCollectionspageCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<SeoMetadataLinkingCollectionsPageCursorCollectionOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum SeoMetadataLinkingCollectionsLayoutCollectionOrder {
  defaultTheme_ASC = 'defaultTheme_ASC',
  defaultTheme_DESC = 'defaultTheme_DESC',
  drawerSide_ASC = 'drawerSide_ASC',
  drawerSide_DESC = 'drawerSide_DESC',
  drawerVariant_ASC = 'drawerVariant_ASC',
  drawerVariant_DESC = 'drawerVariant_DESC',
  email_ASC = 'email_ASC',
  email_DESC = 'email_DESC',
  footerText_ASC = 'footerText_ASC',
  footerText_DESC = 'footerText_DESC',
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  role_ASC = 'role_ASC',
  role_DESC = 'role_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export enum SeoMetadataLinkingCollectionsLayoutCursorCollectionOrder {
  defaultTheme_ASC = 'defaultTheme_ASC',
  defaultTheme_DESC = 'defaultTheme_DESC',
  drawerSide_ASC = 'drawerSide_ASC',
  drawerSide_DESC = 'drawerSide_DESC',
  drawerVariant_ASC = 'drawerVariant_ASC',
  drawerVariant_DESC = 'drawerVariant_DESC',
  email_ASC = 'email_ASC',
  email_DESC = 'email_DESC',
  footerText_ASC = 'footerText_ASC',
  footerText_DESC = 'footerText_DESC',
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  role_ASC = 'role_ASC',
  role_DESC = 'role_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export enum SeoMetadataLinkingCollectionsPageCollectionOrder {
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  path_ASC = 'path_ASC',
  path_DESC = 'path_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export enum SeoMetadataLinkingCollectionsPageCursorCollectionOrder {
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  path_ASC = 'path_ASC',
  path_DESC = 'path_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export enum SeoMetadataOrder {
  canonicalUrl_ASC = 'canonicalUrl_ASC',
  canonicalUrl_DESC = 'canonicalUrl_DESC',
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  noFollow_ASC = 'noFollow_ASC',
  noFollow_DESC = 'noFollow_DESC',
  noIndex_ASC = 'noIndex_ASC',
  noIndex_DESC = 'noIndex_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/statItem) */
export type StatItem = Entry & _Node & {
  __typename?: 'StatItem';
  _id: Scalars['ID']['output'];
  contentfulMetadata: ContentfulMetadata;
  iconsCollection?: Maybe<StatItemIconsCollection>;
  iconsCursorCollection?: Maybe<StatItemIconsCursorCollection>;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<StatItemLinkingCollections>;
  progress?: Maybe<Scalars['Int']['output']>;
  sys: Sys;
  title?: Maybe<Scalars['String']['output']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/statItem) */
export type StatItemiconsCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<StatItemIconsCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<IconFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/statItem) */
export type StatItemiconsCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<StatItemIconsCursorCollectionOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
  where?: InputMaybe<IconFilter>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/statItem) */
export type StatIteminternalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/statItem) */
export type StatItemlinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/statItem) */
export type StatItemprogressArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/statItem) */
export type StatItemtitleArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type StatItemCollection = {
  __typename?: 'StatItemCollection';
  items: Array<Maybe<StatItem>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type StatItemCursorCollection = {
  __typename?: 'StatItemCursorCollection';
  items: Array<Maybe<StatItem>>;
  limit: Scalars['Int']['output'];
  pages: CursorPages;
};

export type StatItemFilter = {
  AND?: InputMaybe<Array<InputMaybe<StatItemFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<StatItemFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  icons?: InputMaybe<cfIconNestedFilter>;
  iconsCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  progress?: InputMaybe<Scalars['Int']['input']>;
  progress_exists?: InputMaybe<Scalars['Boolean']['input']>;
  progress_gt?: InputMaybe<Scalars['Int']['input']>;
  progress_gte?: InputMaybe<Scalars['Int']['input']>;
  progress_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  progress_lt?: InputMaybe<Scalars['Int']['input']>;
  progress_lte?: InputMaybe<Scalars['Int']['input']>;
  progress_not?: InputMaybe<Scalars['Int']['input']>;
  progress_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type StatItemIconsCollection = {
  __typename?: 'StatItemIconsCollection';
  items: Array<Maybe<Icon>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export enum StatItemIconsCollectionOrder {
  color_ASC = 'color_ASC',
  color_DESC = 'color_DESC',
  iconCode_ASC = 'iconCode_ASC',
  iconCode_DESC = 'iconCode_DESC',
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  library_ASC = 'library_ASC',
  library_DESC = 'library_DESC',
  name_ASC = 'name_ASC',
  name_DESC = 'name_DESC',
  showTooltip_ASC = 'showTooltip_ASC',
  showTooltip_DESC = 'showTooltip_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export type StatItemIconsCursorCollection = {
  __typename?: 'StatItemIconsCursorCollection';
  items: Array<Maybe<Icon>>;
  limit: Scalars['Int']['output'];
  pages: CursorPages;
};

export enum StatItemIconsCursorCollectionOrder {
  color_ASC = 'color_ASC',
  color_DESC = 'color_DESC',
  iconCode_ASC = 'iconCode_ASC',
  iconCode_DESC = 'iconCode_DESC',
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  library_ASC = 'library_ASC',
  library_DESC = 'library_DESC',
  name_ASC = 'name_ASC',
  name_DESC = 'name_DESC',
  showTooltip_ASC = 'showTooltip_ASC',
  showTooltip_DESC = 'showTooltip_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export type StatItemLinkingCollections = {
  __typename?: 'StatItemLinkingCollections';
  contentItemCollection?: Maybe<ContentItemCollection>;
  contentItemCursorCollection?: Maybe<ContentItemCursorCollection>;
  contentSectionCollection?: Maybe<ContentSectionCollection>;
  contentSectionCursorCollection?: Maybe<ContentSectionCursorCollection>;
  entryCollection?: Maybe<EntryCollection>;
  entryCursorCollection?: Maybe<EntryCursorCollection>;
};


export type StatItemLinkingCollectionscontentItemCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<StatItemLinkingCollectionsContentItemCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type StatItemLinkingCollectionscontentItemCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<StatItemLinkingCollectionsContentItemCursorCollectionOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type StatItemLinkingCollectionscontentSectionCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<StatItemLinkingCollectionsContentSectionCollectionOrder>>>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type StatItemLinkingCollectionscontentSectionCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  order?: InputMaybe<Array<InputMaybe<StatItemLinkingCollectionsContentSectionCursorCollectionOrder>>>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type StatItemLinkingCollectionsentryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type StatItemLinkingCollectionsentryCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum StatItemLinkingCollectionsContentItemCollectionOrder {
  endDate_ASC = 'endDate_ASC',
  endDate_DESC = 'endDate_DESC',
  entryField_ASC = 'entryField_ASC',
  entryField_DESC = 'entryField_DESC',
  progress_ASC = 'progress_ASC',
  progress_DESC = 'progress_DESC',
  startDate_ASC = 'startDate_ASC',
  startDate_DESC = 'startDate_DESC',
  subtitle_ASC = 'subtitle_ASC',
  subtitle_DESC = 'subtitle_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export enum StatItemLinkingCollectionsContentItemCursorCollectionOrder {
  endDate_ASC = 'endDate_ASC',
  endDate_DESC = 'endDate_DESC',
  entryField_ASC = 'entryField_ASC',
  entryField_DESC = 'entryField_DESC',
  progress_ASC = 'progress_ASC',
  progress_DESC = 'progress_DESC',
  startDate_ASC = 'startDate_ASC',
  startDate_DESC = 'startDate_DESC',
  subtitle_ASC = 'subtitle_ASC',
  subtitle_DESC = 'subtitle_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export enum StatItemLinkingCollectionsContentSectionCollectionOrder {
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  ui_ASC = 'ui_ASC',
  ui_DESC = 'ui_DESC'
}

export enum StatItemLinkingCollectionsContentSectionCursorCollectionOrder {
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  ui_ASC = 'ui_ASC',
  ui_DESC = 'ui_DESC'
}

export enum StatItemOrder {
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  progress_ASC = 'progress_ASC',
  progress_DESC = 'progress_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC',
  title_ASC = 'title_ASC',
  title_DESC = 'title_DESC'
}

export type Sys = {
  __typename?: 'Sys';
  environmentId: Scalars['String']['output'];
  firstPublishedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['String']['output'];
  /** The locale that was requested. */
  locale?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTime']['output']>;
  publishedVersion?: Maybe<Scalars['Int']['output']>;
  spaceId: Scalars['String']['output'];
};

export type SysFilter = {
  firstPublishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_exists?: InputMaybe<Scalars['Boolean']['input']>;
  firstPublishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  firstPublishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  firstPublishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  id?: InputMaybe<Scalars['String']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_exists?: InputMaybe<Scalars['Boolean']['input']>;
  id_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  id_not?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_exists?: InputMaybe<Scalars['Boolean']['input']>;
  publishedAt_gt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_gte?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedAt_lt?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_lte?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_not?: InputMaybe<Scalars['DateTime']['input']>;
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  publishedVersion?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_exists?: InputMaybe<Scalars['Boolean']['input']>;
  publishedVersion_gt?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_gte?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
  publishedVersion_lt?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_lte?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_not?: InputMaybe<Scalars['Float']['input']>;
  publishedVersion_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']['input']>>>;
};

/**
 * Represents a taxonomy concept entity for finding and organizing content easily.
 *         Find out more here: https://www.contentful.com/developers/docs/references/content-delivery-api/#/reference/content-concepts
 */
export type TaxonomyConcept = {
  __typename?: 'TaxonomyConcept';
  id?: Maybe<Scalars['String']['output']>;
};

export type TimelineFilterInput = {
  /** Preview content starting from a given release date */
  release_lte?: InputMaybe<Scalars['String']['input']>;
  /** Preview content starting from a given timestamp */
  timestamp_lte?: InputMaybe<Scalars['DateTime']['input']>;
};

/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/video) */
export type Video = Entry & _Node & {
  __typename?: 'Video';
  _id: Scalars['ID']['output'];
  caption?: Maybe<Scalars['String']['output']>;
  contentfulMetadata: ContentfulMetadata;
  internalName?: Maybe<Scalars['String']['output']>;
  linkedFrom?: Maybe<VideoLinkingCollections>;
  sys: Sys;
  video?: Maybe<Asset>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/video) */
export type VideocaptionArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/video) */
export type VideointernalNameArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/video) */
export type VideolinkedFromArgs = {
  allowedLocales?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};


/** [See type definition](https://app.contentful.com/spaces/llac041ddp2o/content_types/video) */
export type VideovideoArgs = {
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export type VideoCollection = {
  __typename?: 'VideoCollection';
  items: Array<Maybe<Video>>;
  limit: Scalars['Int']['output'];
  skip: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type VideoCursorCollection = {
  __typename?: 'VideoCursorCollection';
  items: Array<Maybe<Video>>;
  limit: Scalars['Int']['output'];
  pages: CursorPages;
};

export type VideoFilter = {
  AND?: InputMaybe<Array<InputMaybe<VideoFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<VideoFilter>>>;
  caption?: InputMaybe<Scalars['String']['input']>;
  caption_contains?: InputMaybe<Scalars['String']['input']>;
  caption_exists?: InputMaybe<Scalars['Boolean']['input']>;
  caption_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  caption_not?: InputMaybe<Scalars['String']['input']>;
  caption_not_contains?: InputMaybe<Scalars['String']['input']>;
  caption_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  video_exists?: InputMaybe<Scalars['Boolean']['input']>;
};

export type VideoLinkingCollections = {
  __typename?: 'VideoLinkingCollections';
  entryCollection?: Maybe<EntryCollection>;
  entryCursorCollection?: Maybe<EntryCursorCollection>;
};


export type VideoLinkingCollectionsentryCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};


export type VideoLinkingCollectionsentryCursorCollectionArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<Scalars['String']['input']>;
  pageNext?: InputMaybe<Scalars['String']['input']>;
  pagePrev?: InputMaybe<Scalars['String']['input']>;
  preview?: InputMaybe<Scalars['Boolean']['input']>;
  useFallbackLocale?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum VideoOrder {
  caption_ASC = 'caption_ASC',
  caption_DESC = 'caption_DESC',
  internalName_ASC = 'internalName_ASC',
  internalName_DESC = 'internalName_DESC',
  sys_firstPublishedAt_ASC = 'sys_firstPublishedAt_ASC',
  sys_firstPublishedAt_DESC = 'sys_firstPublishedAt_DESC',
  sys_id_ASC = 'sys_id_ASC',
  sys_id_DESC = 'sys_id_DESC',
  sys_publishedAt_ASC = 'sys_publishedAt_ASC',
  sys_publishedAt_DESC = 'sys_publishedAt_DESC',
  sys_publishedVersion_ASC = 'sys_publishedVersion_ASC',
  sys_publishedVersion_DESC = 'sys_publishedVersion_DESC'
}

export type _Node = {
  _id: Scalars['ID']['output'];
};

export type cfContentItemNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<cfContentItemNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<cfContentItemNestedFilter>>>;
  body_contains?: InputMaybe<Scalars['String']['input']>;
  body_exists?: InputMaybe<Scalars['Boolean']['input']>;
  body_not_contains?: InputMaybe<Scalars['String']['input']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  endDate_exists?: InputMaybe<Scalars['Boolean']['input']>;
  endDate_gt?: InputMaybe<Scalars['DateTime']['input']>;
  endDate_gte?: InputMaybe<Scalars['DateTime']['input']>;
  endDate_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  endDate_lt?: InputMaybe<Scalars['DateTime']['input']>;
  endDate_lte?: InputMaybe<Scalars['DateTime']['input']>;
  endDate_not?: InputMaybe<Scalars['DateTime']['input']>;
  endDate_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  entryField?: InputMaybe<Scalars['String']['input']>;
  entryField_contains?: InputMaybe<Scalars['String']['input']>;
  entryField_exists?: InputMaybe<Scalars['Boolean']['input']>;
  entryField_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  entryField_not?: InputMaybe<Scalars['String']['input']>;
  entryField_not_contains?: InputMaybe<Scalars['String']['input']>;
  entryField_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  icon_exists?: InputMaybe<Scalars['Boolean']['input']>;
  image_exists?: InputMaybe<Scalars['Boolean']['input']>;
  linksCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  progress?: InputMaybe<Scalars['Int']['input']>;
  progress_exists?: InputMaybe<Scalars['Boolean']['input']>;
  progress_gt?: InputMaybe<Scalars['Int']['input']>;
  progress_gte?: InputMaybe<Scalars['Int']['input']>;
  progress_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  progress_lt?: InputMaybe<Scalars['Int']['input']>;
  progress_lte?: InputMaybe<Scalars['Int']['input']>;
  progress_not?: InputMaybe<Scalars['Int']['input']>;
  progress_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
  startDate_exists?: InputMaybe<Scalars['Boolean']['input']>;
  startDate_gt?: InputMaybe<Scalars['DateTime']['input']>;
  startDate_gte?: InputMaybe<Scalars['DateTime']['input']>;
  startDate_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  startDate_lt?: InputMaybe<Scalars['DateTime']['input']>;
  startDate_lte?: InputMaybe<Scalars['DateTime']['input']>;
  startDate_not?: InputMaybe<Scalars['DateTime']['input']>;
  startDate_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']['input']>>>;
  subItemsCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  subtitle?: InputMaybe<Scalars['String']['input']>;
  subtitle_contains?: InputMaybe<Scalars['String']['input']>;
  subtitle_exists?: InputMaybe<Scalars['Boolean']['input']>;
  subtitle_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  subtitle_not?: InputMaybe<Scalars['String']['input']>;
  subtitle_not_contains?: InputMaybe<Scalars['String']['input']>;
  subtitle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  tags_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tags_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tags_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  tags_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type cfIconNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<cfIconNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<cfIconNestedFilter>>>;
  color?: InputMaybe<Scalars['String']['input']>;
  color_contains?: InputMaybe<Scalars['String']['input']>;
  color_exists?: InputMaybe<Scalars['Boolean']['input']>;
  color_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  color_not?: InputMaybe<Scalars['String']['input']>;
  color_not_contains?: InputMaybe<Scalars['String']['input']>;
  color_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  iconCode?: InputMaybe<Scalars['String']['input']>;
  iconCode_contains?: InputMaybe<Scalars['String']['input']>;
  iconCode_exists?: InputMaybe<Scalars['Boolean']['input']>;
  iconCode_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  iconCode_not?: InputMaybe<Scalars['String']['input']>;
  iconCode_not_contains?: InputMaybe<Scalars['String']['input']>;
  iconCode_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  library?: InputMaybe<Scalars['String']['input']>;
  library_contains?: InputMaybe<Scalars['String']['input']>;
  library_exists?: InputMaybe<Scalars['Boolean']['input']>;
  library_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  library_not?: InputMaybe<Scalars['String']['input']>;
  library_not_contains?: InputMaybe<Scalars['String']['input']>;
  library_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_exists?: InputMaybe<Scalars['Boolean']['input']>;
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  name_not?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  showTooltip?: InputMaybe<Scalars['Boolean']['input']>;
  showTooltip_exists?: InputMaybe<Scalars['Boolean']['input']>;
  showTooltip_not?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type cfImageNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<cfImageNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<cfImageNestedFilter>>>;
  alternativeText?: InputMaybe<Scalars['String']['input']>;
  alternativeText_contains?: InputMaybe<Scalars['String']['input']>;
  alternativeText_exists?: InputMaybe<Scalars['Boolean']['input']>;
  alternativeText_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  alternativeText_not?: InputMaybe<Scalars['String']['input']>;
  alternativeText_not_contains?: InputMaybe<Scalars['String']['input']>;
  alternativeText_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  caption?: InputMaybe<Scalars['String']['input']>;
  caption_contains?: InputMaybe<Scalars['String']['input']>;
  caption_exists?: InputMaybe<Scalars['Boolean']['input']>;
  caption_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  caption_not?: InputMaybe<Scalars['String']['input']>;
  caption_not_contains?: InputMaybe<Scalars['String']['input']>;
  caption_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  image_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
};

export type cfLinkNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<cfLinkNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<cfLinkNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  icon_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  page_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
  text?: InputMaybe<Scalars['String']['input']>;
  text_contains?: InputMaybe<Scalars['String']['input']>;
  text_exists?: InputMaybe<Scalars['Boolean']['input']>;
  text_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  text_not?: InputMaybe<Scalars['String']['input']>;
  text_not_contains?: InputMaybe<Scalars['String']['input']>;
  text_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url?: InputMaybe<Scalars['String']['input']>;
  url_contains?: InputMaybe<Scalars['String']['input']>;
  url_exists?: InputMaybe<Scalars['Boolean']['input']>;
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  url_not?: InputMaybe<Scalars['String']['input']>;
  url_not_contains?: InputMaybe<Scalars['String']['input']>;
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type cfPageNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<cfPageNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<cfPageNestedFilter>>>;
  bottomContentAreaCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  path?: InputMaybe<Scalars['String']['input']>;
  path_contains?: InputMaybe<Scalars['String']['input']>;
  path_exists?: InputMaybe<Scalars['Boolean']['input']>;
  path_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  path_not?: InputMaybe<Scalars['String']['input']>;
  path_not_contains?: InputMaybe<Scalars['String']['input']>;
  path_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  seo_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  topContentAreaCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
};

export type cfSeoMetadataNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<cfSeoMetadataNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<cfSeoMetadataNestedFilter>>>;
  canonicalUrl?: InputMaybe<Scalars['String']['input']>;
  canonicalUrl_contains?: InputMaybe<Scalars['String']['input']>;
  canonicalUrl_exists?: InputMaybe<Scalars['Boolean']['input']>;
  canonicalUrl_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  canonicalUrl_not?: InputMaybe<Scalars['String']['input']>;
  canonicalUrl_not_contains?: InputMaybe<Scalars['String']['input']>;
  canonicalUrl_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  description?: InputMaybe<Scalars['String']['input']>;
  description_contains?: InputMaybe<Scalars['String']['input']>;
  description_exists?: InputMaybe<Scalars['Boolean']['input']>;
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  description_not?: InputMaybe<Scalars['String']['input']>;
  description_not_contains?: InputMaybe<Scalars['String']['input']>;
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  keywords_contains_all?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  keywords_contains_none?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  keywords_contains_some?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  keywords_exists?: InputMaybe<Scalars['Boolean']['input']>;
  noFollow?: InputMaybe<Scalars['Boolean']['input']>;
  noFollow_exists?: InputMaybe<Scalars['Boolean']['input']>;
  noFollow_not?: InputMaybe<Scalars['Boolean']['input']>;
  noIndex?: InputMaybe<Scalars['Boolean']['input']>;
  noIndex_exists?: InputMaybe<Scalars['Boolean']['input']>;
  noIndex_not?: InputMaybe<Scalars['Boolean']['input']>;
  ogImage_exists?: InputMaybe<Scalars['Boolean']['input']>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type cfStatItemNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<cfStatItemNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<cfStatItemNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  iconsCollection_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  progress?: InputMaybe<Scalars['Int']['input']>;
  progress_exists?: InputMaybe<Scalars['Boolean']['input']>;
  progress_gt?: InputMaybe<Scalars['Int']['input']>;
  progress_gte?: InputMaybe<Scalars['Int']['input']>;
  progress_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  progress_lt?: InputMaybe<Scalars['Int']['input']>;
  progress_lte?: InputMaybe<Scalars['Int']['input']>;
  progress_not?: InputMaybe<Scalars['Int']['input']>;
  progress_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  title?: InputMaybe<Scalars['String']['input']>;
  title_contains?: InputMaybe<Scalars['String']['input']>;
  title_exists?: InputMaybe<Scalars['Boolean']['input']>;
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  title_not?: InputMaybe<Scalars['String']['input']>;
  title_not_contains?: InputMaybe<Scalars['String']['input']>;
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type cfbottomContentAreaMultiTypeNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<cfbottomContentAreaMultiTypeNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<cfbottomContentAreaMultiTypeNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  ui?: InputMaybe<Scalars['String']['input']>;
  ui_contains?: InputMaybe<Scalars['String']['input']>;
  ui_exists?: InputMaybe<Scalars['Boolean']['input']>;
  ui_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ui_not?: InputMaybe<Scalars['String']['input']>;
  ui_not_contains?: InputMaybe<Scalars['String']['input']>;
  ui_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type cftopContentAreaMultiTypeNestedFilter = {
  AND?: InputMaybe<Array<InputMaybe<cftopContentAreaMultiTypeNestedFilter>>>;
  OR?: InputMaybe<Array<InputMaybe<cftopContentAreaMultiTypeNestedFilter>>>;
  contentfulMetadata?: InputMaybe<ContentfulMetadataFilter>;
  internalName?: InputMaybe<Scalars['String']['input']>;
  internalName_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_exists?: InputMaybe<Scalars['Boolean']['input']>;
  internalName_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  internalName_not?: InputMaybe<Scalars['String']['input']>;
  internalName_not_contains?: InputMaybe<Scalars['String']['input']>;
  internalName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  sys?: InputMaybe<SysFilter>;
  ui?: InputMaybe<Scalars['String']['input']>;
  ui_contains?: InputMaybe<Scalars['String']['input']>;
  ui_exists?: InputMaybe<Scalars['Boolean']['input']>;
  ui_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
  ui_not?: InputMaybe<Scalars['String']['input']>;
  ui_not_contains?: InputMaybe<Scalars['String']['input']>;
  ui_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']['input']>>>;
};

export type LayoutFieldsFragment = { __typename: 'Layout', internalName: string | null, title: string | null, role: string | null, defaultTheme: string | null, themeList: Array<string | null> | null, email: string | null, footerText: string | null, drawerVariant: string | null, drawerSide: string | null, sys: { id: string }, resume: { url: string | null, title: string | null } | null, globalSeo: { __typename: 'SeoMetadata', internalName: string | null, title: string | null, description: string | null, keywords: Array<string | null> | null, canonicalUrl: string | null, noIndex: boolean | null, noFollow: boolean | null, sys: { id: string }, ogImage: { __typename: 'Image', internalName: string | null, alternativeText: string | null, caption: string | null, sys: { id: string }, image: { url: string | null, title: string | null, description: string | null, width: number | null, height: number | null } | null } | null } | null, siteLogo: { __typename: 'Image', internalName: string | null, alternativeText: string | null, caption: string | null, sys: { id: string }, image: { url: string | null, title: string | null, description: string | null, width: number | null, height: number | null } | null } | null, resumeIcon: { __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null, themeIcon: { __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null, navigationLinksCollection: { items: Array<{ __typename: 'Link', internalName: string | null, text: string | null, url: string | null, sys: { id: string }, page: { path: string | null, sys: { id: string } } | null, icon: { __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null } | null> } | null };

export type PageFieldsFragment = { __typename: 'Page', internalName: string | null, path: string | null, title: string | null, sys: { id: string }, seo: { __typename: 'SeoMetadata', internalName: string | null, title: string | null, description: string | null, keywords: Array<string | null> | null, canonicalUrl: string | null, noIndex: boolean | null, noFollow: boolean | null, sys: { id: string }, ogImage: { __typename: 'Image', internalName: string | null, alternativeText: string | null, caption: string | null, sys: { id: string }, image: { url: string | null, title: string | null, description: string | null, width: number | null, height: number | null } | null } | null } | null, topContentAreaCollection: { items: Array<
      | { internalName: string | null, ui: string | null, title: string | null, entries: string | null, sys: { id: string }, description: { json: unknown } | null, customEntriesCollection: { items: Array<{ __typename: 'ContentItem', entryField: string | null, title: string | null, subtitle: string | null, description: string | null, startDate: unknown, endDate: unknown, tags: Array<string | null> | null, sys: { id: string }, body: { json: unknown, links: { entries: { block: Array<
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { __typename: 'Image', internalName: string | null, alternativeText: string | null, caption: string | null, sys: { id: string }, image: { url: string | null, title: string | null, description: string | null, width: number | null, height: number | null } | null }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                   | null> }, assets: { block: Array<{ url: string | null, title: string | null, description: string | null, width: number | null, height: number | null, sys: { id: string } } | null> } } } | null, image: { __typename: 'Image', internalName: string | null, alternativeText: string | null, caption: string | null, sys: { id: string }, image: { url: string | null, title: string | null, description: string | null, width: number | null, height: number | null } | null } | null, icon: { __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null, linksCollection: { items: Array<{ __typename: 'Link', internalName: string | null, text: string | null, url: string | null, sys: { id: string }, page: { path: string | null, sys: { id: string } } | null, icon: { __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null } | null> } | null, subItemsCollection: { items: Array<{ __typename: 'StatItem', internalName: string | null, title: string | null, progress: number | null, sys: { id: string }, iconsCollection: { items: Array<{ __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null> } | null } | null> } | null } | null> } | null }
      | { internalName: string | null, ui: string | null, sys: { id: string }, entry:
          | { __typename: 'ContentItem', entryField: string | null, title: string | null, subtitle: string | null, description: string | null, startDate: unknown, endDate: unknown, tags: Array<string | null> | null, sys: { id: string }, body: { json: unknown, links: { entries: { block: Array<
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { __typename: 'Image', internalName: string | null, alternativeText: string | null, caption: string | null, sys: { id: string }, image: { url: string | null, title: string | null, description: string | null, width: number | null, height: number | null } | null }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                   | null> }, assets: { block: Array<{ url: string | null, title: string | null, description: string | null, width: number | null, height: number | null, sys: { id: string } } | null> } } } | null, image: { __typename: 'Image', internalName: string | null, alternativeText: string | null, caption: string | null, sys: { id: string }, image: { url: string | null, title: string | null, description: string | null, width: number | null, height: number | null } | null } | null, icon: { __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null, linksCollection: { items: Array<{ __typename: 'Link', internalName: string | null, text: string | null, url: string | null, sys: { id: string }, page: { path: string | null, sys: { id: string } } | null, icon: { __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null } | null> } | null, subItemsCollection: { items: Array<{ __typename: 'StatItem', internalName: string | null, title: string | null, progress: number | null, sys: { id: string }, iconsCollection: { items: Array<{ __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null> } | null } | null> } | null }
          | { __typename: 'StatItem', internalName: string | null, title: string | null, progress: number | null, sys: { id: string }, iconsCollection: { items: Array<{ __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null> } | null }
         | null }
     | null> } | null, bottomContentAreaCollection: { items: Array<
      | { internalName: string | null, ui: string | null, title: string | null, entries: string | null, sys: { id: string }, description: { json: unknown } | null, customEntriesCollection: { items: Array<{ __typename: 'ContentItem', entryField: string | null, title: string | null, subtitle: string | null, description: string | null, startDate: unknown, endDate: unknown, tags: Array<string | null> | null, sys: { id: string }, body: { json: unknown, links: { entries: { block: Array<
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { __typename: 'Image', internalName: string | null, alternativeText: string | null, caption: string | null, sys: { id: string }, image: { url: string | null, title: string | null, description: string | null, width: number | null, height: number | null } | null }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                   | null> }, assets: { block: Array<{ url: string | null, title: string | null, description: string | null, width: number | null, height: number | null, sys: { id: string } } | null> } } } | null, image: { __typename: 'Image', internalName: string | null, alternativeText: string | null, caption: string | null, sys: { id: string }, image: { url: string | null, title: string | null, description: string | null, width: number | null, height: number | null } | null } | null, icon: { __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null, linksCollection: { items: Array<{ __typename: 'Link', internalName: string | null, text: string | null, url: string | null, sys: { id: string }, page: { path: string | null, sys: { id: string } } | null, icon: { __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null } | null> } | null, subItemsCollection: { items: Array<{ __typename: 'StatItem', internalName: string | null, title: string | null, progress: number | null, sys: { id: string }, iconsCollection: { items: Array<{ __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null> } | null } | null> } | null } | null> } | null }
      | { internalName: string | null, ui: string | null, sys: { id: string }, entry:
          | { __typename: 'ContentItem', entryField: string | null, title: string | null, subtitle: string | null, description: string | null, startDate: unknown, endDate: unknown, tags: Array<string | null> | null, sys: { id: string }, body: { json: unknown, links: { entries: { block: Array<
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { __typename: 'Image', internalName: string | null, alternativeText: string | null, caption: string | null, sys: { id: string }, image: { url: string | null, title: string | null, description: string | null, width: number | null, height: number | null } | null }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                    | { sys: { id: string } }
                   | null> }, assets: { block: Array<{ url: string | null, title: string | null, description: string | null, width: number | null, height: number | null, sys: { id: string } } | null> } } } | null, image: { __typename: 'Image', internalName: string | null, alternativeText: string | null, caption: string | null, sys: { id: string }, image: { url: string | null, title: string | null, description: string | null, width: number | null, height: number | null } | null } | null, icon: { __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null, linksCollection: { items: Array<{ __typename: 'Link', internalName: string | null, text: string | null, url: string | null, sys: { id: string }, page: { path: string | null, sys: { id: string } } | null, icon: { __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null } | null> } | null, subItemsCollection: { items: Array<{ __typename: 'StatItem', internalName: string | null, title: string | null, progress: number | null, sys: { id: string }, iconsCollection: { items: Array<{ __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null> } | null } | null> } | null }
          | { __typename: 'StatItem', internalName: string | null, title: string | null, progress: number | null, sys: { id: string }, iconsCollection: { items: Array<{ __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null> } | null }
         | null }
     | null> } | null };

export type ContentItemFieldsFragment = { __typename: 'ContentItem', entryField: string | null, title: string | null, subtitle: string | null, description: string | null, startDate: unknown, endDate: unknown, tags: Array<string | null> | null, sys: { id: string }, body: { json: unknown, links: { entries: { block: Array<
          | { sys: { id: string } }
          | { sys: { id: string } }
          | { sys: { id: string } }
          | { sys: { id: string } }
          | { sys: { id: string } }
          | { sys: { id: string } }
          | { __typename: 'Image', internalName: string | null, alternativeText: string | null, caption: string | null, sys: { id: string }, image: { url: string | null, title: string | null, description: string | null, width: number | null, height: number | null } | null }
          | { sys: { id: string } }
          | { sys: { id: string } }
          | { sys: { id: string } }
          | { sys: { id: string } }
          | { sys: { id: string } }
          | { sys: { id: string } }
         | null> }, assets: { block: Array<{ url: string | null, title: string | null, description: string | null, width: number | null, height: number | null, sys: { id: string } } | null> } } } | null, image: { __typename: 'Image', internalName: string | null, alternativeText: string | null, caption: string | null, sys: { id: string }, image: { url: string | null, title: string | null, description: string | null, width: number | null, height: number | null } | null } | null, icon: { __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null, linksCollection: { items: Array<{ __typename: 'Link', internalName: string | null, text: string | null, url: string | null, sys: { id: string }, page: { path: string | null, sys: { id: string } } | null, icon: { __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null } | null> } | null, subItemsCollection: { items: Array<{ __typename: 'StatItem', internalName: string | null, title: string | null, progress: number | null, sys: { id: string }, iconsCollection: { items: Array<{ __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null> } | null } | null> } | null };

export type StatItemFieldsFragment = { __typename: 'StatItem', internalName: string | null, title: string | null, progress: number | null, sys: { id: string }, iconsCollection: { items: Array<{ __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null> } | null };

export type IconFieldsFragment = { __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } };

export type ImageFieldsFragment = { __typename: 'Image', internalName: string | null, alternativeText: string | null, caption: string | null, sys: { id: string }, image: { url: string | null, title: string | null, description: string | null, width: number | null, height: number | null } | null };

export type LinkFieldsFragment = { __typename: 'Link', internalName: string | null, text: string | null, url: string | null, sys: { id: string }, page: { path: string | null, sys: { id: string } } | null, icon: { __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null };

export type SeoMetadataFieldsFragment = { __typename: 'SeoMetadata', internalName: string | null, title: string | null, description: string | null, keywords: Array<string | null> | null, canonicalUrl: string | null, noIndex: boolean | null, noFollow: boolean | null, sys: { id: string }, ogImage: { __typename: 'Image', internalName: string | null, alternativeText: string | null, caption: string | null, sys: { id: string }, image: { url: string | null, title: string | null, description: string | null, width: number | null, height: number | null } | null } | null };

export type ContentListFieldsFragment = { internalName: string | null, ui: string | null, title: string | null, entries: string | null, sys: { id: string }, description: { json: unknown } | null, customEntriesCollection: { items: Array<{ __typename: 'ContentItem', entryField: string | null, title: string | null, subtitle: string | null, description: string | null, startDate: unknown, endDate: unknown, tags: Array<string | null> | null, sys: { id: string }, body: { json: unknown, links: { entries: { block: Array<
              | { sys: { id: string } }
              | { sys: { id: string } }
              | { sys: { id: string } }
              | { sys: { id: string } }
              | { sys: { id: string } }
              | { sys: { id: string } }
              | { __typename: 'Image', internalName: string | null, alternativeText: string | null, caption: string | null, sys: { id: string }, image: { url: string | null, title: string | null, description: string | null, width: number | null, height: number | null } | null }
              | { sys: { id: string } }
              | { sys: { id: string } }
              | { sys: { id: string } }
              | { sys: { id: string } }
              | { sys: { id: string } }
              | { sys: { id: string } }
             | null> }, assets: { block: Array<{ url: string | null, title: string | null, description: string | null, width: number | null, height: number | null, sys: { id: string } } | null> } } } | null, image: { __typename: 'Image', internalName: string | null, alternativeText: string | null, caption: string | null, sys: { id: string }, image: { url: string | null, title: string | null, description: string | null, width: number | null, height: number | null } | null } | null, icon: { __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null, linksCollection: { items: Array<{ __typename: 'Link', internalName: string | null, text: string | null, url: string | null, sys: { id: string }, page: { path: string | null, sys: { id: string } } | null, icon: { __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null } | null> } | null, subItemsCollection: { items: Array<{ __typename: 'StatItem', internalName: string | null, title: string | null, progress: number | null, sys: { id: string }, iconsCollection: { items: Array<{ __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null> } | null } | null> } | null } | null> } | null };

export type ContentSectionFieldsFragment = { internalName: string | null, ui: string | null, sys: { id: string }, entry:
    | { __typename: 'ContentItem', entryField: string | null, title: string | null, subtitle: string | null, description: string | null, startDate: unknown, endDate: unknown, tags: Array<string | null> | null, sys: { id: string }, body: { json: unknown, links: { entries: { block: Array<
              | { sys: { id: string } }
              | { sys: { id: string } }
              | { sys: { id: string } }
              | { sys: { id: string } }
              | { sys: { id: string } }
              | { sys: { id: string } }
              | { __typename: 'Image', internalName: string | null, alternativeText: string | null, caption: string | null, sys: { id: string }, image: { url: string | null, title: string | null, description: string | null, width: number | null, height: number | null } | null }
              | { sys: { id: string } }
              | { sys: { id: string } }
              | { sys: { id: string } }
              | { sys: { id: string } }
              | { sys: { id: string } }
              | { sys: { id: string } }
             | null> }, assets: { block: Array<{ url: string | null, title: string | null, description: string | null, width: number | null, height: number | null, sys: { id: string } } | null> } } } | null, image: { __typename: 'Image', internalName: string | null, alternativeText: string | null, caption: string | null, sys: { id: string }, image: { url: string | null, title: string | null, description: string | null, width: number | null, height: number | null } | null } | null, icon: { __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null, linksCollection: { items: Array<{ __typename: 'Link', internalName: string | null, text: string | null, url: string | null, sys: { id: string }, page: { path: string | null, sys: { id: string } } | null, icon: { __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null } | null> } | null, subItemsCollection: { items: Array<{ __typename: 'StatItem', internalName: string | null, title: string | null, progress: number | null, sys: { id: string }, iconsCollection: { items: Array<{ __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null> } | null } | null> } | null }
    | { __typename: 'StatItem', internalName: string | null, title: string | null, progress: number | null, sys: { id: string }, iconsCollection: { items: Array<{ __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null> } | null }
   | null };

export type GetLayoutQueryVariables = Exact<{
  preview?: boolean | null | undefined;
}>;


export type GetLayoutQuery = { layoutCollection: { items: Array<{ __typename: 'Layout', internalName: string | null, title: string | null, role: string | null, defaultTheme: string | null, themeList: Array<string | null> | null, email: string | null, footerText: string | null, drawerVariant: string | null, drawerSide: string | null, sys: { id: string }, resume: { url: string | null, title: string | null } | null, globalSeo: { __typename: 'SeoMetadata', internalName: string | null, title: string | null, description: string | null, keywords: Array<string | null> | null, canonicalUrl: string | null, noIndex: boolean | null, noFollow: boolean | null, sys: { id: string }, ogImage: { __typename: 'Image', internalName: string | null, alternativeText: string | null, caption: string | null, sys: { id: string }, image: { url: string | null, title: string | null, description: string | null, width: number | null, height: number | null } | null } | null } | null, siteLogo: { __typename: 'Image', internalName: string | null, alternativeText: string | null, caption: string | null, sys: { id: string }, image: { url: string | null, title: string | null, description: string | null, width: number | null, height: number | null } | null } | null, resumeIcon: { __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null, themeIcon: { __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null, navigationLinksCollection: { items: Array<{ __typename: 'Link', internalName: string | null, text: string | null, url: string | null, sys: { id: string }, page: { path: string | null, sys: { id: string } } | null, icon: { __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null } | null> } | null } | null> } | null };

export type GetPageByPathQueryVariables = Exact<{
  path: string;
  preview?: boolean | null | undefined;
}>;


export type GetPageByPathQuery = { pageCollection: { items: Array<{ __typename: 'Page', internalName: string | null, path: string | null, title: string | null, sys: { id: string }, seo: { __typename: 'SeoMetadata', internalName: string | null, title: string | null, description: string | null, keywords: Array<string | null> | null, canonicalUrl: string | null, noIndex: boolean | null, noFollow: boolean | null, sys: { id: string }, ogImage: { __typename: 'Image', internalName: string | null, alternativeText: string | null, caption: string | null, sys: { id: string }, image: { url: string | null, title: string | null, description: string | null, width: number | null, height: number | null } | null } | null } | null, topContentAreaCollection: { items: Array<
          | { internalName: string | null, ui: string | null, title: string | null, entries: string | null, sys: { id: string }, description: { json: unknown } | null, customEntriesCollection: { items: Array<{ __typename: 'ContentItem', entryField: string | null, title: string | null, subtitle: string | null, description: string | null, startDate: unknown, endDate: unknown, tags: Array<string | null> | null, sys: { id: string }, body: { json: unknown, links: { entries: { block: Array<
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { __typename: 'Image', internalName: string | null, alternativeText: string | null, caption: string | null, sys: { id: string }, image: { url: string | null, title: string | null, description: string | null, width: number | null, height: number | null } | null }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                       | null> }, assets: { block: Array<{ url: string | null, title: string | null, description: string | null, width: number | null, height: number | null, sys: { id: string } } | null> } } } | null, image: { __typename: 'Image', internalName: string | null, alternativeText: string | null, caption: string | null, sys: { id: string }, image: { url: string | null, title: string | null, description: string | null, width: number | null, height: number | null } | null } | null, icon: { __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null, linksCollection: { items: Array<{ __typename: 'Link', internalName: string | null, text: string | null, url: string | null, sys: { id: string }, page: { path: string | null, sys: { id: string } } | null, icon: { __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null } | null> } | null, subItemsCollection: { items: Array<{ __typename: 'StatItem', internalName: string | null, title: string | null, progress: number | null, sys: { id: string }, iconsCollection: { items: Array<{ __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null> } | null } | null> } | null } | null> } | null }
          | { internalName: string | null, ui: string | null, sys: { id: string }, entry:
              | { __typename: 'ContentItem', entryField: string | null, title: string | null, subtitle: string | null, description: string | null, startDate: unknown, endDate: unknown, tags: Array<string | null> | null, sys: { id: string }, body: { json: unknown, links: { entries: { block: Array<
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { __typename: 'Image', internalName: string | null, alternativeText: string | null, caption: string | null, sys: { id: string }, image: { url: string | null, title: string | null, description: string | null, width: number | null, height: number | null } | null }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                       | null> }, assets: { block: Array<{ url: string | null, title: string | null, description: string | null, width: number | null, height: number | null, sys: { id: string } } | null> } } } | null, image: { __typename: 'Image', internalName: string | null, alternativeText: string | null, caption: string | null, sys: { id: string }, image: { url: string | null, title: string | null, description: string | null, width: number | null, height: number | null } | null } | null, icon: { __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null, linksCollection: { items: Array<{ __typename: 'Link', internalName: string | null, text: string | null, url: string | null, sys: { id: string }, page: { path: string | null, sys: { id: string } } | null, icon: { __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null } | null> } | null, subItemsCollection: { items: Array<{ __typename: 'StatItem', internalName: string | null, title: string | null, progress: number | null, sys: { id: string }, iconsCollection: { items: Array<{ __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null> } | null } | null> } | null }
              | { __typename: 'StatItem', internalName: string | null, title: string | null, progress: number | null, sys: { id: string }, iconsCollection: { items: Array<{ __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null> } | null }
             | null }
         | null> } | null, bottomContentAreaCollection: { items: Array<
          | { internalName: string | null, ui: string | null, title: string | null, entries: string | null, sys: { id: string }, description: { json: unknown } | null, customEntriesCollection: { items: Array<{ __typename: 'ContentItem', entryField: string | null, title: string | null, subtitle: string | null, description: string | null, startDate: unknown, endDate: unknown, tags: Array<string | null> | null, sys: { id: string }, body: { json: unknown, links: { entries: { block: Array<
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { __typename: 'Image', internalName: string | null, alternativeText: string | null, caption: string | null, sys: { id: string }, image: { url: string | null, title: string | null, description: string | null, width: number | null, height: number | null } | null }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                       | null> }, assets: { block: Array<{ url: string | null, title: string | null, description: string | null, width: number | null, height: number | null, sys: { id: string } } | null> } } } | null, image: { __typename: 'Image', internalName: string | null, alternativeText: string | null, caption: string | null, sys: { id: string }, image: { url: string | null, title: string | null, description: string | null, width: number | null, height: number | null } | null } | null, icon: { __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null, linksCollection: { items: Array<{ __typename: 'Link', internalName: string | null, text: string | null, url: string | null, sys: { id: string }, page: { path: string | null, sys: { id: string } } | null, icon: { __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null } | null> } | null, subItemsCollection: { items: Array<{ __typename: 'StatItem', internalName: string | null, title: string | null, progress: number | null, sys: { id: string }, iconsCollection: { items: Array<{ __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null> } | null } | null> } | null } | null> } | null }
          | { internalName: string | null, ui: string | null, sys: { id: string }, entry:
              | { __typename: 'ContentItem', entryField: string | null, title: string | null, subtitle: string | null, description: string | null, startDate: unknown, endDate: unknown, tags: Array<string | null> | null, sys: { id: string }, body: { json: unknown, links: { entries: { block: Array<
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { __typename: 'Image', internalName: string | null, alternativeText: string | null, caption: string | null, sys: { id: string }, image: { url: string | null, title: string | null, description: string | null, width: number | null, height: number | null } | null }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                        | { sys: { id: string } }
                       | null> }, assets: { block: Array<{ url: string | null, title: string | null, description: string | null, width: number | null, height: number | null, sys: { id: string } } | null> } } } | null, image: { __typename: 'Image', internalName: string | null, alternativeText: string | null, caption: string | null, sys: { id: string }, image: { url: string | null, title: string | null, description: string | null, width: number | null, height: number | null } | null } | null, icon: { __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null, linksCollection: { items: Array<{ __typename: 'Link', internalName: string | null, text: string | null, url: string | null, sys: { id: string }, page: { path: string | null, sys: { id: string } } | null, icon: { __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null } | null> } | null, subItemsCollection: { items: Array<{ __typename: 'StatItem', internalName: string | null, title: string | null, progress: number | null, sys: { id: string }, iconsCollection: { items: Array<{ __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null> } | null } | null> } | null }
              | { __typename: 'StatItem', internalName: string | null, title: string | null, progress: number | null, sys: { id: string }, iconsCollection: { items: Array<{ __typename: 'Icon', internalName: string | null, name: string | null, library: string | null, title: string | null, color: string | null, iconCode: string | null, showTooltip: boolean | null, sys: { id: string } } | null> } | null }
             | null }
         | null> } | null } | null> } | null };

export const ImageFieldsFragmentDoc = gql`
    fragment ImageFields on Image {
  __typename
  sys {
    id
  }
  internalName
  image {
    url
    title
    description
    width
    height
  }
  alternativeText
  caption
}
    `;
export const SeoMetadataFieldsFragmentDoc = gql`
    fragment SeoMetadataFields on SeoMetadata {
  __typename
  sys {
    id
  }
  internalName
  title
  description
  keywords
  canonicalUrl
  noIndex
  noFollow
  ogImage {
    ...ImageFields
  }
}
    ${ImageFieldsFragmentDoc}`;
export const IconFieldsFragmentDoc = gql`
    fragment IconFields on Icon {
  __typename
  sys {
    id
  }
  internalName
  name
  library
  title
  color
  iconCode
  showTooltip
}
    `;
export const LinkFieldsFragmentDoc = gql`
    fragment LinkFields on Link {
  __typename
  sys {
    id
  }
  internalName
  text
  url
  page {
    sys {
      id
    }
    path
  }
  icon {
    ...IconFields
  }
}
    ${IconFieldsFragmentDoc}`;
export const LayoutFieldsFragmentDoc = gql`
    fragment LayoutFields on Layout {
  __typename
  sys {
    id
  }
  internalName
  title
  role
  resume {
    url
    title
  }
  globalSeo {
    ...SeoMetadataFields
  }
  defaultTheme
  themeList
  siteLogo {
    ...ImageFields
  }
  email
  footerText
  resumeIcon {
    ...IconFields
  }
  themeIcon {
    ...IconFields
  }
  drawerVariant
  drawerSide
  navigationLinksCollection(limit: 10) {
    items {
      ...LinkFields
    }
  }
}
    ${SeoMetadataFieldsFragmentDoc}
${ImageFieldsFragmentDoc}
${IconFieldsFragmentDoc}
${LinkFieldsFragmentDoc}`;
export const StatItemFieldsFragmentDoc = gql`
    fragment StatItemFields on StatItem {
  __typename
  sys {
    id
  }
  internalName
  title
  progress
  iconsCollection(limit: 5) {
    items {
      ...IconFields
    }
  }
}
    ${IconFieldsFragmentDoc}`;
export const ContentItemFieldsFragmentDoc = gql`
    fragment ContentItemFields on ContentItem {
  __typename
  sys {
    id
  }
  entryField
  title
  subtitle
  description
  body {
    json
    links {
      entries {
        block {
          sys {
            id
          }
          ... on Image {
            ...ImageFields
          }
        }
      }
      assets {
        block {
          sys {
            id
          }
          url
          title
          description
          width
          height
        }
      }
    }
  }
  startDate
  endDate
  image {
    ...ImageFields
  }
  icon {
    ...IconFields
  }
  linksCollection(limit: 5) {
    items {
      ...LinkFields
    }
  }
  subItemsCollection(limit: 10) {
    items {
      ...StatItemFields
    }
  }
  tags
}
    ${ImageFieldsFragmentDoc}
${IconFieldsFragmentDoc}
${LinkFieldsFragmentDoc}
${StatItemFieldsFragmentDoc}`;
export const ContentListFieldsFragmentDoc = gql`
    fragment ContentListFields on ContentList {
  sys {
    id
  }
  internalName
  ui
  title
  description {
    json
  }
  entries
  customEntriesCollection(limit: 10) {
    items {
      ...ContentItemFields
    }
  }
}
    ${ContentItemFieldsFragmentDoc}`;
export const ContentSectionFieldsFragmentDoc = gql`
    fragment ContentSectionFields on ContentSection {
  sys {
    id
  }
  internalName
  ui
  entry {
    ... on ContentItem {
      ...ContentItemFields
    }
    ... on StatItem {
      ...StatItemFields
    }
  }
}
    ${ContentItemFieldsFragmentDoc}
${StatItemFieldsFragmentDoc}`;
export const PageFieldsFragmentDoc = gql`
    fragment PageFields on Page {
  __typename
  sys {
    id
  }
  internalName
  path
  title
  seo {
    ...SeoMetadataFields
  }
  topContentAreaCollection(limit: 5) {
    items {
      ... on ContentList {
        ...ContentListFields
      }
      ... on ContentSection {
        ...ContentSectionFields
      }
    }
  }
  bottomContentAreaCollection(limit: 5) {
    items {
      ... on ContentList {
        ...ContentListFields
      }
      ... on ContentSection {
        ...ContentSectionFields
      }
    }
  }
}
    ${SeoMetadataFieldsFragmentDoc}
${ContentListFieldsFragmentDoc}
${ContentSectionFieldsFragmentDoc}`;
export const GetLayoutDocument = gql`
    query GetLayout($preview: Boolean = false) {
  layoutCollection(limit: 1, preview: $preview) {
    items {
      ...LayoutFields
    }
  }
}
    ${LayoutFieldsFragmentDoc}`;
export const GetPageByPathDocument = gql`
    query GetPageByPath($path: String!, $preview: Boolean = false) {
  pageCollection(where: {path: $path}, limit: 1, preview: $preview) {
    items {
      ...PageFields
    }
  }
}
    ${PageFieldsFragmentDoc}`;

export type SdkFunctionWrapper = <T>(action: (requestHeaders?:Record<string, string>) => Promise<T>, operationName: string, operationType?: string, variables?: any) => Promise<T>;


const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType, _variables) => action();
const GetLayoutDocumentString = print(GetLayoutDocument);
const GetPageByPathDocumentString = print(GetPageByPathDocument);
export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    GetLayout(variables?: GetLayoutQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetLayoutQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetLayoutQuery>(GetLayoutDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetLayout', 'query', variables);
    },
    GetPageByPath(variables: GetPageByPathQueryVariables, requestHeaders?: GraphQLClientRequestHeaders): Promise<{ data: GetPageByPathQuery; errors?: GraphQLError[]; extensions?: any; headers: Headers; status: number; }> {
        return withWrapper((wrappedRequestHeaders) => client.rawRequest<GetPageByPathQuery>(GetPageByPathDocumentString, variables, {...requestHeaders, ...wrappedRequestHeaders}), 'GetPageByPath', 'query', variables);
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;