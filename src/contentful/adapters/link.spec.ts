import { describe, expect, it } from "vitest";
import type { LinkFieldsFragment } from "../generated/contentful-sdk.generated";
import { adaptLink, isAdaptedLink } from "./link";

const fullLink: LinkFieldsFragment = {
  __typename: "Link",
  sys: { id: "link-1" },
  internalName: "GitHub link",
  text: "GitHub",
  url: "https://github.com/abbas4tech",
  page: null,
  icon: {
    __typename: "Icon",
    sys: { id: "icon-1" },
    internalName: "GitHub icon",
    name: "FaGithub",
    library: "fa",
    title: "GitHub",
    color: "",
    iconCode: "fa/FaGithub",
    showTooltip: false,
  },
};

describe("adaptLink", () => {
  it("returns null for a missing entry", () => {
    expect(adaptLink(null)).toBeNull();
    expect(adaptLink(undefined)).toBeNull();
  });

  it("maps every field for a fully populated entry", () => {
    const result = adaptLink(fullLink);

    expect(result).toEqual({
      __typename: "Link",
      id: "link-1",
      internalName: "GitHub link",
      text: "GitHub",
      href: "https://github.com/abbas4tech",
      icon: {
        __typename: "Icon",
        id: "icon-1",
        internalName: "GitHub icon",
        name: "FaGithub",
        library: "fa",
        title: "GitHub",
        color: "",
        iconCode: "fa/FaGithub",
        showTooltip: false,
      },
    });
  });

  it("falls back to the linked page's path when there is no explicit url", () => {
    const result = adaptLink({
      ...fullLink,
      url: null,
      page: { sys: { id: "page-1" }, path: "/experience" },
    });
    expect(result?.href).toBe("/experience");
  });

  it("falls back to a bare '#' when there is neither a url nor a page", () => {
    const result = adaptLink({ ...fullLink, url: null, page: null });
    expect(result?.href).toBe("#");
  });

  it("prefers the explicit url over a linked page's path", () => {
    const result = adaptLink({
      ...fullLink,
      url: "https://github.com/abbas4tech",
      page: { sys: { id: "page-1" }, path: "/experience" },
    });
    expect(result?.href).toBe("https://github.com/abbas4tech");
  });

  it("passes through a missing icon as undefined rather than throwing", () => {
    const result = adaptLink({ ...fullLink, icon: null });
    expect(result?.icon).toBeUndefined();
  });

  it("defaults text/internalName to empty strings when null", () => {
    const result = adaptLink({ ...fullLink, text: null, internalName: null });
    expect(result).toMatchObject({ text: "", internalName: "" });
  });
});

describe("isAdaptedLink", () => {
  it("recognizes a value produced by adaptLink", () => {
    expect(isAdaptedLink(adaptLink(fullLink))).toBe(true);
  });

  it("rejects unrelated values", () => {
    expect(isAdaptedLink(null)).toBe(false);
    expect(isAdaptedLink({ __typename: "Icon" })).toBe(false);
  });
});
