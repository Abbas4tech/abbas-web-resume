import type { Document } from "@contentful/rich-text-types";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import type {
  IconFieldsFragment,
  PageFieldsFragment,
  SeoMetadataFieldsFragment,
} from "@/contentful/generated/contentful-sdk.generated";
import {
  createMockContentItem,
  createMockContentList,
  createMockContentSection,
  createMockIcon,
  createMockImage,
  createMockLayout,
  createMockLink,
  createMockPage,
  createMockStatItem,
  emptyRichTextLinks,
  mockContentfulSys,
  richTextDocument,
} from "./factories";

/**
 * A small, entirely fictional multi-page "portfolio" — the synthetic fixture
 * site described in ADR 0022 §1. It exists purely to give E2E specs a real
 * page to mount for every Block/Pattern the component layer can render,
 * independent of whatever the live Contentful space happens to contain.
 *
 * None of the copy below describes a real person, employer, or product.
 */

function icon(id: string, iconCode: string, name: string): IconFieldsFragment {
  return createMockIcon({
    sys: mockContentfulSys(id),
    internalName: name,
    name,
    library: iconCode.split("/")[0],
    iconCode,
    title: name,
  });
}

export const fixtureIcons = {
  home: icon("icon-home", "fa/FaHome", "Home"),
  about: icon("icon-about", "fa/FaUser", "About"),
  experience: icon("icon-experience", "fa/FaBriefcase", "Experience"),
  projects: icon("icon-projects", "fa/FaCode", "Projects"),
  skills: icon("icon-skills", "io5/IoStatsChart", "Skills"),
  experiments: icon("icon-experiments", "fa/FaTools", "Experiments"),
  resume: icon("icon-resume", "fa/FaFileAlt", "Resume"),
  theme: icon("icon-theme", "fa/FaPalette", "Theme"),
  github: icon("icon-github", "fa/FaGithub", "GitHub"),
  linkedin: icon("icon-linkedin", "fa/FaLinkedin", "LinkedIn"),
  email: icon("icon-email", "md/MdEmail", "Email"),
  location: icon("icon-location", "fa/FaMapMarkerAlt", "Location"),
  focus: icon("icon-focus", "io5/IoPerson", "Focus"),
  currently: icon("icon-currently", "fa/FaStackOverflow", "Currently"),
  react: icon("icon-react", "si/SiReact", "React"),
  typescript: icon("icon-typescript", "si/SiTypescript", "TypeScript"),
  tailwind: icon("icon-tailwind", "si/SiTailwindcss", "Tailwind CSS"),
  next: icon("icon-next", "ri/RiNextjsFill", "Next.js"),
  node: icon("icon-node", "si/SiNodedotjs", "Node.js"),
  postgres: icon("icon-postgres", "si/SiPostgresql", "PostgreSQL"),
  vitest: icon("icon-vitest", "si/SiVitest", "Vitest"),
  storybook: icon("icon-storybook", "si/SiStorybook", "Storybook"),
  viewProject: icon(
    "icon-view-project",
    "fa/FaExternalLinkAlt",
    "View project"
  ),
};

function pageSeo(
  id: string,
  title: string,
  description: string
): SeoMetadataFieldsFragment {
  return {
    __typename: "SeoMetadata",
    sys: mockContentfulSys(id),
    internalName: `${title} SEO`,
    title,
    description,
    keywords: ["fixture", "e2e"],
    siteName: "Ada Sparkline",
    publisher: null,
    creator: null,
    countryName: null,
    canonicalUrl: null,
    noIndex: true,
    noFollow: true,
    ogImage: null,
    favicon: null,
  };
}

// ---------------------------------------------------------------------------
// Layout
// ---------------------------------------------------------------------------

