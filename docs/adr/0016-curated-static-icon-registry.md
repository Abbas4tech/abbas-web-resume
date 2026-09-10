---
title: 0016 - Curated Static Icon Registry
date: 2026-06-21
status: accepted
---

# 0016 - Curated Static Icon Registry

## Context

Our Contentful content model defines an `Icon` element that references icons dynamically via string codes (e.g., `fa/FaHome`, `si/SiTypescript`). Previously, the application resolved these string codes at runtime using `dynamic()` client-side code blocks that loaded entire `react-icons` submodules (like `react-icons/fa`).

However, this design introduced a critical conflict between runtime rendering speed and production bundle sizes:
1. **Dynamic remounting lag**: Creating `dynamic()` component definitions inside React's render/useMemo loop caused React to unmount, destroy, and recreate the icon components on every state update, leading to layout thrashing and clumsy/laggy transitions.
2. **Bundle size bloat**: Registering libraries statically at the module scope level to avoid dynamic remounting forced Next.js to eager-preload all icon libraries, causing the first-load JS size to skyrocket to **575 kB** (with single chunks exceeding **5.3 MB**).

We need a strategy that ensures zero runtime performance lag while keeping our production bundle size extremely lightweight.

## Decision

We will implement a **Curated Static Icon Registry** in the [Icon](file:///d:/Projects/abbas-web-resume/src/components/elements/ui/icon/icon.tsx) component:

1. **Explicit Static Imports**:
   Instead of dynamically importing entire submodules of `react-icons`, we will explicitly import only the curated subset of icons that are currently defined in the Contentful development environment, as well as those referenced in our test suites and mock datasets.
2. **Icon Registry Dictionary**:
   We will maintain a static lookup dictionary `ICON_REGISTRY` that maps string identifiers (e.g., `"fa/FaHome"`) to their corresponding statically imported icon components.
3. **No Dynamic Wrappers**:
   The `Icon` component will look up the icon in the registry and render it directly as a standard, static React component. No `dynamic()` loaders or runtime component generation will be used.

### Approved Icon Registry List

- **FontAwesome (fa)**: `FaAngular`, `FaArrowRight`, `FaBootstrap`, `FaBriefcase`, `FaBuilding`, `FaCalendar`, `FaCalendarTimes`, `FaClock`, `FaCode`, `FaDownload`, `FaExternalLinkAlt`, `FaFileAlt`, `FaFilePdf`, `FaFolder`, `FaGitAlt`, `FaGithub`, `FaHome`, `FaHtml5`, `FaMapMarker`, `FaMapMarkerAlt`, `FaPalette`, `FaPhone`, `FaPhoneAlt`, `FaReact`, `FaSass`, `FaStackOverflow`, `FaStar`, `FaTools`, `FaUser`, `FaUserGraduate`, `FaVuejs`
- **FontAwesome 6 (fa6)**: `FaLocationCrosshairs`, `FaLocationDot`, `FaPeopleGroup`
- **Ionicons (io)**: `IoLogoCss3`
- **Ionicons 5 (io5)**: `IoBicycle`, `IoChevronDown`, `IoColorPalette`, `IoLogoFirebase`, `IoMenu`, `IoPerson`, `IoStatsChart`, `IoStatsChartSharp`
- **Material Design (md)**: `MdBusiness`, `MdClose`, `MdCode`, `MdColorLens`, `MdDarkMode`, `MdDateRange`, `MdEmail`, `MdError`, `MdFavorite`, `MdHome`, `MdLightMode`, `MdLocationOn`, `MdMenu`, `MdOpenInNew`, `MdOutlineMiscellaneousServices`, `MdOutlineWork`, `MdRefresh`, `MdSchool`, `MdSearchOff`, `MdWork`
- **Remix Icons (ri)**: `RiNextjsFill`
- **Simple Icons (si)**: `SiAngular`, `SiAxios`, `SiContentful`, `SiDaisyui`, `SiFramework`, `SiGmail`, `SiJavascript`, `SiJest`, `SiJira`, `SiMongodb`, `SiNgrx`, `SiNodedotjs`, `SiNotion`, `SiPostgresql`, `SiReact`, `SiReactivex`, `SiReactrouter`, `SiRedux`, `SiShadcnui`, `SiStorybook`, `SiStrapi`, `SiSwagger`, `SiTailwindcss`, `SiTurborepo`, `SiTypescript`, `SiVercel`, `SiVite`, `SiVitest`, `SiWebpack`
- **VS Code Icons (vsc)**: `VscAzureDevops`
- **Phosphor Icons (pi)**: `PiFlagBannerFill`

## Registry Robustness & Parser Improvements

To prevent resolution warnings when icons are loaded from Contentful or adapters:
1. **Fallback Parser**: Refactored the `parseIconCode` function to handle scenarios where the `library` prop is pre-populated but the `iconName` is omitted (resulting in registry lookups matching `library/undefined`). The parsing function now splits `iconCode` (e.g. `si/SiTypescript`) to extract the exact name dynamically if either prop is missing.
2. **Conditional Rendering**: Render wrappers (like `MediaCard` and `IconLink`) verify that target assets have non-empty source attributes before executing Next.js `<Image>` tags, avoiding standard runtime script failures on empty parameters.

## Consequences

- **Positive**: First Load JS size drops from **575 kB** to **~173 kB** (decisive bundle size drop) as Webpack tree-shakes all unused icons in `react-icons`.
- **Positive**: Eliminates layout thrashing and dynamic component recreation, resulting in fluid and instant icon renders.
- **Positive**: Enhanced resilience against partial/empty CMS settings and adapter default mappings.
- **Negative**: Adding a new icon in the Contentful CMS requires a developer to add its static import and registration key in the code. We accept this trade-off to guarantee production performance.

## Amendment (2026-09-07) — Registry/mock drift audit

A Storybook audit found that several `.mock.ts` fixtures referenced icon codes that were never added to the registry, so `Icon` silently rendered its `MdError` fallback for them (in Storybook and would have in production). Resolved two ways:

1. **Repointed to an already-curated equivalent** where one existed, instead of growing the registry: `md/MdOutlineDocumentScanner` → `fa/FaDownload` (AppHeader resume action), `md/MdOutlineColorLens` → `md/MdColorLens` (AppHeader theme toggle), `md/MdPerson` → `io5/IoPerson` (NavItem/SidebarNav "About"), `si/SiNextdotjs` → `ri/RiNextjsFill` (PanelShowcase tech list — both are the Next.js logo, only one was registered).
2. **Registered as new**, where no curated equivalent fit the intended meaning: `md/MdLink`, `md/MdStorage`, `si/SiExpress`, `md/MdEventAvailable`, `md/MdLanguage`, `md/MdAccessTime`.

Takeaway for future mock/content authoring: check `ICON_REGISTRY` in `icon-map.ts` before picking an icon code, the same way you'd check an existing design token before inventing a new color.
