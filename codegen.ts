import type { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";

dotenv.config();

const getSchemaUrl = (): string => {
  const baseUrl =
    process.env.CONTENTFUL_BASE_URL ||
    "https://graphql.contentful.com/content/v1";
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const environmentId = process.env.CONTENTFUL_ENVIRONMENT_ID || "master";

  if (!spaceId) {
    throw new Error("CONTENTFUL_SPACE_ID environment variable is not set");
  }

  return `${baseUrl}/spaces/${spaceId}/environments/${environmentId}`;
};

const getAuthToken = (): string => {
  const apiKey = process.env.CONTENTFUL_API_KEY;

  if (!apiKey) {
    throw new Error("CONTENTFUL_API_KEY environment variable is not set");
  }

  return apiKey;
};

const config: CodegenConfig = {
  schema: [
    {
      [getSchemaUrl()]: {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      },
    },
  ],

  documents: ["**/*.graphql"],
  overwrite: true,

  generates: {
    "src/gql/__generated__/": {
      preset: "client-preset",
      plugins: [],
      config: {
        avoidOptionals: true,
        immutableTypes: true,
        enumsAsTypes: true,
      },
    },
    "./src/gql/sdk.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
      ],
      config: {
        rawRequest: true,
      },
    },
  },

  ignoreNoDocuments: true,
};

export default config;
