---
"abbas-web-resume": patch
---

Redesigned `NotFoundBlock` and `ServerErrorBlock` onto the app's own `Icon`/`Button` components — both previously bypassed the curated icon registry and shared Button element entirely (raw `react-icons` imports and raw `<button>`/`<Link className="btn">`), which was the actual cause of them looking inconsistent with the rest of the site. Repointed the unregistered `MdErrorOutline` to the already-curated `MdError`. Both now stage their icon/heading/message/action in sequence via `MotionStaggerContainer`/`MotionStaggerItem` instead of fading in as one block.

Audited every Block for motion coverage and gave each a treatment matched to its own shape rather than a uniform default: stagger animations for list-shaped Blocks (`FaqAccordion`, `MetricsStrip`, `ProcessSteps`, `TechBadgeCloud`, and `SplitContentPanel`'s info rows, brought in line with `MetricsStrip`), an `AnimatePresence` cross-fade for `ContentTabs`' interaction-driven tab switches, entrance animations for `AppHeader`/`BottomDock`/`AnnouncementBanner`, and hover feedback for `AppHeader`'s icon actions, `BottomDock` items, `MediaCard`, and `NavItem`'s icon. `PageWrapper` and `SidebarNav` are deliberately left as-is — the former's transitions are already owned by `template.tsx`'s route-level `AnimatePresence`, the latter's `layoutId` active-indicator is already the correct motion for its job.

Extended `MotionWrapperProps.as` to support `header`/`nav`/`footer`/`article` and `MotionStaggerItemProps.as` to support `h1`/`h2`/`h3`/`p`, both backward-compatible, so a Block can animate a semantic landmark or heading without degrading it to a `<div>`.

`server-error.spec.tsx`'s button-name assertions updated to regex matching, since the retry icon's accessible name now concatenates into the button's computed name (the same pattern `PageNavButton`'s spec already used).

Followed up with a per-element micro-interaction pass: `ContentTabs` now has a `layoutId`-shared sliding underline between tabs (the same technique as `SidebarNav`'s active-page indicator); `MediaCard` gets a coordinated hover state across its border, shadow, thumbnail scale, and title color; `TechBadgeCloud` badges and `ProcessSteps`' indicators each gained their own hover/reveal pop; `AnnouncementBanner`'s icon and `Progress`'s fill bar gained looping attention animations, both gated behind `useReducedMotion()`; and the five `Button` call sites that lacked hover feedback (`AppHeader`'s brand link, `NotFoundBlock`'s CTA, `ServerErrorBlock`'s retry action and its icon) now have it, wrapped per call site rather than baked into the shared `Button` element to avoid an unaudited layout risk across its many other usages.

See [ADR 0025](../docs/adr/0025-motion-coverage-audit-and-error-page-redesign.md).
