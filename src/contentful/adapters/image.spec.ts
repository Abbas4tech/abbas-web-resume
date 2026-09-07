import { describe, expect, it } from "vitest";
import type { ImageFieldsFragment } from "../generated/contentful-sdk.generated";
import { adaptImage, isAdaptedImage } from "./image";

const fullImage: ImageFieldsFragment = {
  __typename: "Image",
  sys: { id: "img-1" },
  internalName: "Hero Image",
  alternativeText: "Hero Alt",
  caption: "A hero banner image",
  image: {
    url: "/hero.jpg",
    title: "Hero Image",
    description: "",
    width: 1920,
    height: 1080,
  },
};

describe("adaptImage", () => {
  it("returns null for a missing entry", () => {
    expect(adaptImage(null)).toBeNull();
    expect(adaptImage(undefined)).toBeNull();
  });

  it("returns null when the entry exists but has no underlying asset", () => {
    // Contentful lets an Image entry be published with its `image` asset
    // field left empty — must not crash or emit a fake all-zero image.
    expect(adaptImage({ ...fullImage, image: null })).toBeNull();
  });

  it("maps every field for a fully populated entry", () => {
    const result = adaptImage(fullImage);

    expect(result).toEqual({
      __typename: "Image",
      id: "img-1",
      internalName: "Hero Image",
      alternativeText: "Hero Alt",
      caption: "A hero banner image",
      url: "/hero.jpg",
      title: "Hero Image",
      description: "",
      width: 1920,
      height: 1080,
    });
  });

  it("defaults optional text fields to empty strings and dimensions to 0", () => {
    const result = adaptImage({
      ...fullImage,
      internalName: null,
      alternativeText: null,
      caption: null,
      image: {
        url: null,
        title: null,
        description: null,
        width: null,
        height: null,
      },
    });

    expect(result).toEqual({
      __typename: "Image",
      id: "img-1",
      internalName: "",
      alternativeText: "",
      caption: "",
      url: "",
      title: "",
      description: "",
      width: 0,
      height: 0,
    });
  });
});

describe("isAdaptedImage", () => {
  it("recognizes a value produced by adaptImage", () => {
    expect(isAdaptedImage(adaptImage(fullImage))).toBe(true);
  });

  it("rejects unrelated values", () => {
    expect(isAdaptedImage(null)).toBe(false);
    expect(isAdaptedImage({ __typename: "Icon" })).toBe(false);
  });
});
