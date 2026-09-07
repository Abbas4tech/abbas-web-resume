import type { Document } from "@contentful/rich-text-types";
import type {
  ContentItemFieldsFragment,
  ContentListFieldsFragment,
  ContentSectionFieldsFragment,
  IconFieldsFragment,
  ImageFieldsFragment,
  LayoutFieldsFragment,
  LinkFieldsFragment,
  PageFieldsFragment,
  StatItemFieldsFragment,
} from "@/contentful/generated/contentful-sdk.generated";

/**
 * Base mock for Contentful GraphQL system properties. Every fragment type
 * only ever selects `sys { id }`, so this is intentionally minimal.
 */
export const mockContentfulSys = (id: string) => ({ id });

/**
 * Utility to create strongly typed mock factory functions. Unlike a
 * `Partial<T>` factory, this requires a fully realistic default object so a
 * schema field can never silently go missing from every fixture built off it.
 */
export function createFactory<T>(defaults: T) {
  return (overrides?: Partial<T>): T => ({
    ...defaults,
    ...overrides,
  });
}

const emptyRichTextLinks = () => ({
  entries: { block: [] },
  assets: { block: [] },
});

/** A single-paragraph rich text document, the shape most fixtures need. */
export function richTextDocument(text: string): Document {
  return {
    nodeType: "document",
    data: {},
    content: [
      {
        nodeType: "paragraph",
        data: {},
        content: [{ nodeType: "text", value: text, marks: [], data: {} }],
      },
    ],
  } as Document;
}

export const createMockIcon = createFactory<IconFieldsFragment>({
  __typename: "Icon",
  sys: mockContentfulSys("icon-default"),
  internalName: "Default icon",
  name: "FaHome",
  library: "fa",
  title: "Icon",
  color: null,
  iconCode: null,
  showTooltip: true,
});

export const createMockImage = createFactory<ImageFieldsFragment>({
  __typename: "Image",
  sys: mockContentfulSys("image-default"),
  internalName: "Default image",
  alternativeText: "A placeholder fixture image",
  caption: null,
  image: {
    url: "https://images.ctfassets.net/fixture-space/default.svg",
    title: "Default image",
    description: null,
    width: 800,
    height: 600,
  },
});

export const createMockLink = createFactory<LinkFieldsFragment>({
  __typename: "Link",
  sys: mockContentfulSys("link-default"),
  internalName: "Default link",
  text: "Link",
  url: "#",
  page: null,
  icon: null,
});

export const createMockStatItem = createFactory<StatItemFieldsFragment>({
  __typename: "StatItem",
  sys: mockContentfulSys("stat-item-default"),
  internalName: "Default stat item",
  title: "Skill",
  progress: 50,
  iconsCollection: { items: [] },
});

export const createMockContentItem = createFactory<ContentItemFieldsFragment>({
  __typename: "ContentItem",
  sys: mockContentfulSys("content-item-default"),
  entryField: "default",
  title: "Content item",
  subtitle: null,
  description: null,
  startDate: null,
  endDate: null,
  tags: null,
  body: null,
  image: null,
  coverImage: null,
  icon: null,
  linksCollection: { items: [] },
  subItemsCollection: { items: [] },
});

export const createMockContentSection =
  createFactory<ContentSectionFieldsFragment>({
    internalName: "Default content section",
    ui: "HeroBanner",
    sys: mockContentfulSys("content-section-default"),
    entry: createMockContentItem(),
  });

export const createMockContentList = createFactory<ContentListFieldsFragment>({
  internalName: "Default content list",
  ui: "CardGrid",
  sys: mockContentfulSys("content-list-default"),
  title: "",
  entries: "Custom",
  description: null,
  customEntriesCollection: { items: [] },
});

export const createMockPage = createFactory<PageFieldsFragment>({
  __typename: "Page",
  sys: mockContentfulSys("page-default"),
  internalName: "Default page",
  path: "/",
  title: "Untitled page",
  icon: null,
  description: null,
  seo: null,
  topContentAreaCollection: { items: [] },
  bottomContentAreaCollection: { items: [] },
});

export const createMockLayout = createFactory<LayoutFieldsFragment>({
  __typename: "Layout",
  sys: mockContentfulSys("layout-default"),
  internalName: "Default layout",
  title: "Fixture Site",
  role: "Software Engineer",
  defaultTheme: "light",
  themeList: ["light", "dark"],
  email: "fixture@example.com",
  footerText: "Fixture footer",
  drawerVariant: "Default",
  drawerSide: "Left",
  resume: null,
  globalSeo: null,
  siteLogo: null,
  resumeIcon: null,
  themeIcon: null,
  navigationLinksCollection: { items: [] },
});

// Fill in the rich text links every body/description field carries, without
// repeating the shape at every call site.
export { emptyRichTextLinks };
