/** biome-ignore-all lint/suspicious/noExplicitAny: false */

/**
 * Migrates entries/assets that exist in a source Contentful environment but
 * are missing from a target environment, per `.contentful-audit/report.json`
 * (produced by `audit-environment-content.ts`).
 *
 * Policy (see docs/contentful/environment-migration.md):
 *   - Only entries flagged "missingInTarget" in the audit report are created.
 *   - "diverged" / "inSync" / "targetOnly" entries are NEVER touched — the
 *     target environment is authoritative for anything it already has.
 *   - Only fields present in BOTH the source and target content type are
 *     copied; source-only fields are dropped (logged), target-only fields
 *     are left empty on the new entry.
 *   - Linked entries/assets are migrated recursively so references resolve,
 *     even if they weren't flagged missing at the top level (e.g. a
 *     dependency of a missing entry that the audit didn't walk into).
 *
 * Safety: dry-run by default. Nothing is written to Contentful unless
 * --apply is passed. Re-running is idempotent — anything that already
 * exists in the target is skipped.
 *
 * Usage:
 *   npx tsx src/contentful/scripts/audit-environment-content.ts --source=production --target=development
 *   npx tsx src/contentful/scripts/migrate-missing-content.ts --source=production --target=development           # dry run
 *   npx tsx src/contentful/scripts/migrate-missing-content.ts --source=production --target=development --apply   # writes
 */

import { existsSync, readFileSync } from "node:fs";
import { config } from "dotenv";

config({ path: ".env.local" });

const contentfulManagement = require("contentful-management");

function parseArg(name: string, fallback: string): string {
  const prefix = `--${name}=`;
  const match = process.argv.find((a) => a.startsWith(prefix));
  return match ? match.slice(prefix.length) : fallback;
}

const APPLY = process.argv.includes("--apply");

async function fieldIntersection(
  source: any,
  target: any,
  contentTypeId: string
) {
  const sourceCt = await source.getContentType(contentTypeId);
  let targetCt: any = null;
  try {
    targetCt = await target.getContentType(contentTypeId);
  } catch {
    return { common: [], targetExists: false };
  }
  const targetFieldIds = new Set(targetCt.fields.map((f: any) => f.id));
  const common = sourceCt.fields
    .map((f: any) => f.id)
    .filter((id: string) => targetFieldIds.has(id));
  return { common, targetExists: true };
}

async function waitForProcessing(target: any, assetId: string) {
  for (let attempt = 0; attempt < 20; attempt++) {
    const asset = await target.getAsset(assetId);
    const file = asset.fields.file?.["en-US"];
    if (file?.url) {
      return asset;
    }
    await new Promise((r) => setTimeout(r, 1500));
  }
  throw new Error(`Asset ${assetId} did not finish processing in time`);
}

async function migrateAsset(
  source: any,
  target: any,
  assetId: string,
  log: string[]
) {
  try {
    await target.getAsset(assetId);
    return; // already exists, nothing to do
  } catch {
    // not present in target — migrate it
  }

  const sourceAsset = await source.getAsset(assetId);
  const fields: any = {};
  for (const [key, value] of Object.entries(sourceAsset.fields)) {
    if (key === "file") {
      const file = (value as any)["en-US"];
      fields.file = {
        "en-US": {
          contentType: file.contentType,
          fileName: file.fileName,
          upload: `https:${file.url}`,
        },
      };
    } else {
      fields[key] = value;
    }
  }

  log.push(`[asset] create ${assetId} (${fields.file?.["en-US"]?.fileName})`);
  if (!APPLY) {
    return;
  }

  const created = await target.createAssetWithId(assetId, { fields });
  await created.processForAllLocales();
  const processed = await waitForProcessing(target, assetId);
  await processed.publish();
}

