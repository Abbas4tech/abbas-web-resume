import { GraphQLClient } from "graphql-request";

import { getSdk, Sdk } from "./sdk";

const validateEnvironmentVariables = (): void => {
  const requiredVars = [
    "CONTENTFUL_BASE_URL",
    "CONTENTFUL_SPACE_ID",
    "CONTENTFUL_ENVIRONMENT_ID",
    "CONTENTFUL_API_KEY",
  ];

  const missingVars = requiredVars.filter(
    (varName) => !process.env[varName] || process.env[varName] === "",
  );

  if (missingVars.length > 0) {
    console.error(
      "❌ Missing Contentful environment variables:",
      missingVars.join(", "),
    );
    console.error(
      "Please set these variables in your environment or Vercel project settings.",
    );
    throw new Error(
      `Missing required Contentful environment variables: ${missingVars.join(", ")}`,
    );
  }
};

const buildContentfulUrl = (): string => {
  const baseUrl = process.env.CONTENTFUL_BASE_URL;
  const spaceId = process.env.CONTENTFUL_SPACE_ID;
  const environmentId = process.env.CONTENTFUL_ENVIRONMENT_ID;

  if (!baseUrl || !spaceId || !environmentId) {
    throw new Error(
      "Contentful URL cannot be constructed: missing base URL, space ID, or environment ID",
    );
  }

  const url = `${baseUrl}/spaces/${spaceId}/environments/${environmentId}`;
  return url;
};

export const contentful = (): Sdk => {
  validateEnvironmentVariables();

  const BASE_URL = buildContentfulUrl();

  console.warn("✅ Contentful initialized:", {
    spaceId: process.env.CONTENTFUL_SPACE_ID?.slice(0, 5) + "***",
    environment: process.env.CONTENTFUL_ENVIRONMENT_ID,
  });

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
          status?: number;
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

        // Log 400 errors with more detail
        if (gqlError.status === 400) {
          console.error(`❌ Graphql operation ${operationName} returned 400:`, {
            status: gqlError.status,
            error: gqlError.response?.error,
          });
        }

        return gqlError.response as T;
      }

      // Log other errors
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error(
        `❌ Graphql operation ${operationName} failed:`,
        errorMessage,
      );
      throw error;
    }
  };

  return getSdk(client, errorHandlingWrapper);
};
