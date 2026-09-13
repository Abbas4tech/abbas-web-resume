# 37. Hero Banner Static Image Strategy

Date: 2026-09-14

## Status

Accepted

## Context

The `HeroBanner` component previously used the `MotionParallax` behavioral wrapper combined with `h-[vh]` viewport sizing and `object-cover` / `object-contain` CSS properties to display the hero image.

This approach created significant layout conflicts. Viewport height sizing caused the container to mismatch the natural proportions of the image, leading to either aggressive cropping (with `object-cover`) or awkward empty space (with `object-contain`). Furthermore, the parallax wrapper introduced scroll-linked translation calculations that often exacerbated the sizing issues on mobile devices.

## Decision

We removed the `MotionParallax` wrapper and hardcoded viewport heights from the `HeroBanner` image implementation. 

Instead, we rely on a standard Next.js `Image` component configured with `w-full h-auto` and the image's intrinsic aspect ratio (via the `sizes` prop). The container simply conforms to the image's natural dimensions as it scales responsively.

## Consequences

- **Reliability**: The hero image always displays exactly as intended, from edge to edge, without unpredictable cropping or letterboxing on different screen sizes.
- **Performance**: Removing the scroll-linked parallax javascript listener reduces main thread work during initial page load and scrolling.
- **Simplicity**: The component relies on robust native CSS behavior (`width: 100%; height: auto;`) rather than complex JS calculations or viewport units.
