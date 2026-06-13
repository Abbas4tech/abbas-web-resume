import { describe, expect, it } from "vitest";
import { adaptMediaCard } from "./media-card.adapter";

describe("adaptMediaCard", () => {
  it("adapts raw contentful data to MediaCardProps", () => {
    const rawData = {
      title: "My Awesome Project",
      description: "A very cool project doing cool things.",
      thumbnail: {
        url: "https://example.com/image.png",
        fileName: "image.png",
        width: 800,
        height: 600,
      },
      deployedLink: "https://my-awesome-project.com",
      deployedLinkIcon: {
        iconCode: "fa/FaExternalLinkAlt",
        name: "Visit Project",
      },
    };

    const expected = {
      title: "My Awesome Project",
      description: "A very cool project doing cool things.",
      thumbnailSrc: "https://example.com/image.png",
      thumbnailAlt: "image.png",
      thumbnailWidth: 800,
      thumbnailHeight: 600,
      href: "https://my-awesome-project.com",
      linkIcon: {
        iconCode: "fa/FaExternalLinkAlt",
        name: "Visit Project",
      },
    };

    const result = adaptMediaCard(rawData);
    expect(result).toEqual(expected);
  });
});
