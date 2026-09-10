import { describe, expect, it } from "vitest";
import type { IconFieldsFragment } from "../generated/contentful-sdk.generated";
import { adaptIcon, isAdaptedIcon } from "./icon";

const fullIcon: IconFieldsFragment = {
  __typename: "Icon",
  sys: { id: "icon-1" },
  internalName: "GitHub icon",
  name: "FaGithub",
  library: "fa",
  title: "GitHub",
  color: "#181717",
  iconCode: "",
  showTooltip: true,
};

describe("adaptIcon", () => {
  it("returns undefined for a missing entry", () => {
    expect(adaptIcon(null)).toBeUndefined();
    expect(adaptIcon(undefined)).toBeUndefined();
  });

  it("maps every field for a fully populated entry", () => {
    const result = adaptIcon({ ...fullIcon, iconCode: "fa/FaGithub" });

    expect(result).toEqual({
      __typename: "Icon",
      id: "icon-1",
      internalName: "GitHub icon",
      name: "FaGithub",
      library: "fa",
      title: "GitHub",
      color: "#181717",
      iconCode: "fa/FaGithub",
      showTooltip: true,
    });
  });

  it("builds iconCode from library + name when iconCode is blank", () => {
    const result = adaptIcon({ ...fullIcon, iconCode: "" });
    expect(result?.iconCode).toBe("fa/FaGithub");
  });

  it("does not double-prefix an iconCode that already contains a library segment", () => {
    const result = adaptIcon({ ...fullIcon, iconCode: "md/MdHome" });
    expect(result?.iconCode).toBe("md/MdHome");
  });

  it("falls back to a bare code when there is no library to prefix with", () => {
    const result = adaptIcon({ ...fullIcon, library: "", iconCode: "" });
    expect(result?.iconCode).toBe("FaGithub");
  });

  it("defaults showTooltip to false when absent", () => {
    const result = adaptIcon({ ...fullIcon, showTooltip: null });
    expect(result?.showTooltip).toBe(false);
  });

  it("defaults optional text fields to empty strings when null", () => {
    const result = adaptIcon({
      ...fullIcon,
      internalName: null,
      title: null,
      color: null,
    });
    expect(result).toMatchObject({
      internalName: "",
      title: "",
      color: "",
    });
  });
});

describe("isAdaptedIcon", () => {
  it("recognizes a value produced by adaptIcon", () => {
    expect(isAdaptedIcon(adaptIcon(fullIcon))).toBe(true);
  });

  it("rejects unrelated values", () => {
    expect(isAdaptedIcon(null)).toBe(false);
    expect(isAdaptedIcon(undefined)).toBe(false);
    expect(isAdaptedIcon({})).toBe(false);
    expect(isAdaptedIcon({ __typename: "Link" })).toBe(false);
  });
});
