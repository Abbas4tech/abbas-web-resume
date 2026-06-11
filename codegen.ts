import type { CodegenConfig } from "@graphql-codegen/cli";
import { config as dotenvConfig } from "dotenv";

dotenvConfig({ path: ".env.local" });

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const environmentId = process.env.CONTENTFUL_ENVIRONMENT || "development";
const cdaToken = process.env.CONTENTFUL_CDA_TOKEN;

if (!spaceId) {
  throw new Error("Missing environment variable CONTENTFUL_SPACE_ID");
}
if (!cdaToken) {
  throw new Error("Missing environment variable CONTENTFUL_CDA_TOKEN");
}

const PREVIEW_ENDPOINT = `${process.env.CONTENTFUL_API_BASE_URL}/${spaceId}/environments/${environmentId}`;

const config: CodegenConfig = {
  schema: [
    {
      [PREVIEW_ENDPOINT]: {
        headers: {
          Authorization: `Bearer ${cdaToken}`,
        },
      },
    },
  ],
  documents: ["src/contentful/**/*.graphql"],

  generates: {
    "src/contentful/generated/schema.generated.gql": {
      plugins: ["schema-ast"],
    },

    "src/contentful/generated/schema-types.generated.ts": {
      plugins: ["typescript"],
      config: {
        skipTypename: false,
        enumsAsTypes: true,
      },
    },

    "src/contentful/generated/contentful-sdk.generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-graphql-request",
        {
          add: {
            content: "// @ts-nocheck",
          },
        },
      ],
      config: {
        rawRequest: true,
        namingConvention: "keep",
      },
    },
  },

  ignoreNoDocuments: true,

  hooks: {
    afterOneFileWrite: ["npx ultracite fix"],
  },

  verbose: true,
};

export { config as default };
