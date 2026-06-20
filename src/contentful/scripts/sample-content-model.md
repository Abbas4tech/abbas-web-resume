# Sample Content Model Schema

This file serves as a reference documentation for the Contentful Content Model. It provides the full TypeScript schema definition for the models.

```typescript
/** biome-ignore-all lint/suspicious/noExplicitAny: false */

import "dotenv/config";

// Using require to import CommonJS module
const contentfulManagement = require("contentful-management");

async function main() {
  const createClient = contentfulManagement.createClient;

  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

  if (!(spaceId && accessToken)) {
    console.error("Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN");
    process.exit(1);
  }

  const client = createClient({ accessToken }, { type: "legacy" });

  async function upsertContentType(environment: any, id: string, data: any) {
    try {
      const existing = await environment.getContentType(id);

      existing.name = data.name;
      existing.description = data.description;
      existing.displayField = data.displayField;
      existing.fields = data.fields;

      const updated = await existing.update();
      await updated.publish();

      console.log(`✅ Updated content type: ${id}`);
    } catch (error: any) {
      if (error.name === "NotFound") {
        const created = await environment.createContentTypeWithId(id, data);
        await created.publish();
        console.log(`✅ Created content type: ${id}`);
      } else {
        console.error(`❌ Error with ${id}`, error);
      }
    }
  }

  const space = await client.getSpace(spaceId);
  const environment = await space.getEnvironment(
    process.env.CONTENTFUL_ENVIRONMENT || "master"
  );

  const richTextValidation = [
    {
      enabledMarks: [
        "bold",
        "italic",
        "underline",
        "code",
        "superscript",
        "subscript",
        "strikethrough",
      ],
    },
    {
      enabledNodeTypes: [
        "heading-1",
        "heading-2",
        "heading-3",
        "heading-4",
        "heading-5",
        "heading-6",
        "ordered-list",
        "unordered-list",
        "hr",
        "blockquote",
        "embedded-entry-block",
        "embedded-asset-block",
        "table",
        "hyperlink",
        "entry-hyperlink",
        "asset-hyperlink",
      ],
    },
  ];

  // --------------------------------------------------
  // 1. Image
  // --------------------------------------------------

  await upsertContentType(environment, "image", {
    name: "🖼 [Element] Image",
    description: "Image assets with metadata and accessibility features",
    displayField: "internalName",
    fields: [
      {
        id: "internalName",
        name: "internalName",
        type: "Symbol",
        required: true,
        localized: false,
        validations: [],
      },
      {
        id: "image",
        name: "image",
        type: "Link",
        linkType: "Asset",
        required: true,
        localized: false,
        validations: [{ linkMimetypeGroup: ["image"] }],
      },
      {
        id: "alternativeText",
        name: "alternativeText",
        type: "Symbol",
        required: true,
        localized: true,
        validations: [],
      },
      {
        id: "caption",
        name: "caption",
        type: "Symbol",
        required: false,
        localized: false,
        validations: [],
      },
    ],
  });

  // --------------------------------------------------
  // 2. Link
  // --------------------------------------------------

  await upsertContentType(environment, "link", {
    name: "🔗 [Element] Link",
    description: "Links and navigation items for buttons and CTAs",
    displayField: "internalName",
    fields: [
      {
        id: "internalName",
        name: "internalName",
        type: "Symbol",
        required: true,
        localized: false,
        validations: [],
      },
      {
        id: "text",
        name: "text",
        type: "Symbol",
        required: true,
        localized: false,
        validations: [],
      },
      {
        id: "page",
        name: "page",
        type: "Link",
        linkType: "Entry",
        required: false,
        localized: false,
        validations: [{ linkContentType: ["page"] }],
      },
      {
        id: "url",
        name: "url",
        type: "Symbol",
        required: false,
        localized: false,
        validations: [],
      },
    ],
  });

  // --------------------------------------------------
  // 3. Article
  // --------------------------------------------------

  await upsertContentType(environment, "article", {
    name: "📚 [Content] Article",
    description: "Blog articles and news content with rich text",
    displayField: "internalName",
    fields: [
      {
        id: "internalName",
        name: "internalName",
        type: "Symbol",
        required: true,
        localized: false,
        validations: [],
      },
      {
        id: "title",
        name: "title",
        type: "Symbol",
        required: true,
        localized: false,
        validations: [],
      },
      {
        id: "slug",
        name: "slug",
        type: "Symbol",
        required: true,
        localized: false,
        validations: [{ unique: true }],
      },
      {
        id: "date",
        name: "date",
        type: "Date",
        required: true,
        localized: false,
        validations: [],
      },
      {
        id: "image",
        name: "image",
        type: "Link",
        linkType: "Entry",
        required: true,
        localized: false,
        validations: [{ linkContentType: ["image"] }],
      },
      {
        id: "body",
        name: "body",
        type: "RichText",
        required: true,
        localized: false,
        validations: richTextValidation,
      },
    ],
  });

  // --------------------------------------------------
  // 4. Content Item
  // --------------------------------------------------

  await upsertContentType(environment, "contentItem", {
    name: "📚 [Content] Content Item",
    description: "Reusable content blocks with rich text and media",
    displayField: "entryField",
    fields: [
      {
        id: "entryField",
        name: "entryField",
        type: "Symbol",
        required: true,
        localized: false,
        validations: [],
      },
      {
        id: "title",
        name: "title",
        type: "Symbol",
        required: true,
        localized: false,
        validations: [],
      },
      {
        id: "description",
        name: "description",
        type: "Text",
        required: false,
        localized: false,
        validations: [],
      },
      {
        id: "body",
        name: "body",
        type: "RichText",
        required: false,
        localized: false,
        validations: richTextValidation,
      },
      {
        id: "image",
        name: "image",
        type: "Link",
        linkType: "Entry",
        required: false,
        localized: false,
        validations: [{ linkContentType: ["image"] }],
      },
      {
        id: "links",
        name: "links",
        type: "Array",
        required: false,
        localized: false,
        items: {
          type: "Link",
          linkType: "Entry",
          validations: [{ linkContentType: ["link"] }],
        },
        validations: [{ size: { max: 2 } }],
      },
      {
        id: "icon",
        name: "icon",
        type: "Link",
        linkType: "Entry",
        required: false,
        localized: false,
        validations: [{ linkContentType: ["icon"] }],
      },
    ],
  });

  // --------------------------------------------------
  // 5. Video
  // --------------------------------------------------

  await upsertContentType(environment, "video", {
    name: "💎 [Page Section] Video",
    description: "Video content sections for page layouts",
    displayField: "internalName",
    fields: [
      {
        id: "internalName",
        name: "internalName",
        type: "Symbol",
        required: true,
        localized: false,
        validations: [],
      },
      {
        id: "video",
        name: "video",
        type: "Link",
        linkType: "Asset",
        required: true,
        localized: false,
        validations: [{ linkMimetypeGroup: ["video"] }],
      },
      {
        id: "caption",
        name: "caption",
        type: "Symbol",
        required: false,
        localized: false,
        validations: [],
      },
    ],
  });

  // --------------------------------------------------
  // 6. Content Section
  // --------------------------------------------------

  await upsertContentType(environment, "contentSection", {
    name: "💎 [Page Section] Content Section",
    description: "Two-column content layouts with image positioning",
    displayField: "internalName",
    fields: [
      {
        id: "internalName",
        name: "internalName",
        type: "Symbol",
        required: true,
        localized: false,
        validations: [],
      },
      {
        id: "ui",
        name: "ui",
        type: "Symbol",
        required: true,
        localized: false,
        validations: [
          {
            in: [
              "Teaser - Image Fullwidth",
              "Teaser - Image Right",
              "Two Columns - Image Left",
              "Two Columns - Image Right",
              "Portfolio Hero",
              "Retro Window",
              "HeroBanner",
              "SplitContentPanel",
            ],
          },
        ],
      },
      {
        id: "entry",
        name: "entry",
        type: "Link",
        linkType: "Entry",
        required: false,
        localized: false,
        validations: [{ linkContentType: ["article", "contentItem"] }],
      },
    ],
  });

  // --------------------------------------------------
  // 7. Content List
  // --------------------------------------------------

  await upsertContentType(environment, "contentList", {
    name: "💎 [Page Section] Content List",
    description: "Lists of content items with various UI presentations",
    displayField: "internalName",
    fields: [
      {
        id: "internalName",
        name: "internalName",
        type: "Symbol",
        required: true,
        localized: false,
        validations: [],
      },
      {
        id: "ui",
        name: "ui",
        type: "Symbol",
        required: true,
        localized: false,
        validations: [
          {
            in: [
              "Grid - 3 Columns - Small",
              "Grid - 3 Columns - Medium",
              "Grid - 3 Columns - Large",
              "Grid - 4 Columns - Small",
              "Grid - 4 Columns - Medium",
              "Grid - 4 Columns - Large",
              "Carousel with Generic Cards",
              "Tabs with Generic Cards",
              "Tabs with Carousel - Small",
              "Tabs with Carousel - Medium",
              "Tabs with Carousel - Large",
              "Grid with Carousel - 2 Columns",
              "Grid with Carousel - 3 Columns",
              "Comic Accordion",
              "FAQ Section",
              "Neo Timeline",
              "Marquee",
              "Bento Skills Grid",
              "Stacked Deck Showcase",
              "Experience Timeline",
              "Tech Array",
              "TimelineSection",
              "CardGrid",
              "PanelShowcase",
            ],
          },
        ],
      },
      {
        id: "title",
        name: "title",
        type: "Symbol",
        required: false,
        localized: false,
        validations: [],
      },
      {
        id: "description",
        name: "description",
        type: "Text",
        required: false,
        localized: false,
        validations: [],
      },
      {
        id: "entries",
        name: "entries",
        type: "Symbol",
        required: true,
        localized: false,
        validations: [
          { in: ["Articles", "Products", "Collections", "Custom"] },
        ],
      },
      {
        id: "customEntries",
        name: "customEntries",
        type: "Array",
        required: false,
        localized: false,
        items: {
          type: "Link",
          linkType: "Entry",
          validations: [{ linkContentType: ["article", "contentItem"] }],
        },
      },
    ],
  });

  // --------------------------------------------------
  // 8. Page
  // --------------------------------------------------

  await upsertContentType(environment, "page", {
    name: "📜 Page",
    description: "Main page definitions with content areas and SEO",
    displayField: "internalName",
    fields: [
      {
        id: "internalName",
        name: "internalName",
        type: "Symbol",
        required: true,
        localized: false,
        validations: [],
      },
      {
        id: "path",
        name: "path",
        type: "Symbol",
        required: true,
        localized: false,
        validations: [{ unique: true }],
      },
      {
        id: "topContentArea",
        name: "topContentArea",
        type: "Array",
        required: false,
        localized: false,
        items: {
          type: "Link",
          linkType: "Entry",
          validations: [
            { linkContentType: ["contentList", "contentSection", "video"] },
          ],
        },
        validations: [{ size: { max: 10 } }],
      },
      {
        id: "bottomContentArea",
        name: "bottomContentArea",
        type: "Array",
        required: false,
        localized: false,
        items: {
          type: "Link",
          linkType: "Entry",
          validations: [
            { linkContentType: ["contentList", "contentSection", "video"] },
          ],
        },
        validations: [{ size: { max: 8 } }],
      },
      // NEW: SEO Reference Field
      {
        id: "seo",
        name: "seo",
        type: "Link",
        linkType: "Entry",
        required: false,
        localized: false,
        validations: [{ linkContentType: ["seoMetadata"] }],
      },
    ],
  });

  // --------------------------------------------------
  // 9. Config
  // --------------------------------------------------

  await upsertContentType(environment, "config", {
    name: "⚙️ Config",
    description: "Site configuration and URL routing",
    displayField: "internalName",
    fields: [
      {
        id: "internalName",
        name: "internalName",
        type: "Symbol",
        required: true,
        localized: false,
        validations: [],
      },
      {
        id: "slugProductDetailPage",
        name: "slugProductDetailPage",
        type: "Symbol",
        required: true,
        localized: true,
        validations: [],
      },
      {
        id: "slugProductListingPage",
        name: "slugProductListingPage",
        type: "Symbol",
        required: true,
        localized: true,
        validations: [],
      },
      {
        id: "slugArticleDetailPage",
        name: "slugArticleDetailPage",
        type: "Symbol",
        required: true,
        localized: true,
        validations: [],
      },
    ],
  });

  // --------------------------------------------------
  // 10. Layout
  // --------------------------------------------------

  await upsertContentType(environment, "layout", {
    name: "⚙️ Layout",
    description: "Site-wide layout components",
    displayField: "internalName",
    fields: [
      {
        id: "internalName",
        name: "internalName",
        type: "Symbol",
        required: true,
        localized: false,
        validations: [],
      },
      // NEW: Global SEO Fallback Reference Field
      {
        id: "globalSeo",
        name: "globalSeo",
        type: "Link",
        linkType: "Entry",
        required: false,
        localized: false,
        validations: [{ linkContentType: ["seoMetadata"] }],
      },
    ],
  });

  // --------------------------------------------------
  // 11. SEO Metadata
  // --------------------------------------------------

  await upsertContentType(environment, "seoMetadata", {
    name: "🔍 [Metadata] SEO",
    description: "Reusable Next.js SEO metadata configuration",
    displayField: "internalName",
    fields: [
      {
        id: "internalName",
        name: "internalName",
        type: "Symbol",
        required: true,
        localized: false,
        validations: [],
      },
      {
        id: "title",
        name: "title",
        type: "Symbol",
        required: false,
        localized: true, // Often SEO needs localization
        validations: [{ size: { max: 65 } }], // Next.js/Google best practice
      },
      {
        id: "description",
        name: "description",
        type: "Text", // Next.js description is often > 256 chars
        required: false,
        localized: true,
        validations: [{ size: { max: 160 } }],
      },
      {
        id: "tags",
        name: "tags",
        type: "Array",
        required: false,
        localized: false,
        items: { type: "Symbol" },
      },
      {
        id: "progress",
        name: "progress",
        type: "Integer",
        required: false,
        localized: false,
        validations: [{ range: { min: 0, max: 100 } }],
      },
      {
        id: "canonicalUrl",
        name: "canonicalUrl",
        type: "Symbol",
        required: false,
        localized: false,
        validations: [{ regexp: { pattern: "^(http|https):\\/\\/.*" } }],
      },
      {
        id: "noIndex",
        name: "noIndex",
        type: "Boolean",
        required: false,
        localized: false,
      },
      {
        id: "noFollow",
        name: "noFollow",
        type: "Boolean",
        required: false,
        localized: false,
      },
      {
        id: "ogImage",
        name: "ogImage",
        type: "Link",
        linkType: "Entry",
        required: false,
        localized: false,
        validations: [{ linkContentType: ["image"] }],
      },
    ],
  });

  // --------------------------------------------------
  // 12. Icon
  // --------------------------------------------------

  await upsertContentType(environment, "icon", {
    name: "🖼 [Element] Icon",
    description: "React-icons representation with dynamic loading attributes",
    displayField: "internalName",
    fields: [
      {
        id: "internalName",
        name: "internalName",
        type: "Symbol",
        required: true,
        localized: false,
        validations: [],
      },
      {
        id: "name",
        name: "name",
        type: "Symbol",
        required: true,
        localized: false,
        validations: [{ regexp: { pattern: "^[A-Z][a-zA-Z0-9]+$" } }],
      },
      {
        id: "library",
        name: "library",
        type: "Symbol",
        required: false,
        localized: false,
        validations: [],
      },
      {
        id: "title",
        name: "title",
        type: "Symbol",
        required: false,
        localized: false,
        validations: [],
      },
      {
        id: "color",
        name: "color",
        type: "Symbol",
        required: false,
        localized: false,
        validations: [
          { regexp: { pattern: "^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$" } },
        ],
      },
    ],
  });

  console.log("🎉 All content types created/updated successfully!");
}

main().catch(console.error);

```
