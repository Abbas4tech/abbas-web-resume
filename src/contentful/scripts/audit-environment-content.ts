/** biome-ignore-all lint/suspicious/noExplicitAny: false */

/**
 * Read-only audit that diffs entries between two Contentful environments in
 * the same space, by sys.id, so a migration plan can be built before any
 * write happens. Never mutates Contentful — safe to re-run at any time.
 *
 * Usage:
 *   npx tsx src/contentful/scripts/audit-environment-content.ts [--source=production] [--target=development]
 *
 * Output:
 *   .contentful-audit/report.json   — full machine-readable diff
 *   .contentful-audit/report.md     — human-readable summary
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { config } from "dotenv";

config({ path: ".env.local" });

const contentfulManagement = require("contentful-management");

interface EntryDiff {
  contentType: string;
  fieldDiffs?: Record<string, { source: unknown; target: unknown }>;
  id: string;
  sourceUpdatedAt?: string;
  status: "missingInTarget" | "diverged" | "inSync" | "targetOnly";
  targetUpdatedAt?: string;
}

interface ContentTypeAudit {
  contentType: string;
  entries: EntryDiff[];
  sourceOnlyFields: string[];
  targetOnlyFields: string[];
}

function parseArg(name: string, fallback: string): string {
  const prefix = `--${name}=`;
  const match = process.argv.find((a) => a.startsWith(prefix));
  return match ? match.slice(prefix.length) : fallback;
}

function fieldValueEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a ?? null) === JSON.stringify(b ?? null);
}

async function getAllEntries(environment: any, contentType: string) {
  const all: any[] = [];
  const pageSize = 100;
  let skip = 0;
  for (;;) {
    const page = await environment.getEntries({
      content_type: contentType,
      limit: pageSize,
      skip,
    });
    all.push(...page.items);
    if (all.length >= page.total) {
      break;
    }
    skip += pageSize;
  }
  return all;
}

async function auditContentType(
  source: any,
  target: any,
  ct: any
): Promise<ContentTypeAudit> {
  const contentTypeId = ct.sys.id;

  let targetCt: any = null;
  try {
    targetCt = await target.getContentType(contentTypeId);
  } catch {
    // content type doesn't exist in target at all
  }

  const sourceFieldIds = ct.fields.map((f: any) => f.id);
  const targetFieldIds: string[] = targetCt
    ? targetCt.fields.map((f: any) => f.id)
    : [];

  const sourceOnlyFields = sourceFieldIds.filter(
    (f: string) => !targetFieldIds.includes(f)
  );
  const targetOnlyFields = targetFieldIds.filter(
    (f: string) => !sourceFieldIds.includes(f)
  );

  const sourceEntries = await getAllEntries(source, contentTypeId);
  const targetEntries = targetCt
    ? await getAllEntries(target, contentTypeId)
    : [];
  const targetById = new Map(targetEntries.map((e: any) => [e.sys.id, e]));
  const commonFields = sourceFieldIds.filter((f: string) =>
    targetFieldIds.includes(f)
  );

  const entryDiffs: EntryDiff[] = [];

  for (const sourceEntry of sourceEntries) {
    const id = sourceEntry.sys.id;
    const targetEntry = targetById.get(id);

    if (!targetEntry) {
      entryDiffs.push({
        id,
        contentType: contentTypeId,
        status: "missingInTarget",
        sourceUpdatedAt: sourceEntry.sys.updatedAt,
      });
      continue;
    }

    const fieldDiffs: Record<string, { source: unknown; target: unknown }> = {};
    for (const fieldId of commonFields) {
      const sourceVal = sourceEntry.fields?.[fieldId]?.["en-US"];
      const targetVal = targetEntry.fields?.[fieldId]?.["en-US"];
      if (!fieldValueEqual(sourceVal, targetVal)) {
        fieldDiffs[fieldId] = { source: sourceVal, target: targetVal };
      }
    }

    entryDiffs.push({
      id,
      contentType: contentTypeId,
      status: Object.keys(fieldDiffs).length > 0 ? "diverged" : "inSync",
      sourceUpdatedAt: sourceEntry.sys.updatedAt,
      targetUpdatedAt: targetEntry.sys.updatedAt,
      ...(Object.keys(fieldDiffs).length > 0 ? { fieldDiffs } : {}),
    });
  }

  const sourceIds = new Set(sourceEntries.map((e: any) => e.sys.id));
  for (const targetEntry of targetEntries) {
    if (!sourceIds.has(targetEntry.sys.id)) {
      entryDiffs.push({
        id: targetEntry.sys.id,
        contentType: contentTypeId,
        status: "targetOnly",
        targetUpdatedAt: targetEntry.sys.updatedAt,
      });
    }
  }

  return {
    contentType: contentTypeId,
    sourceOnlyFields,
    targetOnlyFields,
    entries: entryDiffs,
  };
}

function buildReportMarkdown(
  sourceEnvId: string,
  targetEnvId: string,
  audits: ContentTypeAudit[]
): string[] {
  const lines: string[] = [
    `# Content Audit: ${sourceEnvId} -> ${targetEnvId}`,
    "",
  ];

  for (const audit of audits) {
    const missing = audit.entries.filter((e) => e.status === "missingInTarget");
    const diverged = audit.entries.filter((e) => e.status === "diverged");
    const inSync = audit.entries.filter((e) => e.status === "inSync");
    const targetOnly = audit.entries.filter((e) => e.status === "targetOnly");

    lines.push(`## ${audit.contentType}`);
    if (audit.sourceOnlyFields.length) {
      lines.push(
        `- Fields only in ${sourceEnvId}: ${audit.sourceOnlyFields.join(", ")}`
      );
    }
    if (audit.targetOnlyFields.length) {
      lines.push(
        `- Fields only in ${targetEnvId}: ${audit.targetOnlyFields.join(", ")}`
      );
    }
    lines.push(
      `- missingInTarget: ${missing.length} | diverged: ${diverged.length} | inSync: ${inSync.length} | targetOnly: ${targetOnly.length}`
    );
    for (const e of missing) {
      lines.push(`  - [MISSING] ${e.id}`);
    }
    for (const e of diverged) {
      lines.push(
        `  - [DIVERGED] ${e.id}: ${Object.keys(e.fieldDiffs ?? {}).join(", ")}`
      );
    }
    lines.push("");
  }

  return lines;
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

  const client = contentfulManagement.createClient(
    { accessToken },
    { type: "legacy" }
  );
  const space = await client.getSpace(spaceId);
  const source = await space.getEnvironment(sourceEnvId);
  const target = await space.getEnvironment(targetEnvId);

  console.log(`Auditing "${sourceEnvId}" -> "${targetEnvId}" ...`);

  const sourceContentTypes = (await source.getContentTypes()).items;

  const audits: ContentTypeAudit[] = [];
  for (const ct of sourceContentTypes) {
    audits.push(await auditContentType(source, target, ct));
  }

  mkdirSync(".contentful-audit", { recursive: true });
  writeFileSync(
    ".contentful-audit/report.json",
    JSON.stringify({ sourceEnvId, targetEnvId, audits }, null, 2)
  );

  const lines = buildReportMarkdown(sourceEnvId, targetEnvId, audits);
  writeFileSync(".contentful-audit/report.md", lines.join("\n"));

  console.log(`\n${lines.join("\n")}`);
  console.log(
    "\nFull report written to .contentful-audit/report.json and .contentful-audit/report.md"
  );
}

main();
