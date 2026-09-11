/** biome-ignore-all lint/suspicious/noExplicitAny: Contentful Management SDK has no usable generics here */

/**
 * One-time content migration: converts the flat `tags` string arrays on
 * `contentItem` entries feeding a `TimelineSection` (`contentList.ui ===
 * "TimelineSection"`) into real `subItems` (StatItem/badge) links, so
 * TimelineEntry renders its tech-stack meta row as a TechBadgeCloud instead
 * of the comma-joined text fallback. See ADR 0026.
 *
 * For each tag on each qualifying entry:
 *   1. Find an existing `icon` entry whose `name` matches the tag
 *      (case-insensitive), else create one from TAG_ICON_MAP below.
 *   2. Find or create a `statItem` entry titled after the tag, linking that
 *      icon. Reused across entries that share the same tag (e.g. multiple
 *      experiences using "React") rather than duplicated per entry.
 *   3. Link the statItem into the contentItem's `subItems` array, preserving
 *      field order to match the original `tags` order.
 *
 * `tags` itself is left untouched — the adapter already prefers `subItems`
 * over `tags` when both are present, so nothing regresses if this migration
 * only partially covers an entry's tags (see the "no mapping" skip below).
 *
 * Safety: dry-run by default. Nothing is written to Contentful unless
 * --apply is passed. Re-running is idempotent — an entry that already has
 * non-empty `subItems` is left alone entirely, and existing icon/statItem
 * entries are reused rather than duplicated.
 *
 * Usage:
 *   npx tsx src/contentful/scripts/migrate-timeline-tech-badges.ts            # dry run
 *   npx tsx src/contentful/scripts/migrate-timeline-tech-badges.ts --apply    # writes
 */

import { config } from "dotenv";

config({ path: ".env.local" });

const contentfulManagement = require("contentful-management");

const APPLY = process.argv.includes("--apply");
const LOCALE = "en-US";

/**
 * Canonical mapping from a tag string (as authored today) to the icon it
 * should resolve to, matched against `src/components/elements/ui/icon/
 * icon-map.ts`'s curated registry. Extend this when a new tag shows up that
 * isn't covered by an existing Contentful `icon` entry.
 */
const TAG_ICON_MAP: Record<string, { iconCode: string; library: string }> = {
  React: { iconCode: "fa/FaReact", library: "fa" },
  NextJs: { iconCode: "ri/RiNextjsFill", library: "ri" },
  "Tailwind CSS": { iconCode: "si/SiTailwindcss", library: "si" },
  Shadcn: { iconCode: "si/SiShadcnui", library: "si" },
  Storybook: { iconCode: "si/SiStorybook", library: "si" },
  Turborepo: { iconCode: "si/SiTurborepo", library: "si" },
  Vitest: { iconCode: "si/SiVitest", library: "si" },
  "Azure Devops": { iconCode: "vsc/VscAzureDevops", library: "vsc" },
  CSS3: { iconCode: "io/IoLogoCss3", library: "io" },
  Typescript: { iconCode: "si/SiTypescript", library: "si" },
  Bootstrap: { iconCode: "fa/FaBootstrap", library: "fa" },
  GitHub: { iconCode: "fa/FaGithub", library: "fa" },
  Vue: { iconCode: "fa/FaVuejs", library: "fa" },
  SCSS: { iconCode: "fa/FaSass", library: "fa" },
  Angular: { iconCode: "si/SiAngular", library: "si" },
  Jest: { iconCode: "si/SiJest", library: "si" },
  Javascript: { iconCode: "si/SiJavascript", library: "si" },
  Strapi: { iconCode: "si/SiStrapi", library: "si" },
};

function log(line: string, lines: string[]) {
  lines.push(line);
  console.log(line);
}

async function findIconEntryIdByName(
  environment: any,
  name: string
): Promise<string | null> {
  const res = await environment.getEntries({
    content_type: "icon",
    limit: 1000,
  });
  const match = res.items.find(
    (item: any) =>
      String(item.fields.name?.[LOCALE] || "").toLowerCase() ===
      name.toLowerCase()
  );
  return match ? match.sys.id : null;
}

