/** biome-ignore-all lint/suspicious/noExplicitAny: false */

import "dotenv/config";

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
    process.env.CONTENTFUL_ENVIRONMENT || "development"
  );

  const richTextValidation = [
    {
      enabledMarks: ["bold", "italic", "underline", "code"],
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
        "hyperlink",
      ],
    },
  ];

  // --------------------------------------------------
  // 1. Core Elements (Icon, Image, Link)
  // --------------------------------------------------
  await upsertContentType(environment, "icon", {
    name: "🖼 [Element] Icon",
    description: "Icon representation",
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
        validations: [],
      },
      {
        id: "iconCode",
        name: "iconCode",
        type: "Symbol",
        required: false,
        localized: false,
        validations: [],
      },
      {
        id: "showTooltip",
        name: "showTooltip",
        type: "Boolean",
        required: false,
        localized: false,
        validations: [],
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
  // 1.5. Badge (Distinct sub-item type)
  // --------------------------------------------------
  await upsertContentType(environment, "badge", {
    name: "🖼 [Element] Badge",
    description: "Lightweight item for tags and skills (no sub-items)",
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
        id: "icon",
        name: "icon",
        type: "Link",
        linkType: "Entry",
        required: false,
        localized: false,
        validations: [{ linkContentType: ["icon"] }],
      },
      {
        id: "progress",
        name: "progress",
        type: "Integer",
        required: false,
        localized: false,
        validations: [{ range: { min: 0, max: 100 } }],
      },
    ],
  });

  // --------------------------------------------------
  // 2. Content Item (Flexible entity)
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
        id: "subtitle",
        name: "subtitle",
        type: "Symbol",
        required: false,
        localized: false,
        validations: [],
      }, // For company, position
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
        id: "startDate",
        name: "startDate",
        type: "Date",
        required: false,
        localized: false,
        validations: [],
      },
      {
        id: "endDate",
        name: "endDate",
        type: "Date",
        required: false,
        localized: false,
        validations: [],
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
        id: "icon",
        name: "icon",
        type: "Link",
        linkType: "Entry",
        required: false,
        localized: false,
        validations: [{ linkContentType: ["icon"] }],
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
      },
      // To support nested items like SkillGroups in a SkillSet, or TechStack in an Experience
      {
        id: "subItems",
        name: "subItems",
        type: "Array",
        required: false,
        localized: false,
        items: {
          type: "Link",
          linkType: "Entry",
          validations: [{ linkContentType: ["badge"] }],
        },
      },
      // Metadata tags
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
    ],
  });

  // --------------------------------------------------
  // 3. Content List & Sections
  // --------------------------------------------------
  await upsertContentType(environment, "contentList", {
    name: "💎 [Page Section] Content List",
    description: "Lists of content items for pages (e.g., Timeline, Grid)",
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
              "Grid",
              "Carousel",
              "Project Showcase",
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
          {
            in: [
              "Articles",
              "Products",
              "Collections",
              "Custom",
              "Experience",
              "Skills",
              "Projects",
            ],
          },
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
          validations: [{ linkContentType: ["contentItem"] }],
        },
      },
    ],
  });

  // --------------------------------------------------
  // 3.5. Content Section
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
        validations: [{ linkContentType: ["contentItem"] }],
      },
    ],
  });

  // --------------------------------------------------
  // 4. Page Structure
  // --------------------------------------------------
  await upsertContentType(environment, "page", {
    name: "📜 [Assembly] Page",
    description: "Main page definitions",
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
        id: "title",
        name: "title",
        type: "Symbol",
        required: true,
        localized: false,
        validations: [],
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
          validations: [{ linkContentType: ["contentList", "contentSection"] }],
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
          validations: [{ linkContentType: ["contentList", "contentSection"] }],
        },
        validations: [{ size: { max: 8 } }],
      },
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
  // 5. Layout & SEO & Config
  // --------------------------------------------------
  await upsertContentType(environment, "seoMetadata", {
    name: "🔍 [Metadata] SEO",
    description: "SEO configuration",
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
        id: "keywords",
        name: "keywords",
        type: "Array",
        required: false,
        localized: false,
        items: { type: "Symbol" },
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
        validations: [],
      },
      {
        id: "noFollow",
        name: "noFollow",
        type: "Boolean",
        required: false,
        localized: false,
        validations: [],
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

  await upsertContentType(environment, "layout", {
    name: "⚙️ Layout",
    description: "Site-wide configuration (formerly AppData)",
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
        id: "role",
        name: "role",
        type: "Symbol",
        required: false,
        localized: false,
        validations: [],
      },
      {
        id: "resume",
        name: "resume",
        type: "Link",
        linkType: "Asset",
        required: false,
        localized: false,
        validations: [],
      },
      {
        id: "globalSeo",
        name: "globalSeo",
        type: "Link",
        linkType: "Entry",
        required: false,
        localized: false,
        validations: [{ linkContentType: ["seoMetadata"] }],
      },
      {
        id: "defaultTheme",
        name: "defaultTheme",
        type: "Symbol",
        required: false,
        localized: false,
        validations: [],
      },
      {
        id: "themeList",
        name: "themeList",
        type: "Array",
        required: false,
        localized: false,
        items: { type: "Symbol" },
      },
      {
        id: "logo",
        name: "logo",
        type: "Link",
        linkType: "Asset",
        required: false,
        localized: false,
        validations: [{ linkMimetypeGroup: ["image"] }],
      },
      {
        id: "email",
        name: "email",
        type: "Symbol",
        required: false,
        localized: false,
        validations: [],
      },
      {
        id: "footerText",
        name: "footerText",
        type: "Symbol",
        required: false,
        localized: false,
        validations: [],
      },
      {
        id: "resumeIcon",
        name: "resumeIcon",
        type: "Link",
        linkType: "Entry",
        required: false,
        localized: false,
        validations: [{ linkContentType: ["icon"] }],
      },
      {
        id: "themeIcon",
        name: "themeIcon",
        type: "Link",
        linkType: "Entry",
        required: false,
        localized: false,
        validations: [{ linkContentType: ["icon"] }],
      },
      {
        id: "drawerVariant",
        name: "drawerVariant",
        type: "Symbol",
        required: false,
        localized: false,
        validations: [],
      },
      {
        id: "drawerSide",
        name: "drawerSide",
        type: "Symbol",
        required: false,
        localized: false,
        validations: [],
      },
      {
        id: "navigation",
        name: "navigation",
        type: "Link",
        linkType: "Entry",
        required: false,
        localized: false,
        validations: [{ linkContentType: ["contentList"] }],
      },
    ],
  });

  console.log("🎉 All composable content types created/updated successfully!");
}

main().catch(console.error);
