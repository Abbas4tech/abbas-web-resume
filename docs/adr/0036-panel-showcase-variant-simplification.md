# 36. PanelShowcase Variant Simplification

Date: 2026-09-14

## Status

Accepted

## Context

The `PanelShowcase` block originally supported multiple complex layout variants, including a `table` mode (`SkillsMatrix`) and a `radial` progress mode (`PanelShowcaseWithRadialProgress`). 

These multiple variants introduced significant complexity into the Contentful block registry (`content-list.tsx`), the adapter logic (`panel-showcase.adapter.ts`), and the component itself. It also created UX issues on smaller screens, where tables and radial dials struggled to wrap gracefully and scale cohesively with standard rows.

## Decision

We retired the `table` layout and `radial` variants entirely. The `PanelShowcase` component now strictly enforces a unified, responsive vertical list structure (`PanelShowcaseRow`) where each skill features a text label, an icon cluster, and a standard linear progress bar. 

In Contentful, the legacy UI types (`SkillsMatrix` and `PanelShowcaseWithRadialProgress`) have been removed from the schema validations to prevent new entries. In the codebase, existing entries using these types are explicitly mapped back to the standard `PanelShowcase` adapter in the component registry to prevent breakage.

## Consequences

- **Code Simplification**: The `PanelShowcase` component is much leaner, and its adapter no longer has to negotiate between vastly different data shapes.
- **UX Consistency**: Skills are presented uniformly across the site, with predictable behavior on mobile breakpoints.
- **Maintenance**: We only have one progress UI to style and maintain, making global visual updates much easier.
