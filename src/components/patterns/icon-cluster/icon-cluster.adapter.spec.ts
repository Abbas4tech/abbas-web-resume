import { describe, expect, it } from "vitest";
import { adaptIconCluster } from "./icon-cluster.adapter";

describe("adaptIconCluster", () => {
  it("returns an empty object as a passthrough stub", () => {
    expect(adaptIconCluster()).toEqual({});
  });
});
