/** biome-ignore-all lint/suspicious/noExplicitAny: false */

/**
 * Transforms .contentful-audit/legacy-extract.json (produced by
 * extract-legacy-content.ts) into the new composable schema and writes it
 * into the target Contentful space. Implements the mapping rules in
 * docs/contentful/legacy-space-migration-field-mapping.md (see ADR-0019).
 *
 * Safety: dry-run by default. Nothing is written to Contentful unless
 * --apply is passed. Not idempotent by entry ID (the target space starts
 * empty for this content) — re-running with --apply creates duplicates, so
 * only run it once against a given environment.
 *
 * Usage:
 *   npx tsx src/contentful/scripts/extract-legacy-content.ts               # refresh the extract first
 *   npx tsx src/contentful/scripts/migrate-legacy-content.ts                # dry run
 *   npx tsx src/contentful/scripts/migrate-legacy-content.ts --apply        # writes
 */

import { existsSync, readFileSync } from "node:fs";
import { config } from "dotenv";

config({ path: ".env.local" });

const contentfulManagement = require("contentful-management");

const APPLY = process.argv.includes("--apply");
const EXTRACT_PATH = ".contentful-audit/legacy-extract.json";

const DAISY_THEMES = new Set([
  "light",
  "dark",
  "cupcake",
  "dracula",
  "night",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "cmyk",
  "autumn",
  "business",
  "coffee",
  "winter",
  "caramellatte",
  "abyss",
  "silk",
]);
const DRAWER_VARIANTS = new Set(["default", "dock-on-mobile"]);
const DRAWER_SIDES = new Set(["left", "right"]);

// Platform name (legacy Banner.socialLinksCollection[].title) -> react-icon,
// verified against src/components/elements/ui/icon/icon-map.ts's curated
// registry. FaLinkedin/FaDiscord were added to that registry as part of this
// migration (they weren't previously referenced by any on-site content).
const SOCIAL_ICON_MAP: Record<string, { iconCode: string; name: string }> = {
  github: { iconCode: "fa/FaGithub", name: "FaGithub" },
  gmail: { iconCode: "si/SiGmail", name: "SiGmail" },
  email: { iconCode: "si/SiGmail", name: "SiGmail" },
  linkedin: { iconCode: "fa/FaLinkedin", name: "FaLinkedin" },
  discord: { iconCode: "fa/FaDiscord", name: "FaDiscord" },
};

interface LegacyIcon {
  classes?: string[] | null;
  iconCode?: string | null;
  name?: string | null;
  showTooltip?: boolean | null;
}

interface LegacyAsset {
  description?: string | null;
  fileName?: string | null;
  height?: number | null;
  title?: string | null;
  url: string;
  width?: number | null;
}

interface Ctx {
  assetCache: Map<string, any>;
  iconCache: Map<string, any>;
  imageCache: Map<string, any>;
  logLines: string[];
  target: any;
}

function log(ctx: Ctx, message: string) {
  ctx.logLines.push(message);
  console.log(message);
}

function guessMimeType(fileName: string | null | undefined): string {
  const ext = (fileName || "").split(".").pop()?.toLowerCase();
  const map: Record<string, string> = {
    png: "image/png",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    gif: "image/gif",
    svg: "image/svg+xml",
    webp: "image/webp",
    pdf: "application/pdf",
  };
  return map[ext || ""] || "application/octet-stream";
}

async function uploadAsset(
  ctx: Ctx,
  url: string,
  fileName: string | null | undefined,
  title: string | null | undefined
): Promise<any> {
  const cached = ctx.assetCache.get(url);
  if (cached) {
    return cached;
  }
  const resolvedFileName = fileName || url.split("/").pop() || "asset";
  log(ctx, `[asset] create "${title || resolvedFileName}" <- ${url}`);
  if (!APPLY) {
    const stub = { sys: { type: "Link", linkType: "Asset", id: "DRY_RUN" } };
    ctx.assetCache.set(url, stub);
    return stub;
  }
  const created = await ctx.target.createAsset({
    fields: {
      title: { "en-US": title || resolvedFileName },
      file: {
        "en-US": {
          contentType: guessMimeType(resolvedFileName),
          fileName: resolvedFileName,
          upload: url.startsWith("http") ? url : `https:${url}`,
        },
      },
    },
  });
  const processed = await created.processForAllLocales();
  let ready = processed;
  for (let attempt = 0; attempt < 20; attempt++) {
    ready = await ctx.target.getAsset(processed.sys.id);
    if (ready.fields.file?.["en-US"]?.url) {
      break;
    }
    await new Promise((r) => setTimeout(r, 1500));
  }
  const published = await ready.publish();
  const linkResult = {
    sys: { type: "Link", linkType: "Asset", id: published.sys.id },
  };
  ctx.assetCache.set(url, linkResult);
  return linkResult;
}

