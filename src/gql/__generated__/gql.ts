/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
  "fragment Asset on Asset {\n  __typename\n  sys {\n    id\n  }\n  width\n  url\n  title\n  size\n  height\n  description\n  fileName\n  contentType\n}": typeof types.AssetFragmentDoc;
  "fragment BioCard on BioCard {\n  title\n  value\n  __typename\n  _id\n  icon {\n    ...Icon\n  }\n}": typeof types.BioCardFragmentDoc;
  "fragment ExperiencePageData on ExperiencePageData {\n  title\n  _id\n  __typename\n  experiencesCollection(limit: 10) {\n    items {\n      ...JobExperience\n    }\n  }\n}": typeof types.ExperiencePageDataFragmentDoc;
  "fragment HomePageData on HomePageData {\n  _id\n  description {\n    json\n  }\n  title\n  __typename\n  infoCollection {\n    items {\n      title\n      __typename\n      value\n      icon {\n        ...Icon\n      }\n    }\n  }\n}": typeof types.HomePageDataFragmentDoc;
  "fragment Icon on Icon {\n  _id\n  classes\n  __typename\n  name\n  iconCode\n  showTooltip\n}": typeof types.IconFragmentDoc;
  "fragment JobExperience on JobExperience {\n  company\n  companyIcon {\n    ...Icon\n  }\n  currentlyWorking\n  __typename\n  workedRemotely\n  techStackIcon {\n    ...Icon\n  }\n  description {\n    json\n  }\n  durationIcon {\n    ...Icon\n  }\n  endDate\n  position\n  startDate\n  location\n  locationIcon {\n    ...Icon\n  }\n  roleIcon {\n    ...Icon\n  }\n  techStack {\n    skillProgress\n    _id\n    title\n    skillIconsCollection {\n      items {\n        ...Icon\n      }\n    }\n  }\n}": typeof types.JobExperienceFragmentDoc;
  "fragment ProjectsPageData on ProjectsPageData {\n  _id\n  title\n  __typename\n  projectsCollection {\n    items {\n      _id\n      deployedLink\n      title\n      __typename\n      description\n      deployedLinkIcon {\n        ...Icon\n      }\n      thumbnail {\n        ...Asset\n      }\n    }\n  }\n}": typeof types.ProjectsPageDataFragmentDoc;
  "fragment SkillsPageData on SkillsPageData {\n  _id\n  title\n  __typename\n  skillsSetCollection(limit: 10) {\n    items {\n      title\n      icon {\n        ...Icon\n      }\n      skillsArrayCollection(limit: 10) {\n        items {\n          _id\n          title\n          skillIconsCollection(limit: 10) {\n            __typename\n            items {\n              ...Icon\n            }\n          }\n          skillProgress\n          __typename\n        }\n      }\n    }\n  }\n}": typeof types.SkillsPageDataFragmentDoc;
  "fragment SeoData on SeoData {\n  countryName\n  creator\n  description\n  keywords\n  __typename\n  url\n  siteName\n  publisher\n  imagesCollection {\n    items {\n      ...Asset\n    }\n  }\n  favicon {\n    ...Asset\n  }\n  title\n  sys {\n    id\n  }\n}": typeof types.SeoDataFragmentDoc;
  "query GetAppData($id: String!) {\n  userInfo(id: $id) {\n    title\n    name\n    bannerData {\n      bannerAnimation\n      title\n      profilePicture {\n        description\n        fileName\n        width\n        height\n        title\n        url\n      }\n      bannerAnimation\n      socialLinksCollection {\n        items {\n          description\n          fileName\n          width\n          height\n          title\n          url\n        }\n      }\n      bannerImage {\n        title\n        url\n        description\n        fileName\n        height\n        width\n      }\n    }\n    defaultTheme\n    themeList\n    resume {\n      description\n      fileName\n      title\n      url\n      width\n      height\n    }\n    role\n    pagesCollection {\n      items {\n        pageUrl\n        isDefaultPage\n        title\n        pageIcon {\n          _id\n          classes\n          iconCode\n          name\n          showTooltip\n        }\n      }\n    }\n    resumeIcon {\n      _id\n      classes\n      showTooltip\n      name\n      iconCode\n    }\n    resume {\n      description\n      fileName\n      title\n      url\n    }\n    themeIcon {\n      _id\n      classes\n      showTooltip\n      name\n      iconCode\n    }\n    themeList\n    defaultTheme\n    layoutSettings {\n      drawerSide\n      drawerVariant\n      title\n    }\n  }\n}": typeof types.GetAppDataDocument;
  "query fetchPageByPath($path: String!) {\n  pageCollection(where: {path: $path}, limit: 1) {\n    items {\n      _id\n      path\n      title\n      contentAnimation\n      pageSeo {\n        ...SeoData\n      }\n      pageData {\n        __typename\n        ... on HomePageData {\n          ...HomePageData\n        }\n        ... on ExperiencePageData {\n          ...ExperiencePageData\n        }\n        ... on SkillsPageData {\n          ...SkillsPageData\n        }\n        ... on ProjectsPageData {\n          ...ProjectsPageData\n        }\n      }\n      headingAnimation\n      pageIcon {\n        ...Icon\n      }\n    }\n  }\n}": typeof types.FetchPageByPathDocument;
};
const documents: Documents = {
  "fragment Asset on Asset {\n  __typename\n  sys {\n    id\n  }\n  width\n  url\n  title\n  size\n  height\n  description\n  fileName\n  contentType\n}":
    types.AssetFragmentDoc,
  "fragment BioCard on BioCard {\n  title\n  value\n  __typename\n  _id\n  icon {\n    ...Icon\n  }\n}":
    types.BioCardFragmentDoc,
  "fragment ExperiencePageData on ExperiencePageData {\n  title\n  _id\n  __typename\n  experiencesCollection(limit: 10) {\n    items {\n      ...JobExperience\n    }\n  }\n}":
    types.ExperiencePageDataFragmentDoc,
  "fragment HomePageData on HomePageData {\n  _id\n  description {\n    json\n  }\n  title\n  __typename\n  infoCollection {\n    items {\n      title\n      __typename\n      value\n      icon {\n        ...Icon\n      }\n    }\n  }\n}":
    types.HomePageDataFragmentDoc,
  "fragment Icon on Icon {\n  _id\n  classes\n  __typename\n  name\n  iconCode\n  showTooltip\n}":
    types.IconFragmentDoc,
  "fragment JobExperience on JobExperience {\n  company\n  companyIcon {\n    ...Icon\n  }\n  currentlyWorking\n  __typename\n  workedRemotely\n  techStackIcon {\n    ...Icon\n  }\n  description {\n    json\n  }\n  durationIcon {\n    ...Icon\n  }\n  endDate\n  position\n  startDate\n  location\n  locationIcon {\n    ...Icon\n  }\n  roleIcon {\n    ...Icon\n  }\n  techStack {\n    skillProgress\n    _id\n    title\n    skillIconsCollection {\n      items {\n        ...Icon\n      }\n    }\n  }\n}":
    types.JobExperienceFragmentDoc,
  "fragment ProjectsPageData on ProjectsPageData {\n  _id\n  title\n  __typename\n  projectsCollection {\n    items {\n      _id\n      deployedLink\n      title\n      __typename\n      description\n      deployedLinkIcon {\n        ...Icon\n      }\n      thumbnail {\n        ...Asset\n      }\n    }\n  }\n}":
    types.ProjectsPageDataFragmentDoc,
  "fragment SkillsPageData on SkillsPageData {\n  _id\n  title\n  __typename\n  skillsSetCollection(limit: 10) {\n    items {\n      title\n      icon {\n        ...Icon\n      }\n      skillsArrayCollection(limit: 10) {\n        items {\n          _id\n          title\n          skillIconsCollection(limit: 10) {\n            __typename\n            items {\n              ...Icon\n            }\n          }\n          skillProgress\n          __typename\n        }\n      }\n    }\n  }\n}":
    types.SkillsPageDataFragmentDoc,
  "fragment SeoData on SeoData {\n  countryName\n  creator\n  description\n  keywords\n  __typename\n  url\n  siteName\n  publisher\n  imagesCollection {\n    items {\n      ...Asset\n    }\n  }\n  favicon {\n    ...Asset\n  }\n  title\n  sys {\n    id\n  }\n}":
    types.SeoDataFragmentDoc,
  "query GetAppData($id: String!) {\n  userInfo(id: $id) {\n    title\n    name\n    bannerData {\n      bannerAnimation\n      title\n      profilePicture {\n        description\n        fileName\n        width\n        height\n        title\n        url\n      }\n      bannerAnimation\n      socialLinksCollection {\n        items {\n          description\n          fileName\n          width\n          height\n          title\n          url\n        }\n      }\n      bannerImage {\n        title\n        url\n        description\n        fileName\n        height\n        width\n      }\n    }\n    defaultTheme\n    themeList\n    resume {\n      description\n      fileName\n      title\n      url\n      width\n      height\n    }\n    role\n    pagesCollection {\n      items {\n        pageUrl\n        isDefaultPage\n        title\n        pageIcon {\n          _id\n          classes\n          iconCode\n          name\n          showTooltip\n        }\n      }\n    }\n    resumeIcon {\n      _id\n      classes\n      showTooltip\n      name\n      iconCode\n    }\n    resume {\n      description\n      fileName\n      title\n      url\n    }\n    themeIcon {\n      _id\n      classes\n      showTooltip\n      name\n      iconCode\n    }\n    themeList\n    defaultTheme\n    layoutSettings {\n      drawerSide\n      drawerVariant\n      title\n    }\n  }\n}":
    types.GetAppDataDocument,
  "query fetchPageByPath($path: String!) {\n  pageCollection(where: {path: $path}, limit: 1) {\n    items {\n      _id\n      path\n      title\n      contentAnimation\n      pageSeo {\n        ...SeoData\n      }\n      pageData {\n        __typename\n        ... on HomePageData {\n          ...HomePageData\n        }\n        ... on ExperiencePageData {\n          ...ExperiencePageData\n        }\n        ... on SkillsPageData {\n          ...SkillsPageData\n        }\n        ... on ProjectsPageData {\n          ...ProjectsPageData\n        }\n      }\n      headingAnimation\n      pageIcon {\n        ...Icon\n      }\n    }\n  }\n}":
    types.FetchPageByPathDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment Asset on Asset {\n  __typename\n  sys {\n    id\n  }\n  width\n  url\n  title\n  size\n  height\n  description\n  fileName\n  contentType\n}",
): (typeof documents)["fragment Asset on Asset {\n  __typename\n  sys {\n    id\n  }\n  width\n  url\n  title\n  size\n  height\n  description\n  fileName\n  contentType\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment BioCard on BioCard {\n  title\n  value\n  __typename\n  _id\n  icon {\n    ...Icon\n  }\n}",
): (typeof documents)["fragment BioCard on BioCard {\n  title\n  value\n  __typename\n  _id\n  icon {\n    ...Icon\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment ExperiencePageData on ExperiencePageData {\n  title\n  _id\n  __typename\n  experiencesCollection(limit: 10) {\n    items {\n      ...JobExperience\n    }\n  }\n}",
): (typeof documents)["fragment ExperiencePageData on ExperiencePageData {\n  title\n  _id\n  __typename\n  experiencesCollection(limit: 10) {\n    items {\n      ...JobExperience\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment HomePageData on HomePageData {\n  _id\n  description {\n    json\n  }\n  title\n  __typename\n  infoCollection {\n    items {\n      title\n      __typename\n      value\n      icon {\n        ...Icon\n      }\n    }\n  }\n}",
): (typeof documents)["fragment HomePageData on HomePageData {\n  _id\n  description {\n    json\n  }\n  title\n  __typename\n  infoCollection {\n    items {\n      title\n      __typename\n      value\n      icon {\n        ...Icon\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment Icon on Icon {\n  _id\n  classes\n  __typename\n  name\n  iconCode\n  showTooltip\n}",
): (typeof documents)["fragment Icon on Icon {\n  _id\n  classes\n  __typename\n  name\n  iconCode\n  showTooltip\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment JobExperience on JobExperience {\n  company\n  companyIcon {\n    ...Icon\n  }\n  currentlyWorking\n  __typename\n  workedRemotely\n  techStackIcon {\n    ...Icon\n  }\n  description {\n    json\n  }\n  durationIcon {\n    ...Icon\n  }\n  endDate\n  position\n  startDate\n  location\n  locationIcon {\n    ...Icon\n  }\n  roleIcon {\n    ...Icon\n  }\n  techStack {\n    skillProgress\n    _id\n    title\n    skillIconsCollection {\n      items {\n        ...Icon\n      }\n    }\n  }\n}",
): (typeof documents)["fragment JobExperience on JobExperience {\n  company\n  companyIcon {\n    ...Icon\n  }\n  currentlyWorking\n  __typename\n  workedRemotely\n  techStackIcon {\n    ...Icon\n  }\n  description {\n    json\n  }\n  durationIcon {\n    ...Icon\n  }\n  endDate\n  position\n  startDate\n  location\n  locationIcon {\n    ...Icon\n  }\n  roleIcon {\n    ...Icon\n  }\n  techStack {\n    skillProgress\n    _id\n    title\n    skillIconsCollection {\n      items {\n        ...Icon\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment ProjectsPageData on ProjectsPageData {\n  _id\n  title\n  __typename\n  projectsCollection {\n    items {\n      _id\n      deployedLink\n      title\n      __typename\n      description\n      deployedLinkIcon {\n        ...Icon\n      }\n      thumbnail {\n        ...Asset\n      }\n    }\n  }\n}",
): (typeof documents)["fragment ProjectsPageData on ProjectsPageData {\n  _id\n  title\n  __typename\n  projectsCollection {\n    items {\n      _id\n      deployedLink\n      title\n      __typename\n      description\n      deployedLinkIcon {\n        ...Icon\n      }\n      thumbnail {\n        ...Asset\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment SkillsPageData on SkillsPageData {\n  _id\n  title\n  __typename\n  skillsSetCollection(limit: 10) {\n    items {\n      title\n      icon {\n        ...Icon\n      }\n      skillsArrayCollection(limit: 10) {\n        items {\n          _id\n          title\n          skillIconsCollection(limit: 10) {\n            __typename\n            items {\n              ...Icon\n            }\n          }\n          skillProgress\n          __typename\n        }\n      }\n    }\n  }\n}",
): (typeof documents)["fragment SkillsPageData on SkillsPageData {\n  _id\n  title\n  __typename\n  skillsSetCollection(limit: 10) {\n    items {\n      title\n      icon {\n        ...Icon\n      }\n      skillsArrayCollection(limit: 10) {\n        items {\n          _id\n          title\n          skillIconsCollection(limit: 10) {\n            __typename\n            items {\n              ...Icon\n            }\n          }\n          skillProgress\n          __typename\n        }\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment SeoData on SeoData {\n  countryName\n  creator\n  description\n  keywords\n  __typename\n  url\n  siteName\n  publisher\n  imagesCollection {\n    items {\n      ...Asset\n    }\n  }\n  favicon {\n    ...Asset\n  }\n  title\n  sys {\n    id\n  }\n}",
): (typeof documents)["fragment SeoData on SeoData {\n  countryName\n  creator\n  description\n  keywords\n  __typename\n  url\n  siteName\n  publisher\n  imagesCollection {\n    items {\n      ...Asset\n    }\n  }\n  favicon {\n    ...Asset\n  }\n  title\n  sys {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query GetAppData($id: String!) {\n  userInfo(id: $id) {\n    title\n    name\n    bannerData {\n      bannerAnimation\n      title\n      profilePicture {\n        description\n        fileName\n        width\n        height\n        title\n        url\n      }\n      bannerAnimation\n      socialLinksCollection {\n        items {\n          description\n          fileName\n          width\n          height\n          title\n          url\n        }\n      }\n      bannerImage {\n        title\n        url\n        description\n        fileName\n        height\n        width\n      }\n    }\n    defaultTheme\n    themeList\n    resume {\n      description\n      fileName\n      title\n      url\n      width\n      height\n    }\n    role\n    pagesCollection {\n      items {\n        pageUrl\n        isDefaultPage\n        title\n        pageIcon {\n          _id\n          classes\n          iconCode\n          name\n          showTooltip\n        }\n      }\n    }\n    resumeIcon {\n      _id\n      classes\n      showTooltip\n      name\n      iconCode\n    }\n    resume {\n      description\n      fileName\n      title\n      url\n    }\n    themeIcon {\n      _id\n      classes\n      showTooltip\n      name\n      iconCode\n    }\n    themeList\n    defaultTheme\n    layoutSettings {\n      drawerSide\n      drawerVariant\n      title\n    }\n  }\n}",
): (typeof documents)["query GetAppData($id: String!) {\n  userInfo(id: $id) {\n    title\n    name\n    bannerData {\n      bannerAnimation\n      title\n      profilePicture {\n        description\n        fileName\n        width\n        height\n        title\n        url\n      }\n      bannerAnimation\n      socialLinksCollection {\n        items {\n          description\n          fileName\n          width\n          height\n          title\n          url\n        }\n      }\n      bannerImage {\n        title\n        url\n        description\n        fileName\n        height\n        width\n      }\n    }\n    defaultTheme\n    themeList\n    resume {\n      description\n      fileName\n      title\n      url\n      width\n      height\n    }\n    role\n    pagesCollection {\n      items {\n        pageUrl\n        isDefaultPage\n        title\n        pageIcon {\n          _id\n          classes\n          iconCode\n          name\n          showTooltip\n        }\n      }\n    }\n    resumeIcon {\n      _id\n      classes\n      showTooltip\n      name\n      iconCode\n    }\n    resume {\n      description\n      fileName\n      title\n      url\n    }\n    themeIcon {\n      _id\n      classes\n      showTooltip\n      name\n      iconCode\n    }\n    themeList\n    defaultTheme\n    layoutSettings {\n      drawerSide\n      drawerVariant\n      title\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query fetchPageByPath($path: String!) {\n  pageCollection(where: {path: $path}, limit: 1) {\n    items {\n      _id\n      path\n      title\n      contentAnimation\n      pageSeo {\n        ...SeoData\n      }\n      pageData {\n        __typename\n        ... on HomePageData {\n          ...HomePageData\n        }\n        ... on ExperiencePageData {\n          ...ExperiencePageData\n        }\n        ... on SkillsPageData {\n          ...SkillsPageData\n        }\n        ... on ProjectsPageData {\n          ...ProjectsPageData\n        }\n      }\n      headingAnimation\n      pageIcon {\n        ...Icon\n      }\n    }\n  }\n}",
): (typeof documents)["query fetchPageByPath($path: String!) {\n  pageCollection(where: {path: $path}, limit: 1) {\n    items {\n      _id\n      path\n      title\n      contentAnimation\n      pageSeo {\n        ...SeoData\n      }\n      pageData {\n        __typename\n        ... on HomePageData {\n          ...HomePageData\n        }\n        ... on ExperiencePageData {\n          ...ExperiencePageData\n        }\n        ... on SkillsPageData {\n          ...SkillsPageData\n        }\n        ... on ProjectsPageData {\n          ...ProjectsPageData\n        }\n      }\n      headingAnimation\n      pageIcon {\n        ...Icon\n      }\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