function collectLinks(fields: any): { entries: string[]; assets: string[] } {
  const entries: string[] = [];
  const assets: string[] = [];

  function walk(node: any) {
    if (!node || typeof node !== "object") {
      return;
    }
    if (node.sys?.type === "Link") {
      if (node.sys.linkType === "Entry") {
        entries.push(node.sys.id);
      } else if (node.sys.linkType === "Asset") {
        assets.push(node.sys.id);
      }
      return;
    }
    if (Array.isArray(node)) {
      for (const item of node) {
        walk(item);
      }
      return;
    }
    for (const value of Object.values(node)) {
      walk(value);
    }
  }

  for (const localeValue of Object.values(fields)) {
    walk(localeValue);
  }

  return { entries, assets };
}

async function migrateEntry(
  source: any,
  target: any,
  contentTypeId: string,
  entryId: string,
  log: string[],
  visited: Set<string>
) {
  if (visited.has(entryId)) {
    return;
  }
  visited.add(entryId);

  try {
    await target.getEntry(entryId);
    return; // already exists in target — do not touch it
  } catch {
    // not present — proceed with migration
  }

  const sourceEntry = await source.getEntry(entryId);
  const { common, targetExists } = await fieldIntersection(
    source,
    target,
    contentTypeId
  );
  if (!targetExists) {
    log.push(
      `[skip] ${contentTypeId}/${entryId}: content type "${contentTypeId}" does not exist in target`
    );
    return;
  }

  const droppedFields = Object.keys(sourceEntry.fields).filter(
    (f) => !common.includes(f)
  );
  const mappedFields: any = {};
  for (const fieldId of common) {
    if (sourceEntry.fields[fieldId] !== undefined) {
      mappedFields[fieldId] = sourceEntry.fields[fieldId];
    }
  }

  // Migrate dependencies first so links resolve when this entry is created.
  const { entries: linkedEntries, assets: linkedAssets } =
    collectLinks(mappedFields);

  for (const assetId of linkedAssets) {
    await migrateAsset(source, target, assetId, log);
  }

  for (const linkedEntryId of linkedEntries) {
    const linkedSourceEntry = await source.getEntry(linkedEntryId);
    await migrateEntry(
      source,
      target,
      linkedSourceEntry.sys.contentType.sys.id,
      linkedEntryId,
      log,
      visited
    );
  }

  log.push(
    `[entry] create ${contentTypeId}/${entryId}${
      droppedFields.length
        ? ` (dropped fields not in target schema: ${droppedFields.join(", ")})`
        : ""
    }`
  );

  if (!APPLY) {
    return;
  }

  const created = await target.createEntryWithId(contentTypeId, entryId, {
    fields: mappedFields,
  });
  await created.publish();
}

async function main() {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN;

  if (!(spaceId && accessToken)) {
    console.error("Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN");
    process.exit(1);
  }

  const sourceEnvId = parseArg("source", "production");
  const targetEnvId = parseArg("target", "development");

  if (!existsSync(".contentful-audit/report.json")) {
    console.error(
      "No audit report found. Run audit-environment-content.ts first."
    );
    process.exit(1);
  }
  const report = JSON.parse(
    readFileSync(".contentful-audit/report.json", "utf-8")
  );

  const client = contentfulManagement.createClient(
    { accessToken },
    { type: "legacy" }
  );
  const space = await client.getSpace(spaceId);
  const source = await space.getEnvironment(sourceEnvId);
  const target = await space.getEnvironment(targetEnvId);

  console.log(
    `${APPLY ? "APPLYING" : "DRY RUN"}: migrating missing content "${sourceEnvId}" -> "${targetEnvId}"`
  );

  const log: string[] = [];
  const visited = new Set<string>();

  for (const audit of report.audits) {
    const missing = audit.entries.filter(
      (e: any) => e.status === "missingInTarget"
    );
    for (const e of missing) {
      await migrateEntry(source, target, audit.contentType, e.id, log, visited);
    }
  }

  console.log(
    log.length
      ? log.join("\n")
      : "Nothing to migrate — target is already up to date."
  );
  if (!APPLY && log.length) {
    console.log("\nDry run only. Re-run with --apply to write these changes.");
  }
}

main();