async function createIcon(
  ctx: Ctx,
  icon: LegacyIcon | null | undefined
): Promise<any> {
  if (!icon?.iconCode) {
    return null;
  }
  const cached = ctx.iconCache.get(icon.iconCode);
  if (cached) {
    return cached;
  }
  const [library, iconName] = icon.iconCode.split("/");
  log(ctx, `[icon] create ${icon.iconCode} ("${icon.name || iconName}")`);
  if (!APPLY) {
    const stub = { sys: { type: "Link", linkType: "Entry", id: "DRY_RUN" } };
    ctx.iconCache.set(icon.iconCode, stub);
    return stub;
  }
  const created = await ctx.target.createEntry("icon", {
    fields: {
      internalName: { "en-US": icon.name || iconName },
      name: { "en-US": iconName },
      iconCode: { "en-US": icon.iconCode },
      library: { "en-US": library },
      title: { "en-US": icon.name || "" },
      showTooltip: { "en-US": Boolean(icon.showTooltip) },
    },
  });
  await created.publish();
  const linkResult = {
    sys: { type: "Link", linkType: "Entry", id: created.sys.id },
  };
  ctx.iconCache.set(icon.iconCode, linkResult);
  return linkResult;
}

async function createImageWrapper(
  ctx: Ctx,
  asset: LegacyAsset | null | undefined,
  internalName: string
): Promise<any> {
  if (!asset?.url) {
    return null;
  }
  const cached = ctx.imageCache.get(asset.url);
  if (cached) {
    return cached;
  }
  const assetLink = await uploadAsset(
    ctx,
    asset.url,
    asset.fileName,
    asset.title
  );
  const alternativeText = asset.description || asset.title || internalName;
  log(ctx, `[image] create wrapper "${internalName}"`);
  if (!APPLY) {
    const stub = { sys: { type: "Link", linkType: "Entry", id: "DRY_RUN" } };
    ctx.imageCache.set(asset.url, stub);
    return stub;
  }
  const created = await ctx.target.createEntry("image", {
    fields: {
      internalName: { "en-US": internalName },
      image: { "en-US": assetLink },
      alternativeText: { "en-US": alternativeText },
    },
  });
  await created.publish();
  const linkResult = {
    sys: { type: "Link", linkType: "Entry", id: created.sys.id },
  };
  ctx.imageCache.set(asset.url, linkResult);
  return linkResult;
}

async function createEntry(
  ctx: Ctx,
  contentTypeId: string,
  fields: any
): Promise<any> {
  const displayLabel =
    fields.internalName?.["en-US"] ||
    fields.entryField?.["en-US"] ||
    fields.title?.["en-US"] ||
    contentTypeId;
  log(ctx, `[${contentTypeId}] create "${displayLabel}"`);
  if (!APPLY) {
    return { sys: { type: "Link", linkType: "Entry", id: "DRY_RUN" } };
  }
  const created = await ctx.target.createEntry(contentTypeId, { fields });
  await created.publish();
  return { sys: { type: "Link", linkType: "Entry", id: created.sys.id } };
}

