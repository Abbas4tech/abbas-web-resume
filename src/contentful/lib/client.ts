import { GraphQLClient } from "graphql-request";
import { getSdk } from "../generated/contentful-sdk.generated";

const client = new GraphQLClient(
  `${process.env.CONTENTFUL_API_BASE_URL}/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT}`,
  {
    headers: {
      Authorization: `Bearer ${process.env.CONTENTFUL_CDA_TOKEN}`,
    },
    // Without this, Next.js's fetch Data Cache caches every Contentful
    // response indefinitely (its default for a Server Component fetch with
    // no explicit cache/revalidate option) and persists it to
    // .next/cache/fetch-cache across server restarts. In production that
    // means content edits in Contentful would never appear without a
    // redeploy; in development it meant a *mocked* E2E run could serve a
    // stale *real* response cached from an earlier unmocked run (or vice
    // versa) with no error — see ADR 0022's Implementation section.
    cache: "no-store",
  }
);

export const contentfulSdk = getSdk(client);