export const fixtureLayout = createMockLayout({
  sys: mockContentfulSys("layout-fixture"),
  internalName: "Fixture layout",
  title: "Ada Sparkline",
  role: "Full-Stack Engineer",
  defaultTheme: "light",
  themeList: ["light", "dark", "synthwave"],
  email: "ada@fixture.dev",
  footerText:
    "© 2026 Ada Sparkline — synthetic fixture data, not a real person.",
  drawerVariant: "Dock On Mobile",
  drawerSide: "Left",
  resume: { url: "/ada-sparkline-resume.pdf", title: "Download Résumé" },
  globalSeo: pageSeo(
    "seo-global",
    "Ada Sparkline — Portfolio",
    "Synthetic fixture portfolio used to exercise every Block in E2E coverage."
  ),
  siteLogo: createMockImage({
    sys: mockContentfulSys("image-logo"),
    internalName: "Site logo",
    alternativeText: "Ada Sparkline logo",
    caption: null,
    image: {
      url: "/fixtures/logo.png",
      title: "Ada Sparkline logo",
      description: null,
      width: 64,
      height: 64,
    },
  }),
  resumeIcon: fixtureIcons.resume,
  themeIcon: fixtureIcons.theme,
  navigationLinksCollection: {
    items: [
      createMockLink({
        sys: mockContentfulSys("nav-home"),
        internalName: "Home",
        text: "Home",
        url: "/",
        icon: fixtureIcons.home,
      }),
      createMockLink({
        sys: mockContentfulSys("nav-about"),
        internalName: "About",
        text: "About",
        url: "/about",
        icon: fixtureIcons.about,
      }),
      createMockLink({
        sys: mockContentfulSys("nav-experience"),
        internalName: "Experience",
        text: "Experience",
        url: "/experience",
        icon: fixtureIcons.experience,
      }),
      createMockLink({
        sys: mockContentfulSys("nav-projects"),
        internalName: "Projects",
        text: "Projects",
        url: "/projects",
        icon: fixtureIcons.projects,
      }),
      createMockLink({
        sys: mockContentfulSys("nav-skills"),
        internalName: "Skills",
        text: "Skills",
        url: "/skills",
        icon: fixtureIcons.skills,
      }),
      createMockLink({
        sys: mockContentfulSys("nav-experiments"),
        internalName: "Experiments",
        text: "Experiments",
        url: "/experiments",
        icon: fixtureIcons.experiments,
      }),
    ],
  },
});

// ---------------------------------------------------------------------------
// About ("/about") — the app's actual landing page.
//
// `src/middleware.ts` unconditionally redirects "/" to "/about", so a Page
// fixture at path "/" would never be reachable through real navigation (the
// GraphQL request for it is never even made). The HeroBanner therefore lives
// on "/about" alongside the SplitContentPanel bio rows, matching what a
// visitor actually lands on.
// ---------------------------------------------------------------------------

const aboutHero = createMockContentSection({
  sys: mockContentfulSys("section-hero"),
  internalName: "About hero banner",
  ui: "HeroBanner",
  entry: createMockContentItem({
    sys: mockContentfulSys("item-hero"),
    entryField: "hero",
    title: "Ada Sparkline",
    subtitle: "Full-Stack Engineer",
    coverImage: createMockImage({
      sys: mockContentfulSys("image-hero-cover"),
      internalName: "Hero banner cover",
      alternativeText: "Abstract fixture banner artwork",
      image: {
        url: "/fixtures/hero-banner.png",
        title: "Hero banner",
        description: null,
        width: 1600,
        height: 500,
      },
    }),
    image: createMockImage({
      sys: mockContentfulSys("image-hero-avatar"),
      internalName: "Hero avatar",
      alternativeText: "Ada Sparkline avatar illustration",
      image: {
        url: "/fixtures/avatar.png",
        title: "Avatar",
        description: null,
        width: 240,
        height: 240,
      },
    }),
    linksCollection: {
      items: [
        createMockLink({
          sys: mockContentfulSys("link-github"),
          internalName: "GitHub",
          text: "GitHub",
          url: "https://github.com/fixture-user",
          icon: fixtureIcons.github,
        }),
        createMockLink({
          sys: mockContentfulSys("link-linkedin"),
          internalName: "LinkedIn",
          text: "LinkedIn",
          url: "https://linkedin.com/in/fixture-user",
          icon: fixtureIcons.linkedin,
        }),
        createMockLink({
          sys: mockContentfulSys("link-email"),
          internalName: "Email",
          text: "Email",
          url: "mailto:ada@fixture.dev",
          icon: fixtureIcons.email,
        }),
      ],
    },
  }),
});

