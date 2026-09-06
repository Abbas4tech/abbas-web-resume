/**
 * Moves `favicon` from the `layout` content type to the `seoMetadata` content
 * type, so favicon can vary per page instead of being one site-wide value.
 *
 * `seoMetadata.favicon` must already exist on the live content type before
 * this runs (added via setup-content-model.ts / `pnpm contentful:setup`).
 *
 * Steps:
 *   1. Read the current Layout entry's favicon asset link.
 *   2. Copy that asset link onto every Page's linked SeoMetadata entry that
 *      doesn't already have its own favicon set (preserves today's visual
 *      behavior — every page keeps showing the same favicon it does now —
 *      while leaving each entry independently editable going forward).
 *   3. Omit, then delete, the `favicon` field from the `layout` content type.
 *      Contentful requires the two-step omit-then-delete sequence for
 *      removing a field that has existing data; a single-step removal is
 *      rejected by the API.
 *
 * Safety: dry-run by default. Nothing is written to Contentful unless
 * --apply is passed.
 *
 * Usage:
 *   npx tsx src/contentful/scripts/migrate-favicon-to-seo.ts            # dry run
 *   npx tsx src/contentful/scripts/migrate-favicon-to-seo.ts --apply    # writes
 */

import { config } from "dotenv";

config({ path: ".env.local" });

const contentfulManagement = require("contentful-management");

const APPLY = process.argv.includes("--apply");

function log(line: string): void {
  console.log(`${APPLY ? "[APPLY]" : "[DRY RUN]"} ${line}`);
}

async function main() {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
  const environmentId = process.env.CONTENTFUL_ENVIRONMENT || "development";

  if (!(spaceId && accessToken)) {
    console.error("Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN");
    process.exit(1);
  }

  const client = contentfulManagement.createClient(
    { accessToken },
    { type: "legacy" }
  );
  const space = await client.getSpace(spaceId);
  const environment = await space.getEnvironment(environmentId);

  console.log(
    `${APPLY ? "APPLYING" : "DRY RUN"}: migrating layout.favicon -> seoMetadata.favicon in "${spaceId}"/"${environmentId}"`
  );

  // 1. Read Layout's current favicon.
  const layoutEntries = await environment.getEntries({
    content_type: "layout",
    limit: 1,
  });
  const layoutEntry = layoutEntries.items[0];
  if (!layoutEntry) {
    console.error("No Layout entry found — nothing to migrate.");
    process.exit(1);
  }

  const faviconLink = layoutEntry.fields.favicon?.["en-US"];
  if (faviconLink) {
    log(
      `Found layout.favicon -> asset ${faviconLink.sys.id}. Copying onto page SEO entries without their own favicon.`
    );
  } else {
    log("Layout entry has no favicon set — skipping data copy step.");
  }

  // 2. Copy onto every Page's linked SeoMetadata entry, unless it already has one.
  const pageEntries = await environment.getEntries({
    content_type: "page",
    limit: 20,
  });

  for (const page of pageEntries.items) {
    const seoLink = page.fields.seo?.["en-US"];
    const pagePath = page.fields.path?.["en-US"] || page.sys.id;
    if (!seoLink) {
      log(`Page "${pagePath}" has no linked SEO entry — skipping.`);
      continue;
    }
    if (!faviconLink) {
      continue;
    }

    const seoEntry = await environment.getEntry(seoLink.sys.id);
    if (seoEntry.fields.favicon?.["en-US"]) {
      log(
        `SEO entry "${seoEntry.fields.internalName?.["en-US"]}" (page "${pagePath}") already has its own favicon — leaving it as-is.`
      );
      continue;
    }

    log(
      `Setting favicon on SEO entry "${seoEntry.fields.internalName?.["en-US"]}" (page "${pagePath}").`
    );
    if (APPLY) {
      seoEntry.fields.favicon = { "en-US": faviconLink };
      const updated = await seoEntry.update();
      await updated.publish();
    }
  }

  // 3. Omit, then delete, layout.favicon.
  log("Omitting layout.favicon field...");
  if (APPLY) {
    const contentType = await environment.getContentType("layout");
    const fields = contentType.fields.map((field: { id: string }) =>
      field.id === "favicon" ? { ...field, omitted: true } : field
    );
    contentType.fields = fields;
    const updated = await contentType.update();
    await updated.publish();
  }

  log("Deleting layout.favicon field...");
  if (APPLY) {
    const contentTypeAfterOmit = await environment.getContentType("layout");
    const remainingFields = contentTypeAfterOmit.fields.filter(
      (field: { id: string }) => field.id !== "favicon"
    );
    contentTypeAfterOmit.fields = remainingFields;
    const updatedAfterDelete = await contentTypeAfterOmit.update();
    await updatedAfterDelete.publish();
  }

  log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
