import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const graphQLClientMock = vi.fn();
const getSdkMock = vi.fn(() => ({ mocked: "sdk" }));

vi.mock("graphql-request", () => ({
  GraphQLClient: graphQLClientMock,
}));

vi.mock("../generated/contentful-sdk.generated", () => ({
  getSdk: getSdkMock,
}));

const ORIGINAL_ENV = { ...process.env };

describe("contentfulSdk client", () => {
  beforeEach(() => {
    vi.resetModules();
    graphQLClientMock.mockClear();
    getSdkMock.mockClear();
  });

  afterEach(() => {
    process.env = { ...ORIGINAL_ENV };
  });

  it("builds the GraphQL endpoint from the space id and environment, with a bearer token header", async () => {
    process.env.CONTENTFUL_API_BASE_URL =
      "https://graphql.contentful.com/content/v1/spaces";
    process.env.CONTENTFUL_SPACE_ID = "space123";
    process.env.CONTENTFUL_ENVIRONMENT = "production";
    process.env.CONTENTFUL_CDA_TOKEN = "secret-token";

    await import("./client");

    expect(graphQLClientMock).toHaveBeenCalledWith(
      "https://graphql.contentful.com/content/v1/spaces/space123/environments/production",
      { headers: { Authorization: "Bearer secret-token" } }
    );
  });

  it("resolves a different endpoint and token when the environment changes", async () => {
    process.env.CONTENTFUL_API_BASE_URL = "https://api.example.com";
    process.env.CONTENTFUL_SPACE_ID = "space456";
    process.env.CONTENTFUL_ENVIRONMENT = "development";
    process.env.CONTENTFUL_CDA_TOKEN = "dev-token";

    await import("./client");

    expect(graphQLClientMock).toHaveBeenCalledWith(
      "https://api.example.com/space456/environments/development",
      { headers: { Authorization: "Bearer dev-token" } }
    );
  });

  it("passes the constructed GraphQL client into getSdk", async () => {
    process.env.CONTENTFUL_API_BASE_URL = "https://api.example.com";
    process.env.CONTENTFUL_SPACE_ID = "space456";
    process.env.CONTENTFUL_ENVIRONMENT = "development";
    process.env.CONTENTFUL_CDA_TOKEN = "dev-token";
    const fakeClientInstance = { fake: true };
    graphQLClientMock.mockImplementation(function FakeGraphQLClient() {
      return fakeClientInstance;
    });

    await import("./client");

    expect(getSdkMock).toHaveBeenCalledWith(fakeClientInstance);
  });
});
