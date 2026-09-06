/** biome-ignore-all lint/suspicious/noExplicitAny: false */

/**
 * Read-only extraction of the legacy Contentful space's content via its
 * GraphQL Content Delivery API. Mirrors audit-environment-content.ts's
 * "never mutates" posture, aimed at the legacy space instead of the new one.
 * Reuses the exact query shapes from `master`'s src/queries/*.ts.
 *
 * Requires these vars in .env.local (values come from the legacy space's own
 * config, kept under a LEGACY_ prefix so they never collide with the active
 * new-space CONTENTFUL_* vars used elsewhere in this repo):
 *   LEGACY_CONTENTFUL_SPACE_ID
 *   LEGACY_CONTENTFUL_API_KEY
 *   LEGACY_CONTENTFUL_ENVIRONMENT_ID
 *   LEGACY_CONTENTFUL_APPLICATION_DATA_ID
 *   LEGACY_CONTENTFUL_HOME_PAGE_KEY
 *   LEGACY_CONTENTFUL_EXPERIENCE_PAGE_KEY
 *   LEGACY_CONTENTFUL_PROJECTS_PAGE_KEY
 *   LEGACY_CONTENTFUL_SKILLS_PAGE_KEY
 *
 * Usage:
 *   npx tsx src/contentful/scripts/extract-legacy-content.ts
 *
 * Output:
 *   .contentful-audit/legacy-extract.json
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { config } from "dotenv";

config({ path: ".env.local" });

const REQUIRED_ENV = [
  "LEGACY_CONTENTFUL_SPACE_ID",
  "LEGACY_CONTENTFUL_API_KEY",
  "LEGACY_CONTENTFUL_ENVIRONMENT_ID",
  "LEGACY_CONTENTFUL_APPLICATION_DATA_ID",
  "LEGACY_CONTENTFUL_HOME_PAGE_KEY",
  "LEGACY_CONTENTFUL_EXPERIENCE_PAGE_KEY",
  "LEGACY_CONTENTFUL_PROJECTS_PAGE_KEY",
  "LEGACY_CONTENTFUL_SKILLS_PAGE_KEY",
] as const;

for (const key of REQUIRED_ENV) {
  if (!process.env[key]) {
    console.error(`Missing ${key} in .env.local`);
    process.exit(1);
  }
}

const SPACE_ID = process.env.LEGACY_CONTENTFUL_SPACE_ID as string;
const ENVIRONMENT_ID = process.env.LEGACY_CONTENTFUL_ENVIRONMENT_ID as string;
const API_KEY = process.env.LEGACY_CONTENTFUL_API_KEY as string;
const ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${SPACE_ID}/environments/${ENVIRONMENT_ID}`;

async function gql<T = any>(
  query: string,
  variables: Record<string, unknown>
): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) {
    throw new Error(`GraphQL error: ${JSON.stringify(json.errors, null, 2)}`);
  }
  return json.data as T;
}

// --- Queries copied verbatim from master's src/queries/*.ts ---

const GET_APPDATA = `
  query GetAppData($id: String!) {
    userInfo(id: $id) {
      title
      name
      bannerData {
        bannerAnimation
        title
        profilePicture { description fileName width height title url }
        socialLinksCollection { items { description fileName width height title url } }
        bannerImage { title url description fileName height width }
      }
      defaultTheme
      themeList
      resume { description fileName title url }
      role
      pagesCollection {
        items {
          pageUrl
          isDefaultPage
          title
          pageIcon { classes iconCode name showTooltip }
        }
      }
      resumeIcon { classes showTooltip name iconCode }
      themeIcon { classes showTooltip name iconCode }
      layoutSettings { drawerSide drawerVariant title }
    }
  }
`;

const GET_HOME_PAGE = `
  query GetHomePage($id: String!) {
    page(id: $id) {
      title
      contentAnimation
      headingAnimation
      pageData {
        ... on HomePageData {
          infoCollection {
            items { title value icon { classes showTooltip name iconCode } }
          }
          description { json }
        }
      }
    }
  }
`;

const GET_EXPERIENCE_PAGE = `
  query GetExperiencePage($id: String!) {
    page(id: $id) {
      title
      pageIcon { iconCode name showTooltip classes }
      headingAnimation
      contentAnimation
      pageData {
        ... on ExperiencePageData {
          title
          experiencesCollection {
            items {
              company
              companyIcon { name iconCode classes showTooltip }
              description { json }
              position
              roleIcon { name iconCode classes showTooltip }
              workedRemotely
              startDate
              endDate
              durationIcon { name iconCode classes showTooltip }
              location
              locationIcon { name iconCode classes showTooltip }
              currentlyWorking
              techStack {
                title
                skillProgress
                skillIconsCollection { items { name } }
              }
              techStackIcon { name iconCode classes showTooltip }
            }
          }
        }
      }
    }
  }
`;

const GET_PROJECTS_PAGE = `
  query GetProjectsPage($id: String!) {
    page(id: $id) {
      title
      pageIcon { iconCode name showTooltip classes }
      headingAnimation
      contentAnimation
      pageData {
        ... on ProjectsPageData {
          title
          projectsCollection {
            items {
              title
              description
              thumbnail { title height width url description fileName }
              deployedLink
              deployedLinkIcon { iconCode name showTooltip classes }
            }
          }
        }
      }
    }
  }
`;

const GET_SKILLS_PAGE = `
  query GetSkillsPage($id: String!) {
    page(id: $id) {
      title
      pageIcon { iconCode name showTooltip classes }
      headingAnimation
      contentAnimation
      pageData {
        ... on SkillsPageData {
          title
          skillsSetCollection(limit: 10) {
            items {
              title
              icon { iconCode classes showTooltip name }
              skillsArrayCollection(limit: 10) {
                items {
                  title
                  skillProgress
                  skillIconsCollection(limit: 10) { items { classes showTooltip name iconCode } }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const GET_METADATA = `
  query GetMetadata($id: String!) {
    page(id: $id) {
      pageSeo {
        title
        description
        keywords
        countryName
        publisher
        creator
        url
        siteName
        imagesCollection { items { title url width height } }
        favicon { url }
      }
    }
  }
`;

async function main() {
  console.log(
    `Extracting legacy content from space "${SPACE_ID}" / environment "${ENVIRONMENT_ID}" ...`
  );

  const appData = await gql(GET_APPDATA, {
    id: process.env.LEGACY_CONTENTFUL_APPLICATION_DATA_ID,
  });

  const pageKeys = {
    home: process.env.LEGACY_CONTENTFUL_HOME_PAGE_KEY as string,
    experience: process.env.LEGACY_CONTENTFUL_EXPERIENCE_PAGE_KEY as string,
    projects: process.env.LEGACY_CONTENTFUL_PROJECTS_PAGE_KEY as string,
    skills: process.env.LEGACY_CONTENTFUL_SKILLS_PAGE_KEY as string,
  };

  const [home, experience, projects, skills] = await Promise.all([
    gql(GET_HOME_PAGE, { id: pageKeys.home }),
    gql(GET_EXPERIENCE_PAGE, { id: pageKeys.experience }),
    gql(GET_PROJECTS_PAGE, { id: pageKeys.projects }),
    gql(GET_SKILLS_PAGE, { id: pageKeys.skills }),
  ]);

  const [homeSeo, experienceSeo, projectsSeo, skillsSeo] = await Promise.all([
    gql(GET_METADATA, { id: pageKeys.home }),
    gql(GET_METADATA, { id: pageKeys.experience }),
    gql(GET_METADATA, { id: pageKeys.projects }),
    gql(GET_METADATA, { id: pageKeys.skills }),
  ]);

  const extract = {
    extractedAt: new Date().toISOString(),
    sourceSpaceId: SPACE_ID,
    sourceEnvironmentId: ENVIRONMENT_ID,
    appData,
    pages: {
      home: { ...(home as object), seo: homeSeo },
      experience: { ...(experience as object), seo: experienceSeo },
      projects: { ...(projects as object), seo: projectsSeo },
      skills: { ...(skills as object), seo: skillsSeo },
    },
  };

  mkdirSync(".contentful-audit", { recursive: true });
  writeFileSync(
    ".contentful-audit/legacy-extract.json",
    JSON.stringify(extract, null, 2)
  );

  console.log("Extraction complete -> .contentful-audit/legacy-extract.json");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
