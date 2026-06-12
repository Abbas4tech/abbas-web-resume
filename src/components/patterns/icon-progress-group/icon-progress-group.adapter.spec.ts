import { describe, expect, it } from "vitest";
import { adaptIconProgressGroup } from "./icon-progress-group.adapter";

describe("adaptIconProgressGroup", () => {
  it("returns an empty object as a passthrough stub", () => {
    expect(adaptIconProgressGroup()).toEqual({});
  });
});