// Banner -> one Home Banner contentItem (decision 1/2 in ADR-0019).
async function migrateHomeBanner(ctx: Ctx, userInfo: any): Promise<any> {
  const banner = userInfo.bannerData;

  const bannerImageLink = await createImageWrapper(
    ctx,
    banner.profilePicture,
    "Home Banner — Avatar"
  );
  const bannerCoverLink = await createImageWrapper(
    ctx,
    banner.bannerImage,
    "Home Banner — Cover"
  );

  const socialLinks: any[] = [];
  for (const social of banner.socialLinksCollection.items as LegacyAsset[]) {
    const key = (social.title || "").toLowerCase();
    const iconDef = SOCIAL_ICON_MAP[key];
    if (!iconDef) {
      log(
        ctx,
        `[warn] no react-icon mapping for social platform "${social.title}" — link created without an icon`
      );
    }
    const iconLink = iconDef
      ? await createIcon(ctx, {
          iconCode: iconDef.iconCode,
          name: social.title,
        })
      : null;
    const linkEntry = await createEntry(ctx, "link", {
      internalName: { "en-US": `Social — ${social.title}` },
      text: { "en-US": social.title || "" },
      url: { "en-US": social.description || "" },
      ...(iconLink ? { icon: { "en-US": iconLink } } : {}),
    });
    socialLinks.push(linkEntry);
  }

  const homeBannerContentItem = await createEntry(ctx, "contentItem", {
    entryField: { "en-US": "Home Banner" },
    title: { "en-US": userInfo.title || "" },
    image: bannerImageLink ? { "en-US": bannerImageLink } : undefined,
    coverImage: bannerCoverLink ? { "en-US": bannerCoverLink } : undefined,
    links: { "en-US": socialLinks },
  });

  return createEntry(ctx, "contentSection", {
    internalName: { "en-US": "Home — Hero Banner" },
    ui: { "en-US": "HeroBanner" },
    entry: { "en-US": homeBannerContentItem },
  });
}

// BioCard contentItems -> Home stats contentList (SplitContentPanel).
async function migrateBioCards(ctx: Ctx, extract: any): Promise<any> {
  const bioCardLinks: any[] = [];
  for (const bio of extract.pages.home.page.pageData.infoCollection.items) {
    const iconLink = await createIcon(ctx, bio.icon);
    const item = await createEntry(ctx, "contentItem", {
      entryField: { "en-US": `BioCard: ${bio.title}` },
      title: { "en-US": bio.title || "" },
      description: { "en-US": bio.value || "" },
      icon: iconLink ? { "en-US": iconLink } : undefined,
    });
    bioCardLinks.push(item);
  }

  return createEntry(ctx, "contentList", {
    internalName: { "en-US": "Home — Bio Stats" },
    ui: { "en-US": "SplitContentPanel" },
    entries: { "en-US": "Custom" },
    customEntries: { "en-US": bioCardLinks },
  });
}

// JobExperience -> contentItem (Experience contentList, TimelineSection).
// See ADR-0019 decision 9 / mapping doc §5 for the field-target rationale.
async function migrateExperienceEntry(ctx: Ctx, job: any): Promise<any> {
  const iconLink = await createIcon(ctx, job.companyIcon);
  const techStackNames = (job.techStack?.skillIconsCollection?.items || [])
    .map((i: any) => i.name)
    .filter(Boolean);
  const locationText = `${job.location || ""}${job.workedRemotely ? " - Remote" : ""}`;
  return createEntry(ctx, "contentItem", {
    entryField: { "en-US": `Experience: ${job.company}` },
    title: { "en-US": job.company || "" },
    subtitle: { "en-US": job.position || "" },
    description: { "en-US": locationText },
    body: job.description?.json ? { "en-US": job.description.json } : undefined,
    startDate: job.startDate ? { "en-US": job.startDate } : undefined,
    endDate:
      job.currentlyWorking || !job.endDate
        ? undefined
        : { "en-US": job.endDate },
    tags: techStackNames.length ? { "en-US": techStackNames } : undefined,
    icon: iconLink ? { "en-US": iconLink } : undefined,
  });
}

async function migrateExperience(ctx: Ctx, extract: any): Promise<any> {
  const experienceLinks: any[] = [];
  for (const job of extract.pages.experience.page.pageData.experiencesCollection
    .items) {
    experienceLinks.push(await migrateExperienceEntry(ctx, job));
  }

  return createEntry(ctx, "contentList", {
    internalName: { "en-US": "Experience — Timeline" },
    ui: { "en-US": "TimelineSection" },
    entries: { "en-US": "Experience" },
    customEntries: { "en-US": experienceLinks },
  });
}

// ProjectCard -> contentItem (Projects contentList, CardGrid).
async function migrateProjectEntry(ctx: Ctx, project: any): Promise<any> {
  const imageLink = await createImageWrapper(
    ctx,
    project.thumbnail,
    `Project — ${project.title}`
  );
  const linkIcon = await createIcon(ctx, project.deployedLinkIcon);
  const deployedLink = await createEntry(ctx, "link", {
    internalName: { "en-US": `Project Link — ${project.title}` },
    text: { "en-US": "View Project" },
    url: { "en-US": project.deployedLink || "" },
    icon: linkIcon ? { "en-US": linkIcon } : undefined,
  });
  return createEntry(ctx, "contentItem", {
    entryField: { "en-US": `Project: ${project.title}` },
    title: { "en-US": project.title || "" },
    description: { "en-US": project.description || "" },
    image: imageLink ? { "en-US": imageLink } : undefined,
    links: { "en-US": [deployedLink] },
  });
}

