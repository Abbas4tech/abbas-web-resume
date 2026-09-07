import { graphql, HttpResponse } from "msw";
import {
  fixtureLayout,
  fixturePages,
  SERVER_ERROR_PAGE_PATH,
} from "./fixture-site";

interface GetPageByPathVariables {
  path?: string;
}

export const handlers = [
  graphql.query("GetLayout", () =>
    HttpResponse.json({
      data: { layoutCollection: { items: [fixtureLayout] } },
    })
  ),
  graphql.query<Record<string, unknown>, GetPageByPathVariables>(
    "GetPageByPath",
    ({ variables }) => {
      if (variables.path === SERVER_ERROR_PAGE_PATH) {
        // No `data` field: graphql-request's default errorPolicy ("none")
        // throws on any GraphQL response carrying `errors`, which propagates
        // out of the Server Component fetch and into src/app/error.tsx —
        // the only way to exercise that boundary without a component that
        // can actually be made to throw from fixture data alone.
        return HttpResponse.json({
          errors: [{ message: "Simulated Contentful outage" }],
        });
      }

      const page = fixturePages.find((item) => item.path === variables.path);

      return HttpResponse.json({
        data: { pageCollection: { items: page ? [page] : [] } },
      });
    }
  ),
];
