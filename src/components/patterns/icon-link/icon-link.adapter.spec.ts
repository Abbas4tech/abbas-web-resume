import { describe, expect, it } from "vitest";
import { adaptIconLink } from "./icon-link.adapter";

describe("adaptIconLink", () => {
  it("adapts Contentful Asset type to IconLinkProps", () => {
    const input = {
      description: "https://linkedin.com/in/test",
      title: "LinkedIn",
      url: "https://example.com/linkedin.svg",
      width: 100,
      height: 100,
    };

    const expected = {
      href: "https://linkedin.com/in/test",
      label: "LinkedIn",
      iconSrc: "https://example.com/linkedin.svg",
      iconWidth: 100,
      iconHeight: 100,
    };

    expect(adaptIconLink(input)).toEqual(expected);
  });
});