const aboutInfoRows = [
  createMockContentItem({
    sys: mockContentfulSys("item-about-location"),
    entryField: "info",
    title: "Location",
    description: "Remote, Wonderland",
    icon: fixtureIcons.location,
  }),
  createMockContentItem({
    sys: mockContentfulSys("item-about-focus"),
    entryField: "info",
    title: "Focus",
    description: "Accessible, composable design systems",
    icon: fixtureIcons.focus,
  }),
  createMockContentItem({
    sys: mockContentfulSys("item-about-currently"),
    entryField: "info",
    title: "Currently",
    description: "Building a synthetic fixture site for E2E coverage",
    icon: fixtureIcons.currently,
  }),
];

const aboutPanel = createMockContentList({
  sys: mockContentfulSys("list-about"),
  internalName: "About split panel",
  ui: "SplitContentPanel",
  title: "About",
  description: {
    json: richTextDocument(
      "A little about this fictional engineer — entirely fixture data, used only for testing."
    ),
  },
  customEntriesCollection: { items: aboutInfoRows },
});

const aboutPage = createMockPage({
  sys: mockContentfulSys("page-about"),
  internalName: "About page",
  path: "/about",
  title: "About",
  icon: fixtureIcons.about,
  description: {
    json: richTextDocument(
      "Welcome to the fixture site — a synthetic portfolio built to exercise every Block this app can render."
    ),
    links: emptyRichTextLinks(),
  },
  seo: pageSeo("seo-about", "About", "About the fixture persona."),
  topContentAreaCollection: { items: [aboutHero] },
  bottomContentAreaCollection: { items: [aboutPanel] },
});

// ---------------------------------------------------------------------------
// Experience ("/experience") — TimelineSection (ContentList)
// ---------------------------------------------------------------------------

