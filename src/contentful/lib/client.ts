import { GraphQLClient } from "graphql-request";
import { getSdk } from "../generated/contentful-sdk.generated";

const client = new GraphQLClient(
  `${process.env.CONTENTFUL_API_BASE_URL}/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}`,
  {
    headers: {
      Authorization: `Bearer ${process.env.CONTENTFUL_CDA_TOKEN}`,
    },
  }
);

export const contentfulSdk = getSdk(client);
