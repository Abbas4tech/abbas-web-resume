import { describe, expect, it } from "vitest";
import type { StatItemFieldsFragment } from "../generated/contentful-sdk.generated";
import { adaptStatItem, isAdaptedStatItem } from "./stat-item";

const icon: NonNullable<
  StatItemFieldsFragment["iconsCollection"]
>["items"][number] = {
  __typename: "Icon",
  sys: { id: "icon-1" },
  internalName: "React icon",
  name: "FaReact",
  library: "fa",
  title: "React",
  color: "",
  iconCode: "fa/FaReact",
  showTooltip: false,
};

const fullStatItem: StatItemFieldsFragment = {
  __typename: "StatItem",
  sys: { id: "stat-1" },
  internalName: "React proficiency",
  title: "React",
  progress: 90,
  iconsCollection: { items: [icon] },
};

describe("adaptStatItem", () => {
  it("returns null for a missing entry", () => {
    expect(adaptStatItem(null)).toBeNull();
    expect(adaptStatItem(undefined)).toBeNull();
  });

  it("maps every field for a fully populated entry", () => {
    const result = adaptStatItem(fullStatItem);

    expect(result).toMatchObject({
      __typename: "StatItem",
      id: "stat-1",
      internalName: "React proficiency",
      title: "React",
      progress: 90,
    });
    expect(result?.icons).toHaveLength(1);
    expect(result?.icons[0]).toMatchObject({ iconCode: "fa/FaReact" });
  });

  it("defaults progress to 0 and icons to an empty list when absent", () => {
    const result = adaptStatItem({
      ...fullStatItem,
      progress: null,
      iconsCollection: null,
    });

    expect(result?.progress).toBe(0);
    expect(result?.icons).toEqual([]);
  });

  it("defaults title/internalName to empty strings when null", () => {
    const result = adaptStatItem({
      ...fullStatItem,
      title: null,
      internalName: null,
    });
    expect(result).toMatchObject({ title: "", internalName: "" });
  });
});

describe("isAdaptedStatItem", () => {
  it("recognizes a value produced by adaptStatItem", () => {
    expect(isAdaptedStatItem(adaptStatItem(fullStatItem))).toBe(true);
  });

  it("rejects unrelated values", () => {
    expect(isAdaptedStatItem(null)).toBe(false);
    expect(isAdaptedStatItem({ __typename: "ContentItem" })).toBe(false);
  });
});