async function migrateProjects(ctx: Ctx, extract: any): Promise<any> {
  const projectLinks: any[] = [];
  for (const project of extract.pages.projects.page.pageData.projectsCollection
    .items) {
    projectLinks.push(await migrateProjectEntry(ctx, project));
  }

  return createEntry(ctx, "contentList", {
    internalName: { "en-US": "Projects — Showcase" },
    ui: { "en-US": "CardGrid" },
    entries: { "en-US": "Projects" },
    customEntries: { "en-US": projectLinks },
  });
}

// SkillSet/SkillGroup -> contentItem/statItem (Skills, PanelShowcase).
// Panel = SkillSet, one unlabeled statItem row per SkillGroup — see
// decision 4/11 in ADR-0019 / mapping doc §9 for why.
async function migrateSkillGroup(ctx: Ctx, skillSetTitle: string, group: any) {
  const groupIcons: any[] = [];
  for (const skillIcon of group.skillIconsCollection.items) {
    const link = await createIcon(ctx, skillIcon);
    if (link) {
      groupIcons.push(link);
    }
  }
  return createEntry(ctx, "statItem", {
    internalName: { "en-US": `${skillSetTitle} — ${group.title}` },
    title: { "en-US": group.title || "" },
    progress: { "en-US": group.skillProgress ?? 0 },
    icons: { "en-US": groupIcons },
  });
}

async function migrateSkillSet(ctx: Ctx, skillSet: any): Promise<any> {
  const iconLink = await createIcon(ctx, skillSet.icon);
  const subItems: any[] = [];
  for (const group of skillSet.skillsArrayCollection.items) {
    subItems.push(await migrateSkillGroup(ctx, skillSet.title, group));
  }
  return createEntry(ctx, "contentItem", {
    entryField: { "en-US": `SkillSet: ${skillSet.title}` },
    title: { "en-US": skillSet.title || "" },
    icon: iconLink ? { "en-US": iconLink } : undefined,
    subItems: { "en-US": subItems },
  });
}

async function migrateSkills(ctx: Ctx, extract: any): Promise<any> {
  const skillSetLinks: any[] = [];
  for (const skillSet of extract.pages.skills.page.pageData.skillsSetCollection
    .items) {
    skillSetLinks.push(await migrateSkillSet(ctx, skillSet));
  }

  return createEntry(ctx, "contentList", {
    internalName: { "en-US": "Skills — Panels" },
    ui: { "en-US": "PanelShowcase" },
    entries: { "en-US": "Skills" },
    customEntries: { "en-US": skillSetLinks },
  });
}

// pageSeo -> seoMetadata (one per page).
async function migratePageSeo(
  ctx: Ctx,
  extract: any,
  pageKey: string
): Promise<any> {
  const seo = extract.pages[pageKey].seo.page.pageSeo;
  const firstImage = seo.imagesCollection?.items?.[0];
  const ogImageLink = firstImage
    ? await createImageWrapper(ctx, firstImage, `${pageKey} — OG Image`)
    : null;
  return createEntry(ctx, "seoMetadata", {
    internalName: { "en-US": `SEO — ${pageKey}` },
    title: { "en-US": seo.title || "" },
    description: { "en-US": seo.description || "" },
    keywords: seo.keywords ? { "en-US": seo.keywords } : undefined,
    canonicalUrl: seo.url ? { "en-US": seo.url } : undefined,
    siteName: seo.siteName ? { "en-US": seo.siteName } : undefined,
    publisher: seo.publisher ? { "en-US": seo.publisher } : undefined,
    creator: seo.creator ? { "en-US": seo.creator } : undefined,
    countryName: seo.countryName ? { "en-US": seo.countryName } : undefined,
    ogImage: ogImageLink ? { "en-US": ogImageLink } : undefined,
  });
}

interface PageSections {
  experienceList: any;
  homeHeroSection: any;
  homeStatsList: any;
  projectsList: any;
  skillsList: any;
}