const experienceRichBody: Document = {
  nodeType: BLOCKS.DOCUMENT,
  data: {},
  content: [
    {
      nodeType: BLOCKS.HEADING_3,
      data: {},
      content: [
        { nodeType: "text", value: "What I shipped", marks: [], data: {} },
      ],
    },
    {
      nodeType: BLOCKS.UL_LIST,
      data: {},
      content: [
        {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: "text",
                  value: "Rebuilt the design system in ",
                  marks: [],
                  data: {},
                },
                {
                  nodeType: "text",
                  value: "TypeScript",
                  marks: [{ type: "bold" }],
                  data: {},
                },
              ],
            },
          ],
        },
        {
          nodeType: BLOCKS.LIST_ITEM,
          data: {},
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              data: {},
              content: [
                {
                  nodeType: "text",
                  value: "Read the ",
                  marks: [],
                  data: {},
                },
                {
                  nodeType: INLINES.HYPERLINK,
                  data: { uri: "https://example.com/fixture-case-study" },
                  content: [
                    {
                      nodeType: "text",
                      value: "full case study",
                      marks: [],
                      data: {},
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
} as Document;

const experienceEntries = [
  createMockContentItem({
    sys: mockContentfulSys("item-exp-1"),
    entryField: "experience",
    title: "Senior Software Engineer, Fixture Robotics",
    subtitle: "Full-time",
    description: "Metropolis, Remote",
    startDate: "2023-01-06",
    endDate: null,
    tags: ["TypeScript", "React", "GraphQL"],
    icon: fixtureIcons.experience,
    body: { json: experienceRichBody, links: emptyRichTextLinks() },
  }),
  createMockContentItem({
    sys: mockContentfulSys("item-exp-2"),
    entryField: "experience",
    title: "Software Engineer, Fixture Robotics",
    subtitle: "Full-time",
    description: "Metropolis, Remote",
    startDate: "2021-03-01",
    endDate: "2022-12-31",
    tags: ["Node.js", "PostgreSQL"],
    icon: fixtureIcons.experience,
    body: {
      json: richTextDocument("Owned the checkout service rewrite end to end."),
      links: emptyRichTextLinks(),
    },
  }),
  createMockContentItem({
    sys: mockContentfulSys("item-exp-3"),
    entryField: "experience",
    title: "Junior Developer, Fixture Robotics",
    subtitle: "Full-time",
    description: "Metropolis, On-site",
    startDate: "2019-06-03",
    endDate: "2021-02-26",
    tags: ["JavaScript", "Redux"],
    icon: fixtureIcons.experience,
    body: {
      json: richTextDocument(
        "Shipped the first version of the internal component library."
      ),
      links: emptyRichTextLinks(),
    },
  }),
];

const experienceList = createMockContentList({
  sys: mockContentfulSys("list-experience"),
  internalName: "Experience timeline",
  ui: "TimelineSection",
  title: "Experience",
  customEntriesCollection: { items: experienceEntries },
});

const experiencePage = createMockPage({
  sys: mockContentfulSys("page-experience"),
  internalName: "Experience page",
  path: "/experience",
  title: "Experience",
  icon: fixtureIcons.experience,
  seo: pageSeo("seo-experience", "Experience", "Fixture work history."),
  bottomContentAreaCollection: { items: [experienceList] },
});

// ---------------------------------------------------------------------------
// Projects ("/projects") — CardGrid (ContentList)
// ---------------------------------------------------------------------------

const projectCard = (
  id: string,
  title: string,
  description: string,
  demoUrl: string
) =>
  createMockContentItem({
    sys: mockContentfulSys(id),
    entryField: "project",
    title,
    description,
    image: createMockImage({
      sys: mockContentfulSys(`${id}-image`),
      internalName: `${title} thumbnail`,
      alternativeText: `${title} thumbnail`,
      image: {
        url: `/fixtures/${id}.png`,
        title,
        description: null,
        width: 640,
        height: 400,
      },
    }),
    linksCollection: {
      items: [
        createMockLink({
          sys: mockContentfulSys(`${id}-link`),
          internalName: `${title} demo link`,
          text: "View project",
          icon: fixtureIcons.viewProject,
          url: demoUrl,
        }),
      ],
    },
  });

const projectEntries = [
  projectCard(
    "item-proj-fixture-dashboard",
    "Fixture Dashboard",
    "An analytics dashboard built to stress-test the CardGrid block.",
    "https://example.com/fixture-dashboard"
  ),
  projectCard(
    "item-proj-mock-market",
    "Mock Market",
    "A synthetic storefront used to exercise checkout journeys in demos.",
    "https://example.com/mock-market"
  ),
  projectCard(
    "item-proj-fixture-cli",
    "Fixture CLI",
    "A command-line tool that scaffolds fake content for local testing.",
    "https://example.com/fixture-cli"
  ),
  projectCard(
    "item-proj-fake-forecast",
    "Fake Forecast",
    "A weather widget backed entirely by deterministic sample data.",
    "https://example.com/fake-forecast"
  ),
];

const projectsList = createMockContentList({
  sys: mockContentfulSys("list-projects"),
  internalName: "Projects grid",
  ui: "CardGrid",
  title: "Projects",
  customEntriesCollection: { items: projectEntries },
});

const projectsPage = createMockPage({
  sys: mockContentfulSys("page-projects"),
  internalName: "Projects page",
  path: "/projects",
  title: "Projects",
  icon: fixtureIcons.projects,
  seo: pageSeo("seo-projects", "Projects", "Fixture project showcase."),
  bottomContentAreaCollection: { items: [projectsList] },
});

// ---------------------------------------------------------------------------
// Skills ("/skills") — PanelShowcase (ContentList)
// ---------------------------------------------------------------------------

const statRow = (
  id: string,
  title: string,
  progress: number,
  icons: IconFieldsFragment[]
) =>
  createMockStatItem({
    sys: mockContentfulSys(id),
    internalName: title,
    title,
    progress,
    iconsCollection: { items: icons },
  });

const skillPanel = (
  id: string,
  title: string,
  headingIcon: IconFieldsFragment,
  rows: ReturnType<typeof statRow>[]
) =>
  createMockContentItem({
    sys: mockContentfulSys(id),
    entryField: "skill-panel",
    title,
    icon: headingIcon,
    subItemsCollection: { items: rows },
  });

const skillsEntries = [
  skillPanel("panel-frontend", "Frontend", fixtureIcons.react, [
    statRow("panel-frontend-stat-1", "React & Next.js", 90, [
      fixtureIcons.react,
      fixtureIcons.next,
    ]),
    statRow("panel-frontend-stat-2", "TypeScript", 85, [
      fixtureIcons.typescript,
    ]),
    statRow("panel-frontend-stat-3", "Styling", 80, [fixtureIcons.tailwind]),
  ]),
  skillPanel("panel-backend", "Backend", fixtureIcons.node, [
    statRow("panel-backend-stat-1", "Node.js services", 75, [
      fixtureIcons.node,
    ]),
    statRow("panel-backend-stat-2", "Databases", 70, [fixtureIcons.postgres]),
  ]),
  skillPanel("panel-tooling", "Tooling & Testing", fixtureIcons.vitest, [
    statRow("panel-tooling-stat-1", "Automated testing", 88, [
      fixtureIcons.vitest,
    ]),
    statRow("panel-tooling-stat-2", "Component docs", 65, [
      fixtureIcons.storybook,
    ]),
  ]),
];

const skillsList = createMockContentList({
  sys: mockContentfulSys("list-skills"),
  internalName: "Skills showcase",
  ui: "PanelShowcase",
  title: "Skills",
  customEntriesCollection: { items: skillsEntries },
});

const skillsPage = createMockPage({
  sys: mockContentfulSys("page-skills"),
  internalName: "Skills page",
  path: "/skills",
  title: "Skills",
  icon: fixtureIcons.skills,
  seo: pageSeo("seo-skills", "Skills", "Fixture skills breakdown."),
  bottomContentAreaCollection: { items: [skillsList] },
});

// ---------------------------------------------------------------------------
// Experiments ("/experiments") — unrecognized `ui` value.
//
// No Block is registered for "Carousel" in content-section.tsx's registry,
// so this page exercises the BlockPlaceholder dev-mode fallback end to end
// (ADR 0022 §1, ADR 0004).
// ---------------------------------------------------------------------------

const experimentsSection = createMockContentSection({
  sys: mockContentfulSys("section-experiments"),
  internalName: "Unregistered block experiment",
  ui: "Carousel",
  entry: createMockContentItem({
    sys: mockContentfulSys("item-experiments"),
    entryField: "experiment",
    title: "Carousel experiment",
    description: "Not yet implemented as a Block.",
  }),
});

const experimentsPage = createMockPage({
  sys: mockContentfulSys("page-experiments"),
  internalName: "Experiments page",
  path: "/experiments",
  title: "Experiments",
  icon: fixtureIcons.experiments,
  description: {
    json: richTextDocument(
      "This page intentionally references a UI variant with no registered Block, to exercise the BlockPlaceholder fallback."
    ),
    links: emptyRichTextLinks(),
  },
  seo: pageSeo(
    "seo-experiments",
    "Experiments",
    "Exercises the unrecognized-block fallback."
  ),
  bottomContentAreaCollection: { items: [experimentsSection] },
});

// ---------------------------------------------------------------------------

export const fixturePages: PageFieldsFragment[] = [
  aboutPage,
  experiencePage,
  projectsPage,
  skillsPage,
  experimentsPage,
];

/**
 * Deliberately not part of `fixturePages` — used by E2E specs to assert the
 * real `notFound()` branch in `src/app/(app)/[[...slug]]/page.tsx` renders
 * for a path the fixture site has never heard of.
 */
export const NON_EXISTENT_PAGE_PATH = "/this-page-does-not-exist";

/**
 * A sentinel path `tests/mocks/handlers.ts` special-cases to return a
 * GraphQL error response (rather than a page) for, so E2E specs can exercise
 * the real `src/app/error.tsx` boundary end to end without needing a
 * component that can actually be made to throw from fixture data alone.
 */
export const SERVER_ERROR_PAGE_PATH = "/this-page-errors";