async function getOrCreateIcon(
  environment: any,
  tag: string,
  lines: string[]
): Promise<string> {
  const existingId = await findIconEntryIdByName(environment, tag);
  if (existingId) {
    return existingId;
  }

  const spec = TAG_ICON_MAP[tag];
  if (!spec) {
    throw new Error(
      `No icon entry and no TAG_ICON_MAP fallback for tag "${tag}" — add one before running.`
    );
  }

  log(`[icon] create "${tag}" -> ${spec.iconCode}`, lines);
  if (!APPLY) {
    return `dry-run-icon-${tag}`;
  }

  const created = await environment.createEntry("icon", {
    fields: {
      internalName: { [LOCALE]: `${tag} Icon` },
      name: { [LOCALE]: tag },
      iconCode: { [LOCALE]: spec.iconCode },
      library: { [LOCALE]: spec.library },
      showTooltip: { [LOCALE]: true },
    },
  });
  await created.publish();
  return created.sys.id;
}

async function findStatItemEntryIdByTitle(
  environment: any,
  title: string
): Promise<string | null> {
  const res = await environment.getEntries({
    content_type: "statItem",
    limit: 1000,
  });
  const match = res.items.find(
    (item: any) =>
      String(item.fields.title?.[LOCALE] || "").toLowerCase() ===
      title.toLowerCase()
  );
  return match ? match.sys.id : null;
}

async function getOrCreateStatItem(
  environment: any,
  tag: string,
  iconEntryId: string,
  lines: string[]
): Promise<string> {
  const existingId = await findStatItemEntryIdByTitle(environment, tag);
  if (existingId) {
    return existingId;
  }

  log(`[statItem] create "${tag}" badge (icon ${iconEntryId})`, lines);
  if (!APPLY) {
    return `dry-run-statitem-${tag}`;
  }

  const created = await environment.createEntry("statItem", {
    fields: {
      internalName: { [LOCALE]: `${tag} — Tech Stack Badge` },
      title: { [LOCALE]: tag },
      icons: {
        [LOCALE]: [
          { sys: { type: "Link", linkType: "Entry", id: iconEntryId } },
        ],
      },
    },
  });
  await created.publish();
  return created.sys.id;
}

async function migrateContentItem(
  environment: any,
  entryId: string,
  lines: string[],
  statItemCache: Map<string, string>
) {
  const entry = await environment.getEntry(entryId);
  const title = entry.fields.title?.[LOCALE] || entryId;
  const tags: string[] = entry.fields.tags?.[LOCALE] || [];
  const existingSubItems = entry.fields.subItems?.[LOCALE] || [];

  if (existingSubItems.length > 0) {
    log(`[skip] "${title}": subItems already populated`, lines);
    return;
  }
  if (tags.length === 0) {
    log(`[skip] "${title}": no tags to migrate`, lines);
    return;
  }

  const statItemIds: string[] = [];
  for (const tag of tags) {
    let statItemId = statItemCache.get(tag);
    if (!statItemId) {
      const iconEntryId = await getOrCreateIcon(environment, tag, lines);
      statItemId = await getOrCreateStatItem(
        environment,
        tag,
        iconEntryId,
        lines
      );
      statItemCache.set(tag, statItemId);
    }
    statItemIds.push(statItemId);
  }

  log(`[entry] "${title}": link subItems -> [${tags.join(", ")}]`, lines);
  if (!APPLY) {
    return;
  }

  entry.fields.subItems = {
    [LOCALE]: statItemIds.map((id) => ({
      sys: { type: "Link", linkType: "Entry", id },
    })),
  };
  const updated = await entry.update();
  await updated.publish();
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
    `${APPLY ? "APPLYING" : "DRY RUN"}: migrating tags -> subItems on environment "${environmentId}"`
  );

  // Matches both "TimelineSection" and "TimelineSectionWithBadges" — the
  // latter was introduced by ADR 0026 *after* this script's original run,
  // by switching existing lists' `ui` value post-migration. An exact-match
  // filter on "TimelineSection" alone stops finding any qualifying list the
  // moment it's been switched to the WithBadges variant, silently turning
  // every subsequent run of this script into a no-op.
  const timelineLists = await environment.getEntries({
    content_type: "contentList",
    "fields.ui[in]": "TimelineSection,TimelineSectionWithBadges",
    limit: 100,
  });

  const lines: string[] = [];
  const statItemCache = new Map<string, string>();
  const visitedEntries = new Set<string>();

  for (const list of timelineLists.items) {
    const customEntries = list.fields.customEntries?.[LOCALE] || [];
    for (const link of customEntries) {
      const entryId = link.sys.id;
      if (visitedEntries.has(entryId)) {
        continue;
      }
      visitedEntries.add(entryId);
      await migrateContentItem(environment, entryId, lines, statItemCache);
    }
  }

  if (!APPLY) {
    console.log("\nDry run only. Re-run with --apply to write these changes.");
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
