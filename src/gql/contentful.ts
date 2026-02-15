import { GraphQLClient } from "graphql-request";

import { getSdk, Sdk } from "./sdk";

export const contentful = (): Sdk => {
  const BASE_URL = `${process.env.CONTENTFUL_BASE_URL}/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/${process.env.CONTENTFUL_ENVIRONMENT_ID}`;

  const client = new GraphQLClient(BASE_URL, {
    headers: {
      Authorization: `Bearer ${process.env.CONTENTFUL_API_KEY}`,
    },
  });

  const errorHandlingWrapper = async <T>(
    action: () => Promise<T>,
    operationName: string,
  ): Promise<T> => {
    try {
      return await action();
    } catch (error) {
      if (error && typeof error === "object" && "response" in error) {
        const gqlError = error as {
          response?: {
            data?: unknown;
            error?: Array<{ extensions?: { contentful?: { code?: string } } }>;
          };
        };

        if (gqlError.response?.data) {
          console.warn(
            `Graphql operation ${operationName} returned with errors but data is available`,
            {
              operationName,
              errorCount: gqlError.response.error?.length,

              errorType: gqlError.response.error?.map(
                (e) => e.extensions?.contentful?.code,
              ),
            },
          );
        }

        return gqlError.response as T;
      }

      console.warn(`Graphql operation ${operationName} failed`, error as Error);
      throw error;
    }
  };

  return getSdk(client, errorHandlingWrapper);
};
