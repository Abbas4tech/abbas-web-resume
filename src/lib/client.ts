"use server";

import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { DocumentNode } from "graphql";

const BASE_URL = `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT_ID}`;

function createServerApolloClient(revalidateSeconds = 60) {
  const fetchWithNext = (input: RequestInfo, init?: RequestInit) => {
    const nextOpts =
      revalidateSeconds === undefined
        ? {}
        : { next: { revalidate: revalidateSeconds } };

    return fetch(input, { ...init, ...nextOpts });
  };

  const link = new HttpLink({
    uri: BASE_URL,
    fetch: fetchWithNext as unknown as WindowOrWorkerGlobalScope["fetch"],
    headers: process.env.CONTENTFUL_API_KEY
      ? { Authorization: `Bearer ${process.env.CONTENTFUL_API_KEY}` }
      : undefined,
  });

  return new ApolloClient({
    ssrMode: true,
    link,
    cache: new InMemoryCache(),
  });
}

export async function fetchGql<T = unknown>(
  query: DocumentNode,
  variables?: Record<string, unknown>,
  revalidateSeconds?: number
) {
  const client = createServerApolloClient(revalidateSeconds);
  const result = await client.query<T>({ query, variables });
  if (result.error?.message)
    throw new Error(JSON.stringify(result.error.message));
  return result.data as T;
}
