/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

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
    "query GetAppData($id: String!) {\n  userInfo(id: $id) {\n    title\n    name\n    bannerData {\n      bannerAnimation\n      title\n      profilePicture {\n        description\n        fileName\n        width\n        height\n        title\n        url\n      }\n      bannerAnimation\n      socialLinksCollection {\n        items {\n          description\n          fileName\n          width\n          height\n          title\n          url\n        }\n      }\n      bannerImage {\n        title\n        url\n        description\n        fileName\n        height\n        width\n      }\n    }\n    defaultTheme\n    themeList\n    resume {\n      description\n      fileName\n      title\n      url\n    }\n    role\n    pagesCollection {\n      items {\n        pageUrl\n        isDefaultPage\n        title\n        pageIcon {\n          classes\n          iconCode\n          name\n          showTooltip\n        }\n      }\n    }\n    resumeIcon {\n      classes\n      showTooltip\n      name\n      iconCode\n    }\n    resume {\n      description\n      fileName\n      title\n      url\n    }\n    themeIcon {\n      classes\n      showTooltip\n      name\n      iconCode\n    }\n    themeList\n    defaultTheme\n    layoutSettings {\n      drawerSide\n      drawerVariant\n      title\n    }\n  }\n}": typeof types.GetAppDataDocument,
};
const documents: Documents = {
    "query GetAppData($id: String!) {\n  userInfo(id: $id) {\n    title\n    name\n    bannerData {\n      bannerAnimation\n      title\n      profilePicture {\n        description\n        fileName\n        width\n        height\n        title\n        url\n      }\n      bannerAnimation\n      socialLinksCollection {\n        items {\n          description\n          fileName\n          width\n          height\n          title\n          url\n        }\n      }\n      bannerImage {\n        title\n        url\n        description\n        fileName\n        height\n        width\n      }\n    }\n    defaultTheme\n    themeList\n    resume {\n      description\n      fileName\n      title\n      url\n    }\n    role\n    pagesCollection {\n      items {\n        pageUrl\n        isDefaultPage\n        title\n        pageIcon {\n          classes\n          iconCode\n          name\n          showTooltip\n        }\n      }\n    }\n    resumeIcon {\n      classes\n      showTooltip\n      name\n      iconCode\n    }\n    resume {\n      description\n      fileName\n      title\n      url\n    }\n    themeIcon {\n      classes\n      showTooltip\n      name\n      iconCode\n    }\n    themeList\n    defaultTheme\n    layoutSettings {\n      drawerSide\n      drawerVariant\n      title\n    }\n  }\n}": types.GetAppDataDocument,
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
export function graphql(source: "query GetAppData($id: String!) {\n  userInfo(id: $id) {\n    title\n    name\n    bannerData {\n      bannerAnimation\n      title\n      profilePicture {\n        description\n        fileName\n        width\n        height\n        title\n        url\n      }\n      bannerAnimation\n      socialLinksCollection {\n        items {\n          description\n          fileName\n          width\n          height\n          title\n          url\n        }\n      }\n      bannerImage {\n        title\n        url\n        description\n        fileName\n        height\n        width\n      }\n    }\n    defaultTheme\n    themeList\n    resume {\n      description\n      fileName\n      title\n      url\n    }\n    role\n    pagesCollection {\n      items {\n        pageUrl\n        isDefaultPage\n        title\n        pageIcon {\n          classes\n          iconCode\n          name\n          showTooltip\n        }\n      }\n    }\n    resumeIcon {\n      classes\n      showTooltip\n      name\n      iconCode\n    }\n    resume {\n      description\n      fileName\n      title\n      url\n    }\n    themeIcon {\n      classes\n      showTooltip\n      name\n      iconCode\n    }\n    themeList\n    defaultTheme\n    layoutSettings {\n      drawerSide\n      drawerVariant\n      title\n    }\n  }\n}"): (typeof documents)["query GetAppData($id: String!) {\n  userInfo(id: $id) {\n    title\n    name\n    bannerData {\n      bannerAnimation\n      title\n      profilePicture {\n        description\n        fileName\n        width\n        height\n        title\n        url\n      }\n      bannerAnimation\n      socialLinksCollection {\n        items {\n          description\n          fileName\n          width\n          height\n          title\n          url\n        }\n      }\n      bannerImage {\n        title\n        url\n        description\n        fileName\n        height\n        width\n      }\n    }\n    defaultTheme\n    themeList\n    resume {\n      description\n      fileName\n      title\n      url\n    }\n    role\n    pagesCollection {\n      items {\n        pageUrl\n        isDefaultPage\n        title\n        pageIcon {\n          classes\n          iconCode\n          name\n          showTooltip\n        }\n      }\n    }\n    resumeIcon {\n      classes\n      showTooltip\n      name\n      iconCode\n    }\n    resume {\n      description\n      fileName\n      title\n      url\n    }\n    themeIcon {\n      classes\n      showTooltip\n      name\n      iconCode\n    }\n    themeList\n    defaultTheme\n    layoutSettings {\n      drawerSide\n      drawerVariant\n      title\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;