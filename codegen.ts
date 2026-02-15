import type { CodegenConfig } from "@graphql-codegen/cli";
import dotenv from "dotenv";

dotenv.config();

const config: CodegenConfig = {
  schema: [
    {
      "https://graphql.contentful.com/content/v1/spaces/6mdmgsjzhh4y/environments/development":
        {
          headers: {
            Authorization: "Bearer 5N_INxc9D8ap7anQIVwWjEpTehJk5hapkysQzcuqKvQ",
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