// page entries — one per legacy page shape, per ADR-0019 decision 3.
async function migratePages(
  ctx: Ctx,
  extract: any,
  sections: PageSections
): Promise<Record<string, any>> {
  const homeSeo = await migratePageSeo(ctx, extract, "home");
  const experienceSeo = await migratePageSeo(ctx, extract, "experience");
  const projectsSeo = await migratePageSeo(ctx, extract, "projects");
  const skillsSeo = await migratePageSeo(ctx, extract, "skills");

  const experiencePageIcon = await createIcon(
    ctx,
    extract.pages.experience.page.pageIcon
  );
  const projectsPageIcon = await createIcon(
    ctx,
    extract.pages.projects.page.pageIcon
  );
  const skillsPageIcon = await createIcon(
    ctx,
    extract.pages.skills.page.pageIcon
  );

  const homePage = await createEntry(ctx, "page", {
    internalName: { "en-US": "Page — Home" },
    path: { "en-US": "/about" },
    title: { "en-US": extract.pages.home.page.title || "" },
    description: extract.pages.home.page.pageData?.description?.json
      ? { "en-US": extract.pages.home.page.pageData.description.json }
      : undefined,
    topContentArea: {
      "en-US": [sections.homeHeroSection, sections.homeStatsList],
    },
    seo: { "en-US": homeSeo },
  });

  const experiencePage = await createEntry(ctx, "page", {
    internalName: { "en-US": "Page — Experience" },
    path: { "en-US": "/experience" },
    title: { "en-US": extract.pages.experience.page.title || "" },
    icon: experiencePageIcon ? { "en-US": experiencePageIcon } : undefined,
    topContentArea: { "en-US": [sections.experienceList] },
    seo: { "en-US": experienceSeo },
  });

  const projectsPage = await createEntry(ctx, "page", {
    internalName: { "en-US": "Page — Projects" },
    path: { "en-US": "/projects" },
    title: { "en-US": extract.pages.projects.page.title || "" },
    icon: projectsPageIcon ? { "en-US": projectsPageIcon } : undefined,
    topContentArea: { "en-US": [sections.projectsList] },
    seo: { "en-US": projectsSeo },
  });

  const skillsPage = await createEntry(ctx, "page", {
    internalName: { "en-US": "Page — Skills" },
    path: { "en-US": "/skills" },
    title: { "en-US": extract.pages.skills.page.title || "" },
    icon: skillsPageIcon ? { "en-US": skillsPageIcon } : undefined,
    topContentArea: { "en-US": [sections.skillsList] },
    seo: { "en-US": skillsSeo },
  });

  return {
    "/about": homePage,
    "/experience": experiencePage,
    "/projects": projectsPage,
    "/skills": skillsPage,
  };
}

// MetaPage -> link entries (layout.navigationLinks).
async function migrateNavLinks(
  ctx: Ctx,
  userInfo: any,
  pagesByUrl: Record<string, any>
): Promise<any[]> {
  const navLinks: any[] = [];
  for (const meta of userInfo.pagesCollection.items) {
    const iconLink = await createIcon(ctx, meta.pageIcon);
    const pageLink = pagesByUrl[meta.pageUrl];
    navLinks.push(
      await createEntry(ctx, "link", {
        internalName: { "en-US": `Nav — ${meta.title}` },
        text: { "en-US": meta.title || "" },
        page: pageLink ? { "en-US": pageLink } : undefined,
        icon: iconLink ? { "en-US": iconLink } : undefined,
      })
    );
  }
  return navLinks;
}

