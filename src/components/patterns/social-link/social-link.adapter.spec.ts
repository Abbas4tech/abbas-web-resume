import { describe, expect, it } from "vitest";
import { adaptSocialLink } from "./social-link.adapter";

describe("adaptSocialLink", () => {
  it("adapts Contentful Asset type to SocialLinkProps", () => {
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

    expect(adaptSocialLink(input)).toEqual(expected);
  });
});
