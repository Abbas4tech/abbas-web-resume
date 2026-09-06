import { describe, expect, it } from "vitest";
// `?raw` reads the file's source text via Vite rather than importing the module:
// next/font's `Poppins(...)` call is rewritten by a Next.js/SWC build-time transform,
// so importing this module in Vitest would not reflect real font-loading output.
import layoutSource from "./layout.tsx?raw";

const poppinsWeightArrayRegex = /weight:\s*\[([^\]]+)\]/;

describe("root layout font config (ADR-0020 regression guard)", () => {
  it("loads Poppins weight 700 alongside 400", () => {
    // On `master`, Poppins loaded weight ["400"] only. With no bold face registered,
    // every font-bold/font-semibold/font-extrabold element site-wide (nav, page
    // titles, stat values, every <strong> mark in Contentful rich text) rendered
    // without a real bold face. See docs/adr/0020-font-loading-and-typography-
    // continuity-audit.md, Finding 1. If "700" disappears from this array, that
    // regression is back.
    const weightMatch = layoutSource.match(poppinsWeightArrayRegex);
    expect(weightMatch).not.toBeNull();
    expect(weightMatch?.[1]).toContain("400");
    expect(weightMatch?.[1]).toContain("700");
  });
});