// userInfo -> layout, incl. favicon (ADR-0019 decision 7).
async function migrateLayout(
  ctx: Ctx,
  userInfo: any,
  extract: any,
  navLinks: any[]
): Promise<void> {
  const resumeAssetLink = userInfo.resume
    ? await uploadAsset(
        ctx,
        userInfo.resume.url,
        userInfo.resume.fileName,
        userInfo.resume.title
      )
    : null;

  // Favicon: pageSeo.favicon differs across pages in the legacy data (the
  // Skills page points at a different asset than the other three) — using
  // the majority value (Home/Experience/Projects) as the one true favicon.
  const faviconSource = extract.pages.home.seo.page.pageSeo.favicon;
  const faviconAssetLink = faviconSource
    ? await uploadAsset(ctx, faviconSource.url, "favicon", "Favicon")
    : null;

  const resumeIconLink = await createIcon(ctx, userInfo.resumeIcon);
  const themeIconLink = await createIcon(ctx, userInfo.themeIcon);

  const normalizedDefaultTheme = (userInfo.defaultTheme || "").toLowerCase();
  const normalizedThemeList = (userInfo.themeList || [])
    .map((t: string) => t.toLowerCase())
    .filter((t: string) => DAISY_THEMES.has(t));
  const normalizedDrawerVariant = (userInfo.layoutSettings.drawerVariant || "")
    .toLowerCase()
    .replace(/\s+/g, "-");
  const normalizedDrawerSide = (
    userInfo.layoutSettings.drawerSide || ""
  ).toLowerCase();

  if (!DAISY_THEMES.has(normalizedDefaultTheme)) {
    log(
      ctx,
      `[warn] defaultTheme "${userInfo.defaultTheme}" not in DAISY_THEMES after normalization — falling back to "light"`
    );
  }
  if (!DRAWER_VARIANTS.has(normalizedDrawerVariant)) {
    log(
      ctx,
      `[warn] drawerVariant "${userInfo.layoutSettings.drawerVariant}" not in DRAWER_VARIANTS after normalization — falling back to "default"`
    );
  }

  await createEntry(ctx, "layout", {
    internalName: { "en-US": "Site Layout" },
    title: { "en-US": userInfo.title || "" },
    role: { "en-US": userInfo.role || "" },
    resume: resumeAssetLink ? { "en-US": resumeAssetLink } : undefined,
    favicon: faviconAssetLink ? { "en-US": faviconAssetLink } : undefined,
    defaultTheme: {
      "en-US": DAISY_THEMES.has(normalizedDefaultTheme)
        ? normalizedDefaultTheme
        : "light",
    },
    themeList: { "en-US": normalizedThemeList },
    resumeIcon: resumeIconLink ? { "en-US": resumeIconLink } : undefined,
    themeIcon: themeIconLink ? { "en-US": themeIconLink } : undefined,
    drawerVariant: {
      "en-US": DRAWER_VARIANTS.has(normalizedDrawerVariant)
        ? normalizedDrawerVariant
        : "default",
    },
    drawerSide: {
      "en-US": DRAWER_SIDES.has(normalizedDrawerSide)
        ? normalizedDrawerSide
        : "left",
    },
    navigationLinks: { "en-US": navLinks },
  });
}

async function main() {
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
  const environmentId = process.env.CONTENTFUL_ENVIRONMENT || "development";

  if (!(spaceId && accessToken)) {
    console.error("Missing CONTENTFUL_SPACE_ID or CONTENTFUL_MANAGEMENT_TOKEN");
    process.exit(1);
  }
  if (!existsSync(EXTRACT_PATH)) {
    console.error(
      `No extract found at ${EXTRACT_PATH}. Run extract-legacy-content.ts first.`
    );
    process.exit(1);
  }

  const extract = JSON.parse(readFileSync(EXTRACT_PATH, "utf-8"));

  const client = contentfulManagement.createClient(
    { accessToken },
    { type: "legacy" }
  );
  const space = await client.getSpace(spaceId);
  const target = await space.getEnvironment(environmentId);

  console.log(
    `${APPLY ? "APPLYING" : "DRY RUN"}: migrating legacy content into "${spaceId}"/"${environmentId}"`
  );

  const ctx: Ctx = {
    target,
    logLines: [],
    iconCache: new Map(),
    assetCache: new Map(),
    imageCache: new Map(),
  };
  const userInfo = extract.appData.userInfo;

  const homeHeroSection = await migrateHomeBanner(ctx, userInfo);
  const homeStatsList = await migrateBioCards(ctx, extract);
  const experienceList = await migrateExperience(ctx, extract);
  const projectsList = await migrateProjects(ctx, extract);
  const skillsList = await migrateSkills(ctx, extract);

  const pagesByUrl = await migratePages(ctx, extract, {
    homeHeroSection,
    homeStatsList,
    experienceList,
    projectsList,
    skillsList,
  });

  const navLinks = await migrateNavLinks(ctx, userInfo, pagesByUrl);
  await migrateLayout(ctx, userInfo, extract, navLinks);

  console.log(
    `\n${ctx.logLines.length} operations ${APPLY ? "applied" : "planned"}.`
  );
  if (!APPLY) {
    console.log("\nDry run only. Re-run with --apply to write these changes.");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
